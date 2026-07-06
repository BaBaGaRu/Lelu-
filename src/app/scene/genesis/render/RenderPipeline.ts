/**
 * ==========================================================
 * LÉLUVERSE
 * RENDER PIPELINE
 * ==========================================================
 */

export default class RenderPipeline {

  private initialized = false;

  initialize(): void {

    this.initialized = true;

  }

  render(): void {

    if (!this.initialized) return;

    /**
     * Future GPU pipeline.
     */

  }

  dispose(): void {

    this.initialized = false;

  }

}