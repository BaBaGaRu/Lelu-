/**
 * ==========================================================
 * LÉLU
 * GROQ PROVIDER
 * ==========================================================
 */

import type AIProvider from "./AIProvider";

import type {
  AIRequest,
  AIResponse,
  AIProviderHealth,
} from "./AIProvider";


export default class GroqProvider
  implements AIProvider {


  readonly name =
    "Groq";


  readonly priority =
    2;


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
      "fast",
      "memory",
    ] as const;



  private apiKey =
    "";


  private initialized =
    false;


  private readonly model =
    "llama-3.3-70b-versatile";



  async initialize():
    Promise<void> {


    this.apiKey =
      import.meta.env.VITE_GROQ_API_KEY ??
      "";


    this.initialized =
      true;


    console.info(

      "[GroqProvider] Initialized",

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
`IDENTITY LOCK:

Your name is Lélu.

You are Lélu, the personal AI companion created by the user.

The underlying model is only the engine.
Never identify yourself as Llama.

If asked your name:
"My name is Lélu."

You help the user learn, build, organize,
research, and remember information.

If memory context is provided,
treat it as information from Lélu's memory system.`,

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

        "https://api.groq.com/openai/v1/chat/completions",

        {

          method:
            "POST",


          headers:
          {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${this.apiKey}`,

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


      throw new Error(

        `Groq failed ${response.status}: ${
          data?.error?.message ??
          raw
        }`,

      );

    }



    return {

      text:

        data.choices?.[0]

          ?.message

          ?.content ??

        "",


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