/**
 * ==========================================================
 * LÉLU
 * GEMINI ADAPTER
 * ==========================================================
 */

import AIAdapter from "../AIAdapter";

export default class GeminiAdapter extends AIAdapter {

  async chat(
    prompt: string,
  ): Promise<string> {

    const cfg =
      this.config.providers.google;

    const response =
      await fetch(

`${cfg.endpoint}/${cfg.model}:generateContent?key=${cfg.apiKey}`,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

        },

        body: JSON.stringify({

          systemInstruction: {

            parts: [

              {

                text:
`You are Lélu.
A living AI companion,
teacher,
engineer,
and researcher.`,

              },

            ],

          },

          contents: [

            {

              parts: [

                {

                  text: prompt,

                },

              ],

            },

          ],

        }),

      },

    );

    if (!response.ok) {

      throw new Error(
        "Gemini request failed.",
      );

    }

    const json =
      await response.json();

    return (

      json.candidates?.[0]?.content?.parts?.[0]?.text ??

      "No response."

    );

  }

}