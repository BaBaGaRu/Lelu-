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

  async respond(message: string, requestId?: string): Promise<{ text: string; source: "openai" | "local"; requestId: string | null }> {
    await this.orchestrator.initialize();
    const id = requestId ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const reply = await this.orchestrator.process(message, id);
    const source = reply.toLowerCase().includes("fallback") ? "local" : "openai";
    await this.memorySystem.extract(`${message} | ${reply}`);
    return { text: reply, source, requestId: id };
  }

  async respondEngineering(message: string, requestId?: string): Promise<{ text: string; source: "openai" | "local"; requestId: string | null }> {
    const id = requestId ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const reply = await this.engineer.answer(message);
    await this.memorySystem.extract(`${message} | ${reply.text}`);
    return { ...reply, requestId: id };
  }

  setMode(mode: AssistantConversationState["activeMode"]): void {
    this.state.activeMode = mode;
  }

  setVoiceEnabled(enabled: boolean): void {
    this.state.voiceEnabled = enabled;
  }
}
