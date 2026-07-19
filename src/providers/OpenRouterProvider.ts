/**
 * ==========================================================
 * LÉLU
 * OPENROUTER PROVIDER
 * ==========================================================
 */

import type AIProvider from "./AIProvider";

import type {
  AIRequest,
  AIResponse,
  AIProviderHealth,
} from "./AIProvider";


export default class OpenRouterProvider
  implements AIProvider {


  readonly name =
    "OpenRouter";


  readonly priority =
    1;


  readonly enabled =
    true;


  readonly timeout =
    30000;


  readonly requiresApiKey =
    true;


  readonly capabilities =
    [
      "chat",
      "reasoning",
      "multi-model",
      "memory",
    ] as const;



  private apiKey =
    "";


  private initialized =
    false;



  private readonly model =
    import.meta.env.VITE_OPENROUTER_MODEL ??
    "openai/gpt-5.5";



  async initialize():
    Promise<void> {


    this.apiKey =
      import.meta.env.VITE_OPENROUTER_API_KEY ??
      "";


    this.initialized =
      true;


    console.info(

      "[OpenRouterProvider] Initialized",

      {

        hasKey:
          this.apiKey.length > 0,

        model:
          this.model,

      },

    );

  }



  async isAvailable():
    Promise<boolean> {


    return (

      this.initialized &&

      this.apiKey.length > 0

    );

  }



  async health():
    Promise<AIProviderHealth> {


    return {

      available:
        await this.isAvailable(),

      initialized:
        this.initialized,

      lastChecked:
        Date.now(),

    };

  }



  canHandle(
    _input:
      string,
  ):
    boolean {

    return true;

  }



  async generate(
    request:
      AIRequest,
  ):
    Promise<AIResponse> {


    const started =
      Date.now();



    const messages = [

      {

        role:
          "system",

        content:
`You are Lélu.

Your name is Lélu.

You are the personal AI companion created by the user.

The model powering you is only the engine.
Never identify yourself as Llama, GPT, or another model.

If asked your name:
"My name is Lélu."

Maintain the Lélu identity.`,

      },


      ...(request.context

        ? [

            {

              role:
                "system",

              content:
`Memory context:

${request.context}`,

            },

          ]

        : []

      ),


      ...(request.messages ?? []),


      {

        role:
          "user",

        content:
          request.prompt,

      },

    ];



    const response =
      await fetch(

        "https://openrouter.ai/api/v1/chat/completions",

        {

          method:
            "POST",


          headers:
          {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${this.apiKey}`,

            "HTTP-Referer":
              window.location.origin,

            "X-Title":
              "LÉLU",

          },


          body:
            JSON.stringify({

              model:
                this.model,

              messages,

            }),

        },

      );



    const raw =
      await response.text();



    let data:
      any = null;



    try {

      data =
        JSON.parse(raw);

    }

    catch {

      data =
        null;

    }



    if (!response.ok) {


      console.error(

        "[OpenRouterProvider] ERROR",

        {

          status:
            response.status,

          body:
            raw,

          model:
            this.model,

        },

      );


      throw new Error(

        `OpenRouter failed ${response.status}: ${
          data?.error?.message ??
          raw
        }`,

      );

    }



    const text =
      data.choices?.[0]
        ?.message
        ?.content ??
      "";



    return {

      text,

      provider:
        this.name,

      model:
        this.model,

      processingTime:
        Date.now() - started,

    };

  }



  async shutdown():
    Promise<void> {


    this.initialized =
      false;

  }

}