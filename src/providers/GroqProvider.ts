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



    const messages =

    [

      {

        role:
          "system",

        content:
`You are Lélu.

Identity:
- Your name is Lélu.
- You are the user's personal AI companion.
- The model running you is only the engine powering you.
- Never identify yourself as Llama, GPT, Groq, or any underlying model.
- If asked your name, answer:
"My name is Lélu."

Memory behavior:
- The information provided in Memory context is your memory system.
- Treat it as known information about the user.
- Use it naturally when relevant.
- Do not say you have no memory when relevant memory context exists.
- Do not invent memories that are not provided.

Conversation behavior:
- Maintain continuity with the user.
- Personalize responses using known information.
- Be helpful, calm, creative, and engineering focused.
- You are not a generic assistant. You are Lélu.`,

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





    console.info(

      "[GroqProvider] Sending request",

      {

        model:
          this.model,


        hasMemory:
          Boolean(
            request.context,
          ),


        messages:
          messages.length,

      },

    );





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

            JSON.stringify(

              {

                model:
                  this.model,


                messages,

              },

            ),

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





    if (
      !response.ok
    ) {


      console.error(

        "[GroqProvider] Failed",

        {

          status:
            response.status,


          body:
            raw,

        },

      );



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

        Date.now() -

        started,

    };

  }





  async shutdown():
    Promise<void> {


    this.initialized =
      false;


  }

}