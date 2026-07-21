/**
 * ==========================================================
 * LÉLUVERSE
 * CHAT APP
 *
 * Desktop chat application.
 * ==========================================================
 */

import DesktopWindow
  from "../DesktopWindow";

export default class ChatApp
  extends DesktopWindow {

  constructor() {

    super({

      id:
        "chat",

      title:
        "Chat",

      visible:
        true,

      focused:
        true,

      minimized:
        false,

      maximized:
        false,

      x:
        160,

      y:
        80,

      width:
        900,

      height:
        650,

    });

  }

  override initialize(): void {

  }

  override update(
    _delta: number,
  ): void {

  }

  override shutdown(): void {

  }

}