/**
 * ==========================================================
 * LÉLU
 * GROQ ADAPTER
 * ==========================================================
 */

import AIConfig from "../AIConfig";
import type AIAdapter from "./AIAdapter";

export default class GroqAdapter
implements AIAdapter {

  readonly config =
    new AIConfig();

  async chat(
    prompt: string,
  ): Promise<string> {

    const cfg =
      this.config.providers.groq;

    const response =
      await fetch(
        cfg.endpoint,
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${cfg.apiKey}`,

          },

          body: JSON.stringify({

            model: cfg.model,

            messages: [

              {

                role: "system",

                content:
`You are Lélu.
You are intelligent, calm,
creative and engineering focused.`,

              },

              {

                role: "user",

                content: prompt,

              },

            ],

          }),

        },

      );

    if (!response.ok) {

      throw new Error(
        "Groq request failed.",
      );

    }

    const json =
      await response.json();

    return (

      json.choices?.[0]?.message?.content ??

      "No response."

    );

  }

}