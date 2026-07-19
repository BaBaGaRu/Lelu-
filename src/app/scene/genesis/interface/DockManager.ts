/**
 * ==========================================================
 * LÉLUVERSE
 * DOCK MANAGER
 *
 * Manages the Lélu dock, pinned applications,
 * running applications, and quick launch.
 * ==========================================================
 */

export interface DockItem {

  id: string;

  title: string;

  icon: string;

  pinned: boolean;

  running: boolean;

  visible: boolean;

}

export default class DockManager {

  private initialized =
    false;

  private readonly items =
    new Map<
      string,
      DockItem
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

    this.items.clear();

    this.initialized = false;

  }

  register(
    item: DockItem,
  ): void {

    this.items.set(
      item.id,
      item,
    );

  }

  unregister(
    id: string,
  ): void {

    this.items.delete(
      id,
    );

  }

  get(
    id: string,
  ):
    | DockItem
    | undefined {

    return this.items.get(
      id,
    );

  }

  getAll():
    DockItem[] {

    return Array.from(
      this.items.values(),
    );

  }

  getPinned():
    DockItem[] {

    return this.getAll()

      .filter(
        item => item.pinned,
      );

  }

  getRunning():
    DockItem[] {

    return this.getAll()

      .filter(
        item => item.running,
      );

  }

  pin(
    id: string,
  ): void {

    const item =
      this.items.get(id);

    if (!item)
      return;

    item.pinned = true;

  }

  unpin(
    id: string,
  ): void {

    const item =
      this.items.get(id);

    if (!item)
      return;

    item.pinned = false;

  }

  launch(
    id: string,
  ): void {

    const item =
      this.items.get(id);

    if (!item)
      return;

    item.running = true;

    item.visible = true;

  }

  close(
    id: string,
  ): void {

    const item =
      this.items.get(id);

    if (!item)
      return;

    item.running = false;

  }

  show(
    id: string,
  ): void {

    const item =
      this.items.get(id);

    if (!item)
      return;

    item.visible = true;

  }

  hide(
    id: string,
  ): void {

    const item =
      this.items.get(id);

    if (!item)
      return;

    item.visible = false;

  }

  clear(): void {

    this.items.clear();

  }

}