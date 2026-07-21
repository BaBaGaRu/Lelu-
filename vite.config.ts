import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

import glslIncludes from "./plugins/glslIncludes.js";

export default defineConfig({

  plugins: [

    react(),

    glslIncludes(),

    glsl({

      include: [

        "**/*.glsl",

        "**/*.vert",

        "**/*.frag",

      ],

      exclude: [

        "node_modules/**",

      ],

      warnDuplicatedImports: false,

      watch: true,

      compress: false,

    }),

  ],

  server: {

    host: true,

    port: 5173,

  },

  preview: {

    host: true,

    port: 4173,

  },

  resolve: {

    extensions: [

      ".ts",

      ".tsx",

      ".js",

      ".jsx",

      ".json",

      ".glsl",

    ],

  },

});