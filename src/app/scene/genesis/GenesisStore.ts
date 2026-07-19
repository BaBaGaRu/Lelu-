/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS STORE
 *
 * Shared Genesis UI state helpers
 * ==========================================================
 */

import type {
  GenesisState,
} from "./GenesisCore";



export function getActiveMessages(

  state:
    GenesisState,

) {


  return state.messages.slice(

    -50,

  );

}





export function getRecentNotifications(

  state:
    GenesisState,

) {


  return state.notifications.slice(

    -20,

  );

}





export function hasActiveCognition(

  state:
    GenesisState,

) {


  return Boolean(

    state.cognition,

  );

}