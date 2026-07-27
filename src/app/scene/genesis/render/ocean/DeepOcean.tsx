/**
 * ==========================================================
 * LÉLUVERSE
 * DEEP OCEAN
 *
 * Deep surrounding water layer.
 *
 * Soft planetary shell around Genesis Core.
 *
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


import OceanMaterial
  from "../../materials/OceanMaterial";


import type {
  OceanState,
} from "./Ocean";





interface Props {

  oceanState?: OceanState;

}







export default function DeepOcean({

  oceanState = {},

}:Props){


  const ocean =

    useRef<Group>(null);





  const materials =

    useMemo(

      () =>

        Array.from(

          {

            length:2,

          },

          () =>

            new OceanMaterial(),

        ),

      [],

    );





  const time =

    useRef(0);







  useFrame((_,delta)=>{


    if(!ocean.current)

      return;





    time.current += delta;





    const tide =

      oceanState.tide ?? 0.5;



    const current =

      oceanState.current ?? 0.5;



    const tsunami =

      oceanState.tsunami ?? 0;







    ocean.current.rotation.y +=


      delta *

      0.012 *

      current;





    ocean.current.rotation.x =


      Math.sin(

        time.current *

        0.12

      )

      *

      0.008 *

      tide;







    ocean.current.scale.setScalar(


      1 +

      Math.sin(

        time.current *

        0.5

      )

      *

      0.008 *

      tide +

      tsunami *

      0.015


    );







    materials.forEach((material,index)=>{


      if(material.uniforms.uTime)

        material.uniforms.uTime.value =

          time.current;



      if(material.uniforms.uActivity)

        material.uniforms.uActivity.value =


          tsunami *

          0.35 +

          current *

          0.2 +

          index *

          0.05;


    });



  });







  return (

    <group

      ref={ocean}

      name="DeepOcean"

      renderOrder={5}

    >



      {materials.map((material,index)=>{


        const radius =

          1.45 +

          index *

          0.12;



        return (

          <mesh

            key={index}

            renderOrder={5 + index}

          >



            <sphereGeometry

              args={[

                radius,

                96,

                96,

              ]}

            />



            <primitive

              object={material}

              attach="material"

            />



          </mesh>

        );


      })}



      <pointLight

        color="#009dff"

        intensity={0.5}

        distance={8}

      />



    </group>

  );

}