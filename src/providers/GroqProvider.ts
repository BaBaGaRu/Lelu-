/**
 * ==========================================================
 * LÉLU
 * GROQ PROVIDER
 * ==========================================================
 */

import config
  from "../core/ProviderConfig";

export default class GroqProvider {

  readonly name =
    "groq";

  readonly enabled =
    true;

  readonly priority =
    100;

  canHandle(
    _input: string,
  ): boolean {

    return true;

  }

  async generate(
    input: string,
  ): Promise<string> {

    const apiKey =
      config.groqApiKey;

    if (!apiKey) {

      throw new Error(
        "Groq API key missing.",
      );

    }

    try {

      const response =
        await fetch(

          "https://api.groq.com/openai/v1/chat/completions",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${apiKey}`,

            },

            body: JSON.stringify({

              model:
                "llama-3.3-70b-versatile",

              temperature:
                0.7,

              messages: [

                {

                  role:
                    "system",

                  content:
                    "You are Lélu, an intelligent AI companion with memory, research, engineering, and reasoning abilities.",

                },

                {

                  role:
                    "user",

                  content:
                    input,

                },

              ],

            }),

          },

        );

      if (!response.ok) {

        const error =
          await response.text();

        console.error(

          "[GroqProvider]",

          response.status,

          error,

        );

        throw new Error(

          `Groq ${response.status}: ${error}`,

        );

      }

      const json =
        await response.json();

      return (

        json.choices?.[0]?.message?.content ??

        "No response."

      );

    }

    catch (

      error

    ) {

      console.error(

        "[GroqProvider] Request Failed",

        error,

      );

      throw error;

    }

  }

}