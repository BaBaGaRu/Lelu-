/**
 * ==========================================================
 * LÉLU
 * VOICE DISPATCHER
 * ==========================================================
 */

import AIRouter from "../core/AIRouter";

export default class VoiceDispatcher {

  readonly router: AIRouter;

  constructor(
    router: AIRouter,
  ) {

    this.router = router;

  }

  dispatch(
    transcript: string,
  ) {

    return this.router.route(
      transcript,
    );

  }

}