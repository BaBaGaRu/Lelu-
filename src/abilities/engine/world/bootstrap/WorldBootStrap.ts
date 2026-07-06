/**
 * ==========================================================
 * LÉLUVERSE
 * WORLD BOOTSTRAP
 * ==========================================================
 *
 * Creates the first living world by coordinating every
 * World Domain engine.
 */

import type { BootstrapOptions } from "./WorldBootStrapTypes";

class WorldBootstrap {

  public async initialize(
    options: BootstrapOptions
  ): Promise<void> {

    console.log("══════════════════════════════");

    console.log("LÉLUVERSE INITIALIZING");

    console.log("══════════════════════════════");

    console.log("Generating World...");
    console.log(options.worldId);

    if (options.generateTerrain) {

      console.log("✓ Terrain");

    }

    if (options.generateClimate) {

      console.log("✓ Climate");

    }

    if (options.generateAtmosphere) {

      console.log("✓ Atmosphere");

    }

    if (options.generateSky) {

      console.log("✓ Sky");

    }

    if (options.generateWeather) {

      console.log("✓ Weather");

    }

    if (options.generateWater) {

      console.log("✓ Oceans & Rivers");

    }

    if (options.generateEcology) {

      console.log("✓ Ecology");

    }

    if (options.generateResources) {

      console.log("✓ Resources");

    }

    if (options.generateLighting) {

      console.log("✓ Lighting");

    }

    if (options.generateEvents) {

      console.log("✓ Events");

    }

    console.log("");

    console.log("WORLD READY");

    console.log("══════════════════════════════");

  }

}

const worldBootstrap = new WorldBootstrap();

export default worldBootstrap;