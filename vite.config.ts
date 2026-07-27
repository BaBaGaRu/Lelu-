import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

import glslIncludes from "./plugins/glslIncludes.js";

export default defineConfig({

  base: "/",

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

    host: "0.0.0.0",

    port: 5173,

    strictPort: true,

    hmr: {

      host: "localhost",

      clientPort: 5173,

      protocol: "ws",

    },

  },

  preview: {

    host: "0.0.0.0",

    port: 4173,

    strictPort: true,

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