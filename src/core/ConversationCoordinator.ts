/**
 * ==========================================================
 * LÉLU
 * CONVERSATION COORDINATOR
 * ==========================================================
 */

import AIService
  from "./AIService";

import PromptBuilder
  from "./PromptBuilder";

import MemoryCoordinator
  from "./MemoryCoordinator";

import ResearchCoordinator
  from "./ResearchCoordinator";

import ExecutionLogger
  from "./ExecutionLogger";

export default class ConversationCoordinator {

  private readonly ai =
    new AIService();

  private readonly prompt =
    new PromptBuilder();

  private readonly memory =
    new MemoryCoordinator();

  private readonly research =
    new ResearchCoordinator();

  private readonly logger =
    new ExecutionLogger();

  async initialize(): Promise<void> {

    this.logger.info(
      "Conversation",
      "Initializing",
    );

    await this.ai.initialize();

    await this.memory.initialize();

    this.logger.info(
      "Conversation",
      "Initialized",
    );

  }

  async respond(
    input: string,
  ): Promise<string> {

    this.logger.info(
      "Conversation",
      "Started",
    );

    const memories =
      await this.memory.search(
        input,
      );

    this.logger.info(
      "Memory",
      `Relevant memories: ${memories.length}`,
    );

    const recent =
      await this.memory.recent(
        10,
      );

    this.logger.info(
      "Memory",
      `Recent memories: ${recent.length}`,
    );

    const mergedMemories =
      [
        ...new Map(

          [...memories, ...recent]

            .map(

              memory => [

                memory.id,

                memory,

              ],

            ),

        ).values(),

      ];

    const memoryContext =
      mergedMemories

        .map(

          memory =>

`[${memory.space.toUpperCase()}]

${memory.title}

${memory.content}`,

        )

        .join("\n\n");

    const knowledge =
      await this.research.search(
        input,
      );

    this.logger.info(
      "Research",
      `Results: ${knowledge.length}`,
    );

    const knowledgeContext =
      knowledge

        .map(

          result =>

`${result.title}

${result.content}

${result.url ?? ""}`,

        )

        .join("\n\n");

    const prompt =
      this.prompt.build({

        system:

          "You are Lélu. You are intelligent, thoughtful, creative, engineering focused, and always use memories when they are relevant.",

        memory:
          memoryContext,

        knowledge:
          knowledgeContext,

        user:
          input,

      });

    this.logger.info(
      "Prompt",
      `${prompt.length} characters`,
    );

    const reply =
      await this.ai.send(
        prompt,
      );

    this.logger.info(
      "AI",
      "Reply received",
    );

    await this.memory.remember(

      input,

      reply,

    );

    const verify =
      await this.memory.search(
        input,
      );

    this.logger.info(
      "Memory",
      `Verification: ${verify.length} memories`,
    );

    this.logger.info(
      "Conversation",
      "Completed",
    );

    return reply;

  }

}