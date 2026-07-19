/**
 * ==========================================================
 * LÉLUVERSE
 * FOCUS MANAGER
 *
 * Manages interface focus across windows,
 * overlays, workspaces, and interactive elements.
 * ==========================================================
 */

export default class FocusManager {

  private initialized =
    false;

  private focusedWindow:
    string | null =
    null;

  private focusedOverlay:
    string | null =
    null;

  private focusedWorkspace:
    string | null =
    null;

  private focusedElement:
    string | null =
    null;

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

    this.clear();

    this.initialized = false;

  }

  focusWindow(
    id: string,
  ): void {

    this.focusedWindow =
      id;

  }

  focusOverlay(
    id: string,
  ): void {

    this.focusedOverlay =
      id;

  }

  focusWorkspace(
    id: string,
  ): void {

    this.focusedWorkspace =
      id;

  }

  focusElement(
    id: string,
  ): void {

    this.focusedElement =
      id;

  }

  getFocusedWindow():
    string | null {

    return this.focusedWindow;

  }

  getFocusedOverlay():
    string | null {

    return this.focusedOverlay;

  }

  getFocusedWorkspace():
    string | null {

    return this.focusedWorkspace;

  }

  getFocusedElement():
    string | null {

    return this.focusedElement;

  }

  hasFocus(): boolean {

    return (

      this.focusedWindow !== null ||

      this.focusedOverlay !== null ||

      this.focusedWorkspace !== null ||

      this.focusedElement !== null

    );

  }

  clear(): void {

    this.focusedWindow =
      null;

    this.focusedOverlay =
      null;

    this.focusedWorkspace =
      null;

    this.focusedElement =
      null;

  }

}