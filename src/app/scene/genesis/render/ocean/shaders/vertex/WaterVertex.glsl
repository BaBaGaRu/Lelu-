/**
 * ==========================================================
 * LÉLUVERSE
 * WATER VERTEX SHADER
 * ==========================================================
 */

uniform float uTime;
uniform float uWaveHeight;
uniform float uTide;
uniform float uCurrent;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vHeight;

void main() {

    vUv = uv;

    vec3 position = position;

    float waveA =
        sin(
            position.x * 0.18 +
            uTime * uCurrent
        );

    float waveB =
        cos(
            position.z * 0.15 +
            uTime * 0.8
        );

    float waveC =
        sin(
            (position.x + position.z)
            * 0.08 +
            uTime * 0.5
        );

    float tide =
        sin(
            uTime * 0.12
        ) * uTide;

    float height =

        waveA * 0.7 +

        waveB * 0.5 +

        waveC * 0.8 +

        tide;

    position.y +=

        height *

        uWaveHeight;

    vHeight = height;

    vPosition = position;

    vNormal = normal;

    gl_Position =

        projectionMatrix *

        modelViewMatrix *

        vec4(

            position,

            1.0

        );

}