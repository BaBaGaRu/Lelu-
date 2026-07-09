import { createOpenAIClient, OPENAI_MODEL } from "../providers/OpenAIConfig";
import type { MemorySnapshot } from "../memory/MemoryService";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  source: "openai" | "local";
}

export interface AssistantReply {
  text: string;
  source: "openai" | "local";
}

export default class ChatService {
  private readonly client = createOpenAIClient();

  async answer(message: string, memory?: MemorySnapshot): Promise<AssistantReply> {
    const normalized = message.trim();

    if (!normalized) {
      return {
        text: "I’m ready when you are.",
        source: "local",
      };
    }

    if (this.client) {
      try {
        const completion = await this.client.chat.completions.create({
          model: OPENAI_MODEL,
          messages: [
            {
              role: "system",
              content:
                "You are Lélu, a calm and thoughtful AI companion for a creative app.",
            },
            {
              role: "user",
              content: this.buildPrompt(normalized, memory),
            },
          ],
        });

        const response = completion.choices[0]?.message?.content?.trim();

        if (response) {
          return {
            text: response,
            source: "openai",
          };
        }
      }
      catch (error) {
        console.warn("OpenAI request failed, falling back to local reply.", error);
      }
    }

    return {
      text: this.fallbackResponse(normalized),
      source: "local",
    };
  }

  private buildPrompt(message: string, memory?: MemorySnapshot): string {
    const memoryContext = memory?.shortTerm?.slice(-4).map((entry) => entry.text).join(" | ");

    return [
      `User message: ${message}`,
      memoryContext ? `Recent memory: ${memoryContext}` : "",
      "Respond briefly and warmly.",
    ]
      .filter(Boolean)
      .join("\n");
  }

  private fallbackResponse(message: string): string {
    const lowered = message.toLowerCase();

    if (lowered.includes("hello") || lowered.includes("hi")) {
      return "Hello there. I’m Lélu, and I’m ready to help you think, build, and explore.";
    }

    if (lowered.includes("remember")) {
      return "I’ll keep that in memory for the next exchange.";
    }

    if (lowered.includes("help")) {
      return "I can help with conversation, engineering ideas, and short-term memory.";
    }

    return `You said: ${message}. I’m using the local fallback response for now.`;
  }
}
