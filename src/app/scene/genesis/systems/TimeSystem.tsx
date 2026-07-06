/**
 * ==========================================================
 * LÉLUVERSE
 * TIME SYSTEM
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useRef } from "react";

import { useGenesis } from "../GenesisCore";

export default function TimeSystem() {

  const group = useRef<Group>(null);

  const genesis = useGenesis();

  useFrame((_, delta) => {

    if (!group.current) return;

    group.current.rotation.z +=

      delta *

      genesis.current.speed *

      0.1;

  });

  return <group ref={group} />;

}