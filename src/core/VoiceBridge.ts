/**
 * ==========================================================
 * LÉLU
 * VOICE BRIDGE
 * ==========================================================
 */

import BrowserVoiceService from "../abilities/voice/BrowserVoiceService";

export default class VoiceBridge {
  constructor(private readonly browserVoice = new BrowserVoiceService()) {}

  async say(text: string): Promise<void> {
    this.browserVoice.speak(text);
  }
}
