/**
 * ==========================================================
 * LÉLUVERSE
 * OVERLAY MANAGER
 *
 * Manages every interface overlay.
 * ==========================================================
 */

export interface InterfaceOverlay {

  id: string;

  type: string;

  visible: boolean;

  modal: boolean;

  priority: number;

}

export default class OverlayManager {

  private initialized =
    false;

  private readonly overlays =
    new Map<
      string,
      InterfaceOverlay
    >();

  initialize(): void {

    if (this.initialized)
      return;

    this.initialized = true;

  }

  update(
    _delta: number,
  ): void {

    if (!this.initialized)
      return;

  }

  shutdown(): void {

    this.overlays.clear();

    this.initialized = false;

  }

  register(
    overlay: InterfaceOverlay,
  ): void {

    this.overlays.set(
      overlay.id,
      overlay,
    );

  }

  unregister(
    id: string,
  ): void {

    this.overlays.delete(
      id,
    );

  }

  get(
    id: string,
  ): InterfaceOverlay | undefined {

    return this.overlays.get(
      id,
    );

  }

  getAll(): InterfaceOverlay[] {

    return Array.from(
      this.overlays.values(),
    );

  }

  show(
    id: string,
  ): void {

    const overlay =
      this.overlays.get(id);

    if (!overlay)
      return;

    overlay.visible = true;

  }

  hide(
    id: string,
  ): void {

    const overlay =
      this.overlays.get(id);

    if (!overlay)
      return;

    overlay.visible = false;

  }

  hideAll(): void {

    for (

      const overlay of

      this.overlays.values()

    ) {

      overlay.visible = false;

    }

  }

}