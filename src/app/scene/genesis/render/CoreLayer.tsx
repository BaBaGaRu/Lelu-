/**
 * ==========================================================
 * LÉLUVERSE
 * CORE LAYER
 *
 * Living Core V1
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { useGenesis } from "../systems/GenesisCore";

import {
  Group,
  Mesh,
} from "three";

import {
  useRef,
} from "react";

export default function CoreLayer() {

  const genesis = useGenesis();

  const root = useRef<Group>(null);
  const shell = useRef<Mesh>(null);
  const plasma = useRef<Mesh>(null);
  const core = useRef<Mesh>(null);

  useFrame((_, delta) => {

    if (
      !root.current ||
      !shell.current ||
      !plasma.current ||
      !core.current
    ) return;

    const g = genesis.current;
    const t = g.age;

    root.current.rotation.y += delta * 0.05;
    root.current.rotation.x += delta * 0.01;

    shell.current.rotation.x += delta * 0.12;
    shell.current.rotation.y += delta * 0.20;

    plasma.current.rotation.y -= delta * 0.30;
    plasma.current.rotation.z += delta * 0.15;

    const breathe =
      1 + Math.sin(t * 2.5) * 0.05;

    core.current.scale.setScalar(breathe);

    shell.current.scale.setScalar(
      1.6 + Math.sin(t) * 0.05
    );

    plasma.current.scale.setScalar(
      1.25 + Math.cos(t * 1.4) * 0.04
    );

  });

  return (
    <group ref={root}>

      <mesh ref={shell}>
        <icosahedronGeometry args={[1.7, 8]} />
        <meshBasicMaterial
          color="#55AAFF"
          transparent
          opacity={0.10}
          wireframe
        />
      </mesh>

      <mesh ref={plasma}>
        <icosahedronGeometry args={[1.2, 12]} />
        <meshStandardMaterial
          color="#66BBFF"
          emissive="#3388FF"
          emissiveIntensity={5}
          transparent
          opacity={0.45}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={core}>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#66CCFF"
          emissiveIntensity={12}
          roughness={0}
        />
      </mesh>

    </group>
  );
}