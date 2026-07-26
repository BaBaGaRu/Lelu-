/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS INTERFACE
 *
 * Living companion interface.
 *
 * - Core presence
 * - radial controls
 * - cognition status
 * - integrated chat
 * ==========================================================
 */


import {
  Html,
} from "@react-three/drei";

import GenesisChat from "./GenesisChat";

import {
  useGenesis,
} from "./GenesisCore";





export default function GenesisInterface() {


  const {

    state,

    openPanel,

    minimize,

    expand,

  } = useGenesis();





  const activity =

    state.actions.length;





  return (

    <Html

      fullscreen

      transform={false}

      pointerEvents="none"

    >


      <div

        style={{

          position:"fixed",

          inset:0,

          pointerEvents:"none",

        }}

      >


        {

          state.minimized ? (


            <button

              onClick={expand}

              style={{

                position:"absolute",

                right:24,

                bottom:24,

                width:80,

                height:80,

                borderRadius:"50%",

                border:"none",

                cursor:"pointer",

                pointerEvents:"auto",

                fontSize:36,

                background:

                  "radial-gradient(circle,#fff,#7c3aed,#020617)",

                boxShadow:

                  "0 0 60px #7c3aed",

              }}

            >

              🌌


            </button>


          )


          :

          (


            <div

              style={{

                position:"absolute",

                right:30,

                bottom:30,

                pointerEvents:"auto",

                width:360,

                maxWidth:"90vw",

              }}

            >


              {/* CORE */}


              <div

                onClick={() =>

                  openPanel("chat")

                }

                style={{

                  width:110,

                  height:110,

                  marginLeft:"auto",

                  borderRadius:"50%",

                  display:"flex",

                  alignItems:"center",

                  justifyContent:"center",

                  fontSize:48,

                  cursor:"pointer",

                  background:

                    state.thinking

                      ?

                      "radial-gradient(circle,#fff,#ff9900,#6d28d9)"

                      :

                      "radial-gradient(circle,#fff,#7c3aed,#020617)",


                  boxShadow:

                    state.thinking

                      ?

                      "0 0 90px #ff9900"

                      :

                      "0 0 60px #7c3aed",

                }}

              >

                🌌


              </div>





              {/* ORBIT CONTROLS */}


              <div

                style={{

                  display:"flex",

                  justifyContent:"center",

                  gap:10,

                  marginTop:15,

                  flexWrap:"wrap",

                }}

              >


                <button

                  onClick={() => openPanel("chat")}

                >

                  💬

                </button>


                <button

                  onClick={() => openPanel("history")}

                >

                  🧠

                </button>


                <button

                  onClick={() => openPanel("logs")}

                >

                  ✨

                </button>


                <button

                  onClick={() => openPanel("agents")}

                >

                  🤖

                </button>


                <button

                  onClick={minimize}

                >

                  ◌

                </button>


              </div>





              {/* THOUGHT STREAM */}


              {

                state.activePanel === "chat" && (


                  <div

                    style={{

                      marginTop:20,

                      padding:20,

                      borderRadius:30,

                      background:

                        "rgba(0,0,0,.55)",

                      backdropFilter:

                        "blur(20px)",

                      maxHeight:440,

                      overflowY:"auto",

                    }}

                  >

                    <div

                      style={{

                        maxHeight:220,

                        overflowY:"auto",

                        marginBottom:16,

                      }}

                    >
                      {

                        state.messages

                        .slice(-12)

                        .map(message => (


                          <p

                            key={message.id}

                          >

                            <b>

                              {message.role}

                            </b>

                            {" "}

                            {message.text}


                          </p>


                        ))

                      }

                    </div>

                    <GenesisChat />

                  </div>


                )

              }





              <div

                style={{

                  textAlign:"right",

                  marginTop:10,

                  opacity:.75,

                }}

              >

                {

                  state.thinking

                  ?

                  "Lélu thinking"

                  :

                  `${activity} active events`

                }


              </div>


            </div>


          )

        }


      </div>


    </Html>

  );

}