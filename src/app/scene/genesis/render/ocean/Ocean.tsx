/**
 * ==========================================================
 * LÉLUVERSE
 * OCEAN
 *
 * Master renderer for every visible ocean system.
 *
 * This file ONLY assembles the ocean.
 * Individual behaviors live inside their own files.
 * ==========================================================
 */

import { Group } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import DeepOcean from "./DeepOcean";
import SurfaceOcean from "./SurfaceOcean";
import TideLayer from "./TideLayer";
import RippleLayer from "./RippleLayer";
import CurrentStreams from "./CurrentStreams";
import WhirlpoolLayer from "./WhirlpoolLayer";

export interface OceanState {
  tide?: number;
  tsunami?: number;
  current?: number;
  waveHeight?: number;
  whirlpool?: number;
  foam?: number;
  caustics?: number;
}

interface OceanProps {
  oceanState?: OceanState;
}

export default function Ocean({
  oceanState = {},
}: OceanProps) {

  const root = useRef<Group>(null);

  useFrame((_, delta) => {

    if (!root.current) return;

    const tide =
      oceanState.tide ?? 0.5;

    root.current.rotation.y +=
      delta *
      0.02 *
      tide;

    root.current.scale.setScalar(

      1 +

      Math.sin(

        performance.now() *

        0.00025,

      ) *

      0.004 *

      tide,

    );

  });

  return (

    <group ref={root}>

      {/* Deep Ocean */}
      <DeepOcean
        oceanState={oceanState}
      />

      {/* Surface */}
      <SurfaceOcean
        oceanState={oceanState}
      />

      {/* Planetary Tides */}
      <TideLayer
        oceanState={oceanState}
      />

      {/* Ripples */}
      <RippleLayer
        oceanState={oceanState}
      />

      {/* Ocean Currents */}
      <CurrentStreams
        oceanState={oceanState}
      />

      {/* Whirlpools */}
      <WhirlpoolLayer
        oceanState={oceanState}
      />

    </group>

  );

}