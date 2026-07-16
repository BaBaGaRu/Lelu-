/**
 * ==========================================================
 * LÉLU
 * GROQ ADAPTER
 * ==========================================================
 */

import AIAdapter from "../AIAdapter";

export default class GroqAdapter extends AIAdapter {

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

      const errorText =
        await response.text();

      console.error(

        "Groq Error",

        {

          status:
            response.status,

          endpoint:
            cfg.endpoint,

          model:
            cfg.model,

          body:
            errorText,

        },

      );

      throw new Error(

        `Groq ${response.status}: ${errorText}`,

      );

    }

    const json =
      await response.json();

    console.log(

      "Groq Success",

      json,

    );

    return (

      json.choices?.[0]?.message?.content ??

      "No response."

    );

  }

}