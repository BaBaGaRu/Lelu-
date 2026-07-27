/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CORE MATERIAL
 *
 * Magnetized living plasma shader.
 *
 * Features:
 * - turbulent convection
 * - plasma currents
 * - magnetic ribbons
 * - deep glow
 * - surface distortion
 * - energy breathing
 *
 * ==========================================================
 */


import {
  AdditiveBlending,
  Color,
  FrontSide,
  ShaderMaterial,
} from "three";





export default class GenesisCoreMaterial extends ShaderMaterial {


  constructor(){


    super({


      transparent:true,

      depthWrite:false,

      depthTest:true,

      blending:AdditiveBlending,

      side:FrontSide,





      uniforms:{


        uTime:{
          value:0,
        },


        uActivity:{
          value:0.25,
        },


        uEvolution:{
          value:0,
        },


        uAwareness:{
          value:0,
        },


        uMutation:{
          value:0,
        },


        uCoreColor:{
          value:new Color("#009cff"),
        },


        uGlowColor:{
          value:new Color("#ffffff"),
        },


      },







      vertexShader:`

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;


uniform float uTime;
uniform float uActivity;
uniform float uEvolution;
uniform float uMutation;



float turbulence(vec3 p){


    float n = 0.0;


    n += sin(
        p.x * 9.0 +
        uTime * 1.8
    );


    n += sin(
        p.y * 13.0 -
        uTime * 2.4
    );


    n += sin(
        p.z * 11.0 +
        uTime * 3.0
    );


    n += sin(
        (p.x+p.y+p.z) * 20.0 +
        uTime * 4.0
    );


    n += sin(
        length(p) * 18.0 -
        uTime * 2.0
    );


    return n / 5.0;

}





void main(){



    vNormal =

        normalize(

            normalMatrix *

            normal

        );



    vPosition = position;



    float plasma =


        turbulence(

            position * 1.8

        )

        +

        turbulence(

            position * 4.0

        )

        *

        0.35;





    float distortion =


        0.12 +

        uActivity *

        0.18 +

        uMutation *

        0.20 +

        uEvolution *

        0.08;





    vec3 displaced =


        position +

        normal *

        plasma *

        distortion;





    vec4 world =


        modelMatrix *

        vec4(

            displaced,

            1.0

        );





    vWorldPosition =

        world.xyz;





    gl_Position =


        projectionMatrix *

        viewMatrix *

        world;


}

`,







      fragmentShader:`

uniform vec3 uCoreColor;

uniform vec3 uGlowColor;


uniform float uTime;

uniform float uActivity;

uniform float uAwareness;

uniform float uMutation;

uniform float uEvolution;


varying vec3 vNormal;

varying vec3 vPosition;

varying vec3 vWorldPosition;





float plasmaNoise(vec3 p){


    return

        sin(

            p.x * 16.0 +

            uTime * 2.5

        )

        *

        sin(

            p.y * 20.0 -

            uTime * 1.8

        )

        *

        sin(

            p.z * 14.0 +

            uTime * 3.2

        );


}







void main(){



    vec3 normal =

        normalize(

            vNormal

        );





    vec3 viewDirection =

        normalize(

            cameraPosition -

            vWorldPosition

        );





    float fresnel =


        pow(

            1.0 -

            max(

                dot(

                    normal,

                    viewDirection

                ),

                0.0

            ),

            3.0

        );







    float magneticBands =


        sin(

            vPosition.y *

            28.0 +

            sin(

              vPosition.x *

              8.0

            )

            +

            uTime *

            4.0

        );





    magneticBands =


        magneticBands *

        0.5 +

        0.5;







    float cells =


        plasmaNoise(

            vPosition *

            3.0

        )

        *

        0.5 +

        0.5;







    float heat =


        magneticBands *

        0.55 +


        cells *

        0.45;







    heat +=


        uActivity *

        0.45;


    heat +=


        uMutation *

        0.35;


    heat +=


        uEvolution *

        0.20;


    heat +=


        uAwareness *

        0.15;







    float pulse =


        0.8 +

        sin(

            uTime *

            5.0

        )

        *

        0.2;







    vec3 plasma =


        mix(

            uCoreColor,

            uGlowColor,

            heat

        );







    plasma *=


        pulse +

        0.35;







    plasma +=


        uGlowColor *

        fresnel *

        2.2;







    float alpha =


        0.72 +

        fresnel *

        0.28 +

        heat *

        0.12;







    gl_FragColor =


        vec4(

            plasma,

            alpha

        );


}

`

    });


  }


}