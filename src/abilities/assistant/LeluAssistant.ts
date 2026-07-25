import ChatService from "../chat/ChatService";
import EngineerService from "../engineer/EngineerService";
import MemoryService from "../memory/MemoryService";
import BrowserVoiceService from "../voice/BrowserVoiceService";
import AIOrchestrator from "../../core/AIOrchestrator";
import MemorySystem from "../../core/MemorySystem";
import VoiceCoordinator from "../../core/VoiceCoordinator";

export interface AssistantConversationState {
  activeMode: "chat" | "engineering";
  voiceEnabled: boolean;
}

export default class LeluAssistant {
  readonly chat = new ChatService();
  readonly engineer = new EngineerService();
  readonly memory = new MemoryService();
  readonly voice = new BrowserVoiceService();
  readonly orchestrator = new AIOrchestrator();
  readonly memorySystem = new MemorySystem();
  readonly voiceCoordinator = new VoiceCoordinator();

  state: AssistantConversationState = {
    activeMode: "chat",
    voiceEnabled: false,
  };

  async initialize(): Promise<void> {
    await this.orchestrator.initialize();
    await this.voiceCoordinator.start();
  }

  async respond(message: string): Promise<{ text: string; source: "openai" | "local" }> {
    await this.orchestrator.initialize();
    const reply = await this.orchestrator.process(message);
    const source = reply.toLowerCase().includes("fallback") ? "local" : "openai";
    await this.memorySystem.extract(`${message} | ${reply}`);
    return { text: reply, source };
  }

  async respondEngineering(message: string): Promise<{ text: string; source: "openai" | "local" }> {
    const reply = await this.engineer.answer(message);
    await this.memorySystem.extract(`${message} | ${reply.text}`);
    return reply;
  }

  setMode(mode: AssistantConversationState["activeMode"]): void {
    this.state.activeMode = mode;
  }

  setVoiceEnabled(enabled: boolean): void {
    this.state.voiceEnabled = enabled;
  }
}
