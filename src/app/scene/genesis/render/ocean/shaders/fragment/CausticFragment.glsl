/**
 * ==========================================================
 * LÉLUVERSE
 * CAUSTIC FRAGMENT
 * ==========================================================
 */

float applyCaustics(

    vec2 uv,

    float time,

    float strength

) {

    float x =

        sin(

            uv.x * 60.0 +

            time * 3.0

        );

    float y =

        sin(

            uv.y * 60.0 +

            time * 2.0

        );

    float light =

        (x * y) *

        0.5 +

        0.5;

    return

        light *

        strength;

}