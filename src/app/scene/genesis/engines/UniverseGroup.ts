/**
 * ==========================================================
 * LÉLUVERSE
 * UNIVERSE GROUP
 * ==========================================================
 */

import EngineGroup from "./EngineGroup";

import UniverseEngine from "./UniverseEngine";
import TimelineEngine from "./TimelineEngine";
import SimulationEngine from "./SimulationEngine";

export default function UniverseGroup() {

  return new EngineGroup(

    "Universe",

    [

      new UniverseEngine(),

      new TimelineEngine(),

      new SimulationEngine(),

    ],

  );

}