import {
  Color,
  DoubleSide,
  ShaderMaterial,
} from "three";

export default class OceanMaterial extends ShaderMaterial {

  constructor() {

    super({

      transparent: true,

      depthWrite: true,

      depthTest: true,

      side: DoubleSide,

      uniforms: {

        uTime: {
          value: 0,
        },

        uActivity: {
          value: 0,
        },

        uDeepColor: {
          value: new Color("#003b7a"),
        },

        uSurfaceColor: {
          value: new Color("#32c8ff"),
        },

      },

      vertexShader: `

varying vec3 vWorldPosition;
varying vec3 vNormal;

uniform float uTime;

void main(){

    vec3 p = position;

    p.y +=
        sin(p.x * 0.25 + uTime * 0.9) * 0.35;

    p.y +=
        cos(p.z * 0.20 + uTime * 1.2) * 0.25;

    p.y +=
        sin((p.x + p.z) * 0.12 + uTime * 0.6) * 0.20;

    vec4 world = modelMatrix * vec4(p,1.0);

    vWorldPosition = world.xyz;

    vNormal = normalize(normalMatrix * normal);

    gl_Position =
        projectionMatrix *
        viewMatrix *
        world;

}

`,

      fragmentShader: `

uniform vec3 uDeepColor;
uniform vec3 uSurfaceColor;

varying vec3 vWorldPosition;
varying vec3 vNormal;

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
            3.0
        );

    vec3 color =
        mix(
            uDeepColor,
            uSurfaceColor,
            fresnel
        );

    gl_FragColor =
        vec4(
            color,
            0.82
        );

}

`

    });

  }

}