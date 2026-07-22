import {
  AdditiveBlending,
  BackSide,
  Color,
  ShaderMaterial,
} from "three";

export default class HaloMaterial extends ShaderMaterial {

  constructor() {

    super({

      transparent: true,

      depthWrite: false,

      blending: AdditiveBlending,

      side: BackSide,

      uniforms: {

        uTime: { value: 0 },

        uIntensity: { value: 1 },

        uColor: {
          value: new Color("#7ce7ff"),
        },

      },

      vertexShader: `

varying vec3 vNormal;

void main(){

    vNormal = normalize(normalMatrix * normal);

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(position,1.0);

}

`,

      fragmentShader: `

uniform float uTime;
uniform float uIntensity;
uniform vec3 uColor;

varying vec3 vNormal;

void main(){

    float rim =
        pow(
            1.0 -
            abs(vNormal.z),
            4.0
        );

    float wave =
        0.9 +
        0.1 *
        sin(
            uTime * 0.6
        );

    vec3 color =
        uColor *
        rim *
        wave *
        uIntensity;

    gl_FragColor =
        vec4(
            color,
            rim * 0.75
        );

}

`

    });

  }

}