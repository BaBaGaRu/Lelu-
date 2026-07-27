/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CHAT
 *
 * Living chat interface.
 *
 * Connects:
 *
 * User
 *  ↓
 * AIService
 *  ↓
 * Brain / Memory
 *  ↓
 * GenesisCore
 *  ↓
 * Living Genesis
 *
 * ==========================================================
 */


import {
  useState,
} from "react";


import AIService
  from "../../../core/AIService";


interface GenesisChatProps {
  addMessage?: (message: { id: string; role: "user" | "assistant"; text: string; timestamp: number; source: "ai" | "local"; provider?: string; confidence?: number }) => void;
  setThinking?: (value: boolean) => void;
  notify?: (title: string, description?: string) => void;
}


const ai =

  AIService.getInstance();





export default function GenesisChat({ addMessage: addMessageProp, setThinking: setThinkingProp, notify: notifyProp }: GenesisChatProps) {


  const addMessage =
    addMessageProp ?? (() => undefined);

  const setThinking =
    setThinkingProp ?? (() => undefined);

  const notify =
    notifyProp ?? (() => undefined);





  const [

    input,

    setInput,

  ] = useState("");





  async function sendMessage() {


    const message =

      input.trim();





    if (!message) {


      return;

    }





    setInput("");





    addMessage({

      id:

        crypto.randomUUID(),


      role:

        "user",


      text:

        message,


      timestamp:

        Date.now(),


      source:

        "local",

    });





    setThinking(true);





    try {


      const response =

        await ai.chat(

          message,

        );





      addMessage({

        id:

          crypto.randomUUID(),


        role:

          "assistant",


        text:

          response.text,


        timestamp:

          Date.now(),


        source:

          "ai",


        provider:

          response.provider,



        confidence:

          response.metadata?.confidence as number | undefined,

      });





    }

    catch(error) {


      notify(

        "Lélu Error",

        error instanceof Error

          ? error.message

          : String(error),

      );


    }

    finally {


      setThinking(false);


    }


  }





  return (

    <div

      className="genesis-chat"

    >


      <input

        value={input}

        onChange={(event) =>

          setInput(

            event.target.value,

          )

        }


        onKeyDown={(event) => {


          if (

            event.key === "Enter"

          ) {


            sendMessage();

          }


        }}


        placeholder="Speak with Lélu..."

      />





      <button

        onClick={sendMessage}

      >

        Send

      </button>


    </div>

  );

}