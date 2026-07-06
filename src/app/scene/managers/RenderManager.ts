/**
 * ==========================================================
 * LÉLUVERSE
 * RENDER MANAGER
 * ==========================================================
 */

import RenderPipeline

from "../genesis/render/RenderPipeline";

export default class RenderManager {

  readonly pipeline = new RenderPipeline();

  initialize() {

    this.pipeline.initialize();

  }

  render() {

    this.pipeline.render();

  }

  dispose() {

    this.pipeline.dispose();

  }

}