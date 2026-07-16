import ChatService from "../chat/ChatService";
import EngineerService from "../engineer/EngineerService";
import MemoryService from "../memory/MemoryService";
import BrowserVoiceService from "../voice/BrowserVoiceService";

export interface AssistantConversationState {
  activeMode: "chat" | "engineering";
}

export default class LeluAssistant {
  readonly chat = new ChatService();
  readonly engineer = new EngineerService();
  readonly memory = new MemoryService();
  readonly voice = new BrowserVoiceService();

  state: AssistantConversationState = {
    activeMode: "chat",
  };

  async respond(message: string): Promise<{ text: string; source: "ai" | "local" }> {
    const snapshot = this.memory.snapshot();
    const reply = await this.chat.answer(message, snapshot);

    this.memory.recordExchange(message, reply.text);
    return reply;
  }

  async respondEngineering(message: string): Promise<{ text: string; source: "ai" | "local" }> {
    const reply = await this.engineer.answer(message);
    this.memory.recordExchange(message, reply.text);
    return reply;
  }

  setMode(mode: AssistantConversationState["activeMode"]): void {
    this.state.activeMode = mode;
  }
}
