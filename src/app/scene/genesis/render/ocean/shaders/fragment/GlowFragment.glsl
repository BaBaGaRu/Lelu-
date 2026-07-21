/**
 * ==========================================================
 * LÉLUVERSE
 * GLOW FRAGMENT
 * ==========================================================
 */

vec3 applyGlow(

    vec3 color,

    vec3 glowColor,

    vec2 uv,

    float time,

    float intensity

) {

    float pulse =

        sin(

            time * 1.5 +

            uv.x * 8.0 +

            uv.y * 8.0

        );

    pulse =

        pulse *

        0.5 +

        0.5;

    float halo =

        smoothstep(

            0.0,

            1.0,

            pulse

        );

    return

        color +

        glowColor *

        halo *

        intensity *

        0.25;

}