/**
 * ==========================================================
 * LÉLUVERSE
 * CORE LAYER
 *
 * Living Genesis core controller.
 *
 * Controls:
 * - core breathing
 * - rotation
 * - energy pulse
 *
 * Does not create visuals.
 * Only controls the mounted core children.
 * ==========================================================
 */


import {
  useFrame,
} from "@react-three/fiber";


import {
  useRef,
} from "react";


import {
  Group,
} from "three";


import {
  useGenesis,
} from "../GenesisCore";





interface Props {

  children?: React.ReactNode;

}





export default function CoreLayer({

  children,

}:Props){



  const {

    universe,

  } = useGenesis();





  const root =

    useRef<Group>(null);





  useFrame((_,delta)=>{


    if(!root.current)

      return;





    const energy =

      universe.energy ?? 0;



    const age =

      universe.age ?? 0;





    const pulse =


      1 +

      Math.sin(

        age * 0.8

      )

      *

      (

        0.02 +

        energy * 0.03

      );





    root.current.scale.setScalar(

      pulse,

    );





    root.current.rotation.y +=


      delta *

      (

        0.04 +

        energy * 0.02

      );





  });







  return (

    <group

      ref={root}

      name="LivingCoreController"

    >

      {children}

    </group>

  );

}