import {
  Color,
  ShaderMaterial,
} from "three";

export default class GenesisCoreMaterial extends ShaderMaterial {

  constructor() {

    super({

      transparent: true,

      depthWrite: false,

      uniforms: {

        uTime: {
          value: 0,
        },

        uActivity: {
          value: 0,
        },

        uCoreColor: {
          value: new Color("#55ccff"),
        },

        uGlowColor: {
          value: new Color("#ffffff"),
        },

      },

      vertexShader: `
varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;
uniform float uActivity;

void main(){

    vPosition = position;
    vNormal = normal;

    float wave =
        sin(position.y * 8.0 + uTime * 2.0) * 0.015;

    wave +=
        sin(position.x * 5.0 - uTime) * 0.01;

    wave *=
        1.0 + uActivity * 0.4;

    vec3 displaced =
        position +
        normal * wave;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(displaced,1.0);

}
`,

      fragmentShader: `
uniform vec3 uCoreColor;
uniform vec3 uGlowColor;
uniform float uTime;
uniform float uActivity;

varying vec3 vNormal;
varying vec3 vPosition;

void main(){

    float fresnel =
        pow(
            1.0 -
            abs(dot(
                normalize(vNormal),
                vec3(0.0,0.0,1.0)
            )),
            2.5
        );

    float pulse =
        0.5 +
        0.5 *
        sin(
            uTime * 3.0
        );

    pulse +=
        uActivity * 0.25;

    vec3 color =
        mix(
            uCoreColor,
            uGlowColor,
            fresnel
        );

    color *=
        0.8 +
        pulse * 0.4;

    gl_FragColor =
        vec4(
            color,
            0.92
        );

}
`

    });

  }

}