import {
  Color,
  DoubleSide,
  ShaderMaterial,
} from "three";

export default class OceanMaterial extends ShaderMaterial {

  constructor() {

    super({

      transparent: true,

      depthWrite: false,

      side: DoubleSide,

      uniforms: {

        uTime: {
          value: 0,
        },

        uActivity: {
          value: 0,
        },

        uDeepColor: {
          value: new Color("#031225"),
        },

        uSurfaceColor: {
          value: new Color("#38cfff"),
        },

      },

      vertexShader: `

uniform float uTime;
uniform float uActivity;

varying vec3 vPosition;
varying vec3 vNormal;

void main(){

    vPosition = position;
    vNormal = normal;

    float wave =

        sin(position.x*4.0+uTime*0.8)*0.06 +

        cos(position.z*3.5-uTime*0.7)*0.05 +

        sin(position.x*10.0+uTime*2.5)*0.015 +

        cos(position.z*9.0-uTime*2.2)*0.015;

    wave *=

        1.0 +

        uActivity*0.35;

    vec3 displaced =

        position +

        normal*wave;

    gl_Position =

        projectionMatrix *

        modelViewMatrix *

        vec4(displaced,1.0);

}

`,

      fragmentShader: `

uniform vec3 uDeepColor;
uniform vec3 uSurfaceColor;

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main(){

    float depth =

        clamp(

            (vPosition.y+3.0)/6.0,

            0.0,

            1.0

        );

    float shimmer =

        sin(

            vPosition.x*8.0 +

            uTime*2.0

        ) *

        cos(

            vPosition.z*8.0 -

            uTime*1.8

        );

    shimmer =

        shimmer*0.08;

    vec3 color =

        mix(

            uDeepColor,

            uSurfaceColor,

            depth + shimmer

        );

    float fresnel =

        pow(

            1.0 -

            abs(vNormal.y),

            2.5

        );

    color +=

        fresnel *

        0.35;

    float alpha =

        0.08 +

        fresnel*0.22;

    gl_FragColor =

        vec4(

            color,

            alpha

        );

}

`

    });

  }

}