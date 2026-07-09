/**
 * ==========================================================
 * LÉLUVERSE
 * AURORA LAYER
 *
 * Drifting cosmic ribbons behind the core.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";
import { Group, AdditiveBlending } from "three";
import { useRef } from "react";

export default function AuroraLayer() {

  const group =
    useRef<Group>(null);

  useFrame((_, delta) => {

    if (!group.current) return;

    group.current.rotation.z +=
      delta * 0.003;

    group.current.rotation.y +=
      delta * 0.001;

    group.current.position.x =
      Math.sin(
        performance.now() * 0.00005,
      ) * 0.4;

    group.current.position.y =
      Math.cos(
        performance.now() * 0.00004,
      ) * 0.3;

  });

  return (

    <group
      ref={group}
      position={[0,0,-12]}
    >

      <mesh
        position={[-5,3,0]}
        rotation={[0,0,0.25]}
      >

        <planeGeometry
          args={[22,8]}
        />

        <meshBasicMaterial
          color="#7d5cff"
          transparent
          opacity={0.10}
          blending={AdditiveBlending}
          depthWrite={false}
        />

      </mesh>

      <mesh
        position={[5,-2,-1]}
        rotation={[0,0,-0.35]}
      >

        <planeGeometry
          args={[24,9]}
        />

        <meshBasicMaterial
          color="#4bb8ff"
          transparent
          opacity={0.08}
          blending={AdditiveBlending}
          depthWrite={false}
        />

      </mesh>

      <mesh
        position={[0,5,-2]}
        rotation={[0,0,0.55]}
      >

        <planeGeometry
          args={[20,7]}
        />

        <meshBasicMaterial
          color="#ff74d8"
          transparent
          opacity={0.05}
          blending={AdditiveBlending}
          depthWrite={false}
        />

      </mesh>

    </group>

  );

}