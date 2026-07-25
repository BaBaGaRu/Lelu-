import appLog from "../../core/APIEventLog";

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
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
  private recognition: SpeechRecognitionLike | null = null;
  private isListening = false;
  private manualStop = false;
  private onTranscriptCallback: ((text: string) => void) | null = null;

  constructor() {
    if (typeof window === "undefined") {
      return;
    }

    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      return;
    }

    const instance = new Recognition();
    instance.lang = "en-US";
    instance.interimResults = true;
    instance.continuous = true;
    instance.onresult = null;
    instance.onerror = null;
    instance.onend = null;
    this.recognition = instance;
  }

  async startListening(onTranscript: (text: string) => void): Promise<void> {
    this.onTranscriptCallback = onTranscript;
    this.manualStop = false;

    if (!this.recognition) {
      appLog.append({ type: "voice", provider: "voice", message: "Speech recognition unavailable in this browser" });
      return;
    }

    if (this.isListening) {
      return;
    }

    try {
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    }
    catch (error) {
      appLog.append({ type: "warning", provider: "voice", message: error instanceof Error ? error.message : "Microphone permission denied" });
      onTranscript("");
      return;
    }

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();

      if (transcript) {
        this.stopSpeaking();
        onTranscript(transcript);
      }
    };

    this.recognition.onerror = (event) => {
      const error = event?.error ?? "unknown";
      appLog.append({ type: "warning", provider: "voice", message: `Speech recognition error: ${error}` });
      if (this.isListening && !this.manualStop) {
        this.restartListening();
      }
    };

    this.recognition.onend = () => {
      if (this.isListening && !this.manualStop) {
        this.restartListening();
      }
    };

    this.isListening = true;
    appLog.append({ type: "voice", provider: "voice", message: "Voice listening started" });
    this.recognition.start();
  }

  stopListening(): void {
    this.manualStop = true;
    this.isListening = false;
    this.recognition?.stop();
    appLog.append({ type: "voice", provider: "voice", message: "Voice listening stopped" });
  }

  speak(text: string): void {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    appLog.append({ type: "voice", provider: "voice", message: "Voice response spoken" });
  }

  stopSpeaking(): void {
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }
  }

  dispose(): void {
    this.manualStop = true;
    this.isListening = false;
    this.recognition?.stop();
    this.onTranscriptCallback = null;
  }

  private restartListening(): void {
    if (this.manualStop || !this.recognition || !this.onTranscriptCallback) {
      return;
    }
    this.recognition.stop();
    this.recognition.start();
  }
}
