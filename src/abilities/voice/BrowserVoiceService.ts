import appLog from "../../core/APIEventLog";

export type VoiceState = "idle" | "listening" | "thinking" | "speaking" | "error" | "reconnecting";

export interface VoiceDebugSnapshot {
  permissionStatus: string;
  microphoneStatus: string;
  speechEngineStatus: string;
  transcript: string;
  aiStatus: string;
  ttsStatus: string;
  voiceState: VoiceState;
  lastError: string | null;
  recoveryAttempts: number;
}

interface SpeechRecognitionResultLike {
  transcript: string;
  isFinal?: boolean;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<ArrayLike<SpeechRecognitionResultLike>>;
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor | undefined;
    webkitSpeechRecognition?: SpeechRecognitionConstructor | undefined;
  }
}

export default class BrowserVoiceService {
  private static instance: BrowserVoiceService | null = null;

  private recognition: SpeechRecognitionLike | null = null;
  private mediaStream: MediaStream | null = null;
  private isListening = false;
  private isStarting = false;
  private manualStop = false;
  private muted = false;
  private onTranscriptCallback: ((text: string) => void) | null = null;
  private state: VoiceState = "idle";
  private readonly stateListeners: Array<(state: VoiceState) => void> = [];
  private readonly debugListeners: Array<(snapshot: VoiceDebugSnapshot) => void> = [];
  private restartTimer: ReturnType<typeof setTimeout> | null = null;
  private lastTranscript = "";
  private transcript = "";
  private permissionStatus: VoiceDebugSnapshot["permissionStatus"] = "unknown";
  private microphoneStatus: VoiceDebugSnapshot["microphoneStatus"] = "idle";
  private speechEngineStatus: VoiceDebugSnapshot["speechEngineStatus"] = "unavailable";
  private aiStatus: VoiceDebugSnapshot["aiStatus"] = "idle";
  private ttsStatus: VoiceDebugSnapshot["ttsStatus"] = "idle";
  private lastError: string | null = null;
  private recoveryAttempts = 0;
  private pendingStartPromise: Promise<void> | null = null;

  constructor() {
    if (BrowserVoiceService.instance) {
      return BrowserVoiceService.instance as unknown as this;
    }

    if (typeof window !== "undefined") {
      const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
      if (Recognition) {
        const instance = new Recognition();
        instance.lang = "en-US";
        instance.interimResults = true;
        instance.continuous = true;
        instance.onresult = null;
        instance.onerror = null;
        instance.onend = null;
        this.recognition = instance;
        this.speechEngineStatus = "ready";
      }
    }

    BrowserVoiceService.instance = this;
    this.publishDebug();
  }

  getState(): VoiceState {
    return this.state;
  }

  getDebugSnapshot(): VoiceDebugSnapshot {
    return {
      permissionStatus: this.permissionStatus,
      microphoneStatus: this.microphoneStatus,
      speechEngineStatus: this.speechEngineStatus,
      transcript: this.transcript,
      aiStatus: this.aiStatus,
      ttsStatus: this.ttsStatus,
      voiceState: this.state,
      lastError: this.lastError,
      recoveryAttempts: this.recoveryAttempts,
    };
  }

  subscribe(listener: (state: VoiceState) => void): () => void {
    this.stateListeners.push(listener);
    return () => {
      const index = this.stateListeners.indexOf(listener);
      if (index >= 0) {
        this.stateListeners.splice(index, 1);
      }
    };
  }

  subscribeDebug(listener: (snapshot: VoiceDebugSnapshot) => void): () => void {
    this.debugListeners.push(listener);
    return () => {
      const index = this.debugListeners.indexOf(listener);
      if (index >= 0) {
        this.debugListeners.splice(index, 1);
      }
    };
  }

  async prepare(): Promise<void> {
    if (!this.recognition) {
      this.setError("Speech recognition unavailable in this browser");
      return;
    }

    await this.ensureMicrophoneAccess();
    this.aiStatus = "ready";
    this.publishDebug();
  }

  async startListening(onTranscript: (text: string) => void): Promise<void> {
    this.onTranscriptCallback = onTranscript;
    this.manualStop = false;

    if (!this.recognition) {
      this.setError("Speech recognition unavailable in this browser");
      return;
    }

    if (this.pendingStartPromise) {
      return this.pendingStartPromise;
    }

    if (this.isListening || this.isStarting) {
      return;
    }

    this.pendingStartPromise = this.startListeningInternal(onTranscript);
    try {
      await this.pendingStartPromise;
    }
    finally {
      this.pendingStartPromise = null;
    }
  }

  stopListening(): void {
    this.manualStop = true;
    this.isListening = false;
    this.isStarting = false;
    this.clearRestartTimer();
    this.recognition?.stop();
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = null;
    this.setState("idle");
    this.microphoneStatus = "stopped";
    this.publishDebug();
    appLog.append({ type: "voice", provider: "voice", message: "Voice listening stopped" });
  }

  isMuted(): boolean {
    return this.muted;
  }

  mute(): void {
    this.muted = true;
    this.stopSpeaking();
    this.publishDebug();
    appLog.append({ type: "voice", provider: "voice", message: "Voice muted" });
  }

  unmute(): void {
    this.muted = false;
    this.publishDebug();
    appLog.append({ type: "voice", provider: "voice", message: "Voice unmuted" });
  }

  toggleMute(): void {
    if (this.muted) {
      this.unmute();
    }
    else {
      this.mute();
    }
  }

  speak(text: string): void {
    if (this.muted) {
      this.ttsStatus = "idle";
      this.setState(this.isListening ? "listening" : "idle");
      this.publishDebug();
      return;
    }

    if (typeof window === "undefined" || !window.speechSynthesis || !text.trim()) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.onstart = () => {
      this.ttsStatus = "speaking";
      this.setState("speaking");
      this.publishDebug();
    };
    utterance.onend = () => {
      this.ttsStatus = "idle";
      if (!this.manualStop && this.onTranscriptCallback) {
        this.setState(this.isListening ? "listening" : "idle");
        this.scheduleResume();
      }
      else {
        this.setState("idle");
      }
      this.publishDebug();
    };
    utterance.onerror = () => {
      this.ttsStatus = "error";
      this.setError("Text-to-speech failed");
      this.publishDebug();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    this.ttsStatus = "ready";
    this.publishDebug();
    appLog.append({ type: "voice", provider: "voice", message: "Voice response spoken" });
  }

  stopSpeaking(): void {
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }
    this.ttsStatus = "idle";
    this.publishDebug();
  }

  dispose(): void {
    this.manualStop = true;
    this.isListening = false;
    this.isStarting = false;
    this.clearRestartTimer();
    this.recognition?.stop();
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = null;
    this.onTranscriptCallback = null;
    this.setState("idle");
    this.microphoneStatus = "stopped";
    this.publishDebug();
  }

  private async startListeningInternal(onTranscript: (text: string) => void): Promise<void> {
    this.onTranscriptCallback = onTranscript;
    this.manualStop = false;
    this.clearRestartTimer();
    this.isStarting = true;

    try {
      await this.ensureMicrophoneAccess();
      this.attachRecognitionHandlers(onTranscript);
      this.setState("listening");
      this.isListening = true;
      this.recognition?.start();
      this.microphoneStatus = "active";
      this.aiStatus = "listening";
      this.publishDebug();
      appLog.append({ type: "voice", provider: "voice", message: "Voice listening started" });
    }
    catch (error) {
      this.isListening = false;
      this.isStarting = false;
      this.setError(error instanceof Error ? error.message : "Unable to start speech recognition");
      appLog.append({ type: "warning", provider: "voice", message: error instanceof Error ? error.message : "Unable to start speech recognition" });
      this.scheduleResume();
    }
    finally {
      this.isStarting = false;
    }
  }

  private attachRecognitionHandlers(onTranscript: (text: string) => void): void {
    if (!this.recognition) {
      return;
    }

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results ?? [])
        .map((result) => result[0]?.transcript ?? "")
        .filter(Boolean)
        .join(" ")
        .trim();

      if (!transcript || transcript === this.lastTranscript) {
        return;
      }

      this.lastTranscript = transcript;
      this.transcript = transcript;
      this.stopSpeaking();
      this.aiStatus = "processing";
      this.setState("thinking");
      this.publishDebug();
      onTranscript(transcript);
    };

    this.recognition.onerror = (event) => {
      const error = event?.error ?? "unknown";
      this.isListening = false;
      this.isStarting = false;
      this.setError(`Speech recognition error: ${error}`);
      if (!this.manualStop) {
        this.scheduleResume();
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.isStarting = false;
      if (!this.manualStop) {
        this.setState("reconnecting");
        this.scheduleResume();
      }
      else {
        this.setState("idle");
      }
      this.publishDebug();
    };
  }

  private async ensureMicrophoneAccess(): Promise<void> {
    if (typeof navigator === "undefined") {
      throw new Error("Navigator unavailable");
    }

    this.permissionStatus = "prompt";
    this.publishDebug();

    try {
      if (typeof navigator.permissions?.query === "function") {
        const permission = await navigator.permissions.query({ name: "microphone" as PermissionName });
        this.permissionStatus = permission.state === "granted" ? "granted" : permission.state === "denied" ? "denied" : "prompt";
        if (permission.state === "denied") {
          throw new Error("Microphone permission denied");
        }
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Microphone API unavailable");
      }

      if (!this.mediaStream) {
        this.microphoneStatus = "connecting";
        this.publishDebug();
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      this.microphoneStatus = "active";
      this.permissionStatus = "granted";
      this.publishDebug();
    }
    catch (error) {
      this.microphoneStatus = "error";
      this.permissionStatus = "denied";
      this.publishDebug();
      throw error;
    }
  }

  private setState(nextState: VoiceState): void {
    if (this.state === nextState) {
      return;
    }

    this.state = nextState;
    this.stateListeners.forEach((listener) => listener(nextState));
    this.publishDebug();
    appLog.append({ type: "voice", provider: "voice", message: `Voice state changed to ${nextState}` });
  }

  private setError(message: string): void {
    this.lastError = message;
    this.setState("error");
    this.aiStatus = "error";
    this.publishDebug();
    appLog.append({ type: "warning", provider: "voice", message });
  }

  private publishDebug(): void {
    const snapshot = this.getDebugSnapshot();
    this.debugListeners.forEach((listener) => listener(snapshot));
  }

  private clearRestartTimer(): void {
    if (this.restartTimer) {
      clearTimeout(this.restartTimer);
      this.restartTimer = null;
    }
  }

  private scheduleResume(): void {
    if (this.manualStop) {
      return;
    }

    this.clearRestartTimer();
    const delay = Math.min(2000, 400 + this.recoveryAttempts * 300);
    this.recoveryAttempts += 1;
    this.restartTimer = setTimeout(() => {
      this.restartTimer = null;
      if (!this.manualStop && this.onTranscriptCallback && !this.isListening && !this.isStarting) {
        void this.startListening(this.onTranscriptCallback);
      }
    }, delay);
    this.publishDebug();
  }
}
