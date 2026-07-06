/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS TIME
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function GenesisTime() {

  const elapsed = useRef(0);

  useFrame((_, delta) => {

    elapsed.current += delta;

  });

  return null;

}