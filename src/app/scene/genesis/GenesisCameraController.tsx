/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CAMERA CONTROLLER
 *
 * Connects:
 *
 * GenesisNavigator
 *        ↓
 * Three camera
 *
 * ==========================================================
 */


import {
  useEffect,
  useRef,
} from "react";


import {
  useThree,
} from "@react-three/fiber";


import type GenesisNavigator
  from "./GenesisNavigator";





interface GenesisCameraControllerProps {


  navigator:

    GenesisNavigator;

}





export default function GenesisCameraController({

  navigator,

}: GenesisCameraControllerProps) {


  const {

    camera,

  } = useThree();





  const target =

    useRef({

      x: 0,

      y: 0,

      z: 8,

    });





  useEffect(() => {


    const unsubscribe =

      navigator.subscribe(

        state => {


          if (!state.target) {

            return;

          }





          target.current =

          {

            x:

              state.target.position.x,


            y:

              state.target.position.y,


            z:

              state.target.position.z + 5,

          };


        },

      );





    return unsubscribe;


  }, [

    navigator,

  ]);





  useEffect(() => {


    function update() {


      camera.position.x +=

        (

          target.current.x -

          camera.position.x

        ) * 0.05;



      camera.position.y +=

        (

          target.current.y -

          camera.position.y

        ) * 0.05;



      camera.position.z +=

        (

          target.current.z -

          camera.position.z

        ) * 0.05;

    }





    const id =

      setInterval(

        update,

        16,

      );





    return () =>

      clearInterval(id);


  }, [

    camera,

  ]);





  return null;

}