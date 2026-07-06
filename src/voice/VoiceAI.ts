/**
 * ==========================================================
 * LÉLU
 * VOICE AI
 * ==========================================================
 */

import AIRuntime from "../core/AIRuntime";
import VoiceOutput from "./VoiceOutput";

export default class VoiceAI {

  readonly runtime: AIRuntime;

  readonly output: VoiceOutput;

  constructor(

    runtime: AIRuntime,

    output: VoiceOutput,

  ) {

    this.runtime = runtime;

    this.output = output;

  }

  async respond(

    transcript: string,

  ): Promise<void> {

    const intent =

      this.runtime.router.route(

        transcript,

      );

    await this.output.speak(

      `Intent detected: ${intent}`,

    );

  }

}