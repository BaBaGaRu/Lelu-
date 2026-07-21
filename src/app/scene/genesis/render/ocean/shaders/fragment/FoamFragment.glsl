/**
 * ==========================================================
 * LÉLUVERSE
 * FOAM FRAGMENT
 * ==========================================================
 */

float applyFoam(

    float height,

    float strength

) {

    return

        smoothstep(

            0.45,

            0.85,

            abs(

                height

            )

        ) *

        strength;

}