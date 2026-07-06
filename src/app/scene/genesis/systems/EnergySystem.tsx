/**
 * ==========================================================
 * LÉLUVERSE
 * ENERGY SYSTEM
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import { useGenesis } from "../GenesisCore";

export default function EnergySystem() {

  const genesis = useGenesis();

  useFrame(() => {

    const g = genesis.current;

    g.light =

      g.energy *

      (1 + g.awareness);

    g.gravity =

      g.matter *

      0.5;

  });

  return null;

}