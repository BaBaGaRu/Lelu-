/**
 * ==========================================================
 * LÉLUVERSE
 * AURORA COSMOS
 *
 * Living cosmic ribbons.
 *
 * Scaled for Genesis space.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useMemo,
  useRef,
} from "react";


import {
  Group,
} from "three";





interface Ribbon {

  x:number;

  y:number;

  z:number;

  rotation:number;

  scale:number;

  speed:number;

  pulse:number;

  color:string;

}





const COUNT = 24;





export default function AuroraCosmos(){


  const root =

    useRef<Group>(null);





  const ribbons =

    useMemo<Ribbon[]>(()=>{


      const colors = [

        "#00FFE0",

        "#00D8FF",

        "#5D8CFF",

        "#7E5FFF",

        "#A56DFF",

      ];





      return Array.from({

        length:COUNT,

      }).map(()=>({


        x:

          (Math.random()-.5)*18,


        y:

          (Math.random()-.5)*12,


        z:

          -8 -

          Math.random()*25,


        rotation:

          Math.random() *

          Math.PI * 2,


        scale:

          4 +

          Math.random()*8,


        speed:

          .002 +

          Math.random()*.004,


        pulse:

          Math.random() *

          Math.PI * 2,


        color:

          colors[

            Math.floor(

              Math.random() *

              colors.length

            )

          ],


      }));


    },[]);





  useFrame(({clock},delta)=>{


    if(!root.current)

      return;





    const t =

      clock.elapsedTime;





    root.current.children.forEach(

      (mesh,index)=>{


        const r =

          ribbons[index];





        mesh.rotation.z +=

          delta *

          r.speed;





        mesh.rotation.y +=

          delta *

          r.speed *

          .5;





        mesh.position.x =

          r.x +

          Math.sin(

            t*.08 +

            index,

          )*.5;





        mesh.position.y =

          r.y +

          Math.cos(

            t*.06 +

            index,

          )*.4;





        const glow =

          .7 +

          Math.sin(

            t*1.4 +

            r.pulse,

          )*.15;





        mesh.scale.set(

          r.scale,

          glow*3,

          1,

        );


      },

    );


  });





  return (


    <group

      ref={root}

    >


      {

        ribbons.map((r,i)=>(


          <mesh

            key={i}

            position={[

              r.x,

              r.y,

              r.z,

            ]}

            rotation={[

              0,

              0,

              r.rotation,

            ]}

          >


            <planeGeometry

              args={[

                1,

                .08,

              ]}

            />


            <meshBasicMaterial

              color={r.color}

              transparent

              opacity={0.035}

              depthWrite={false}

            />


          </mesh>


        ))

      }


    </group>


  );


}