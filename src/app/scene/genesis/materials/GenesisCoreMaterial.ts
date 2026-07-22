import {
  AdditiveBlending,
  Color,
  FrontSide,
  ShaderMaterial,
} from "three";

export default class GenesisCoreMaterial extends ShaderMaterial {

  constructor() {

    super({

      transparent: true,

      depthWrite: false,

      depthTest: true,

      blending: AdditiveBlending,

      side: FrontSide,

      uniforms: {

        uTime: {
          value: 0,
        },

        uActivity: {
          value: 0,
        },

        uCoreColor: {
          value: new Color("#38bfff"),
        },

        uGlowColor: {
          value: new Color("#dffcff"),
        },

      },

      vertexShader: `
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform float uTime;
uniform float uActivity;

void main(){

    vNormal = normalize(normalMatrix * normal);

    float wave =

        sin(position.y * 8.0 + uTime * 2.5) * 0.02 +

        sin(position.x * 6.0 - uTime * 1.8) * 0.015 +

        sin(position.z * 10.0 + uTime * 4.0) * 0.008;

    wave *=

        1.0 +

        uActivity * 0.45;

    vec3 displaced =

        position +

        normal * wave;

    vec4 worldPosition =

        modelMatrix *

        vec4(displaced,1.0);

    vWorldPosition =

        worldPosition.xyz;

    gl_Position =

        projectionMatrix *

        viewMatrix *

        worldPosition;

}
`,

      fragmentShader: `
uniform vec3 uCoreColor;
uniform vec3 uGlowColor;
uniform float uTime;
uniform float uActivity;

varying vec3 vNormal;
varying vec3 vWorldPosition;

void main(){

    vec3 viewDir =

        normalize(

            cameraPosition -

            vWorldPosition

        );

    float fresnel =

        pow(

            1.0 -

            max(

                dot(

                    normalize(vNormal),

                    viewDir

                ),

                0.0

            ),

            3.5

        );

    float energy =

        0.6 +

        0.4 *

        sin(

            uTime * 3.5

        );

    float veins =

        sin(

            vWorldPosition.y * 18.0 +

            uTime * 5.0

        ) *

        0.5 +

        0.5;

    veins +=

        sin(

            vWorldPosition.x * 12.0 -

            uTime * 3.0

        ) *

        0.25;

    energy +=

        veins * 0.25;

    energy +=

        uActivity * 0.35;

    vec3 color =

        mix(

            uCoreColor,

            uGlowColor,

            fresnel

        );

    color *=

        energy;

    float alpha =

        0.45 +

        fresnel * 0.45 +

        uActivity * 0.08;

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