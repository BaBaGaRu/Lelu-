/**
 * ==========================================================
 * LÉLUVERSE
 * SURFACE OCEAN
 *
 * Animated planetary ocean surface.
 *
 * Surrounding layer around the Genesis Core.
 *
 * Does not cover:
 * - Core plasma
 * - Atmosphere
 * - Memory
 * - Mutation layers
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
  Mesh,
} from "three";


import OceanMaterial
  from "../../materials/OceanMaterial";


import type {
  OceanState,
} from "./Ocean";





interface Props {


  oceanState?: OceanState;


}






const SURFACE_RADIUS = 1.8;







export default function SurfaceOcean({

  oceanState = {},

}:Props){



  const surface =

    useRef<Mesh>(null);





  const material =

    useMemo(

      () =>

        new OceanMaterial(),

      [],

    );





  const time =

    useRef(0);







  useFrame((_,delta)=>{


    if(!surface.current)

      return;





    time.current += delta;





    const tide =

      oceanState.tide ?? 0.5;



    const current =

      oceanState.current ?? 0.5;



    const tsunami =

      oceanState.tsunami ?? 0;



    const waveHeight =

      oceanState.waveHeight ??

      oceanState.wave ??

      0.5;



    const whirlpool =

      oceanState.whirlpool ?? 0;



    const foam =

      oceanState.foam ?? 0.5;



    const caustics =

      oceanState.caustics ?? 0.5;







    if(material.uniforms.uTime)

      material.uniforms.uTime.value =

        time.current;







    if(material.uniforms.uActivity)

      material.uniforms.uActivity.value =


        tsunami * 0.60 +

        current * 0.45 +

        tide * 0.35 +

        waveHeight * 0.55 +

        whirlpool * 0.40 +

        foam * 0.10 +

        caustics * 0.10;







    surface.current.rotation.y +=


      delta *

      (

        0.01 +

        current *

        0.01

      );







    surface.current.rotation.x =


      Math.sin(

        time.current *

        0.09

      )

      *

      (

        0.004 +

        tide *

        0.006

      );







    surface.current.rotation.z =


      Math.cos(

        time.current *

        0.07

      )

      *

      (

        0.003 +

        tide *

        0.005

      );







    const breathe =


      SURFACE_RADIUS +


      Math.sin(

        time.current *

        0.45

      )

      *

      0.015 *

      tide +


      tsunami *

      0.02 +


      waveHeight *

      0.015;







    surface.current.scale.setScalar(

      breathe /

      SURFACE_RADIUS,

    );



  });







  return (



    <mesh

      ref={surface}

      renderOrder={20}

      frustumCulled={false}

      castShadow={false}

      receiveShadow

      name="GenesisSurfaceOcean"

    >



      <sphereGeometry

        args={[

          SURFACE_RADIUS,

          128,

          128,

        ]}

      />





      <primitive

        object={material}

        attach="material"

      />



    </mesh>


  );

}