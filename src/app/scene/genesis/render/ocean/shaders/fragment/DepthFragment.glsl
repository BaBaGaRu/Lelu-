/**
 * ==========================================================
 * LÉLUVERSE
 * DEPTH FRAGMENT
 * ==========================================================
 */

vec3 applyDepthColor(

    vec3 shallowColor,

    vec3 deepColor,

    float depth,

    float strength

) {

    float factor =

        clamp(

            depth *

            strength,

            0.0,

            1.0

        );

    return

        mix(

            shallowColor,

            deepColor,

            factor

        );

}

float depthFade(

    float depth,

    float start,

    float end

) {

    return

        smoothstep(

            start,

            end,

            depth

        );

}

vec3 applyDepthFog(

    vec3 color,

    vec3 fogColor,

    float depth,

    float density

) {

    float fog =

        1.0 -

        exp(

            -depth *

            density

        );

    fog =

        clamp(

            fog,

            0.0,

            1.0

        );

    return

        mix(

            color,

            fogColor,

            fog

        );

}

float applyWaterAbsorption(

    float depth,

    float absorption

) {

    return

        exp(

            -depth *

            absorption

        );

}