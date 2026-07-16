/**
 * ==========================================================
 * LÉLU
 * CHAT SERVICE
 * ==========================================================
 */

import ConversationCoordinator
  from "../../core/ConversationCoordinator";

import type {
  MemorySnapshot,
} from "../memory/MemoryService";

export interface ChatMessage {

  id: string;

  role:
    | "user"
    | "assistant";

  text: string;

  source:
    | "ai"
    | "local";

}

export interface AssistantReply {

  text: string;

  source:
    | "ai"
    | "local";

}

export default class ChatService {

  private readonly conversation =
    new ConversationCoordinator();

  constructor() {

    this.conversation
      .initialize()
      .catch(console.error);

  }

  async answer(

    message: string,

    _memory?: MemorySnapshot,

  ): Promise<AssistantReply> {

    const input =
      message.trim();

    if (!input) {

      return {

        text:
          "I'm ready whenever you are.",

        source:
          "local",

      };

    }

    try {

      const reply =
        await this.conversation.respond(
          input,
        );

      return {

        text:
          reply,

        source:
          "ai",

      };

    }

    catch (

      error,

    ) {

      console.error(

        "LÉLU Chat Error",

        error,

      );

      return {

        text:
          this.fallbackResponse(
            input,
          ),

        source:
          "local",

      };

    }

  }

  private fallbackResponse(

    message: string,

  ): string {

    return `I couldn't reach an AI provider.\n\nYou said:\n${message}`;

  }

}