/**
 * ==========================================================
 * LÉLU
 * VOICE COORDINATOR
 * ==========================================================
 */

import VoiceBridge from "./VoiceBridge";
import BrowserVoiceService from "../abilities/voice/BrowserVoiceService";

export default class VoiceCoordinator {
  private readonly voice = new BrowserVoiceService();
  private readonly bridge = new VoiceBridge(this.voice);

  async start(): Promise<void> {
    this.voice.startListening(() => undefined);
  }

  async stop(): Promise<void> {
    this.voice.stopListening();
  }

  async speak(text: string): Promise<void> {
    await this.bridge.say(text);
  }
}
