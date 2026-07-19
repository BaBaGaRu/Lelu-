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


import {
  useGenesis,
} from "./GenesisCore";


import AIService
  from "../../../core/AIService";





const ai =

  new AIService();





export default function GenesisChat() {


  const {

    addMessage,

    setThinking,

    notify,

  } = useGenesis();





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