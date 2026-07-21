/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN SHADER
 * ==========================================================
 */

import {
  ShaderMaterial,
  Color,
} from "three";

import WaterVertex from "./vertex/WaterVertex.glsl";
import WaterFragment from "./fragment/WaterFragment.glsl";

const OceanShader = new ShaderMaterial({

  vertexShader: WaterVertex,

  fragmentShader: WaterFragment,

  transparent: true,

  side: 2,

  uniforms: {

    uTime: {

      value: 0,

    },

    uDeepColor: {

      value: new Color("#021B33"),

    },

    uSurfaceColor: {

      value: new Color("#1F7CFF"),

    },

    uFoamColor: {

      value: new Color("#FFFFFF"),

    },

    uGlowColor: {

      value: new Color("#66CCFF"),

    },

    uSkyColor: {

      value: new Color("#87CEEB"),

    },

    uLightColor: {

      value: new Color("#FFFFFF"),

    },

  },

});

export default OceanShader;