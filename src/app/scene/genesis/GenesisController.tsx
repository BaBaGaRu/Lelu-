/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CONTROLLER
 *
 * Master Genesis composition layer.
 *
 * Connects:
 * - time
 * - AI bridge
 * - renderer
 * - interface
 * - playground
 * - navigator
 * - workspace
 * ==========================================================
 */


import GenesisCore
  from "./GenesisCore";


import GenesisTime
  from "./GenesisTime";


import GenesisBridge
  from "./GenesisBridge";


import GenesisRenderer
  from "./render/GenesisRenderer";





export default function GenesisController() {


  return (

    <GenesisCore>


      {/* ==========================================
          TIME ENGINE
      ========================================== */}

      <GenesisTime />





      {/* ==========================================
          AI → GENESIS
      ========================================== */}

      <GenesisBridge />





      {/* ==========================================
          LIVING WORLD
      ========================================== */}

      <GenesisRenderer />





      {/* ==========================================
          WORKSPACES
      ========================================== */}






      {/* ==========================================
          ACTION CONTROL
      ========================================== */}






      {/* ==========================================
          HUD
      ========================================== */}



    </GenesisCore>

  );

}