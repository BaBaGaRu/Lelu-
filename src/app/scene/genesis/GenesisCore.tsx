/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CORE
 *
 * Living consciousness shared across
 * the entire Genesis simulation.
 * ==========================================================
 */

import { useFrame } from "@react-three/fiber";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";

import {
  type GenesisState,
  defaultGenesisState,
} from "./state";

import {
  GenesisRenderer,
} from "./render";

export type GenesisContextType =
  MutableRefObject<GenesisState>;

const GenesisContext =
  createContext<GenesisContextType | null>(
    null,
  );

export function useGenesis(): GenesisContextType {

  const context =
    useContext(GenesisContext);

  if (!context) {

    throw new Error(
      "useGenesis() must be used inside <GenesisCore />.",
    );

  }

  return context;

}

interface GenesisCoreProps {

  children?: ReactNode;

}

export default function GenesisCore({

  children,

}: GenesisCoreProps) {

  const state =
    useRef<GenesisState>({

      ...defaultGenesisState,

      dimension: 3,

      curiosity: 1,

      energy: 1,

    });

  useFrame((_, delta) => {

    const s =
      state.current;

    if (s.paused) return;

    const dt =
      delta * s.speed;

    /**
     * ----------------------------------------------------------
     * TIME
     * ----------------------------------------------------------
     */

    s.age += dt;

    s.evolution +=
      dt * 0.05;

    /**
     * ----------------------------------------------------------
     * CONSCIOUSNESS
     * ----------------------------------------------------------
     */

    s.chaos = Math.max(

      0.05,

      s.chaos -

      dt * 0.001,

    );

    s.stability = Math.min(

      1,

      s.stability +

      dt * 0.0008,

    );

    s.intelligence = Math.min(

      1,

      s.intelligence +

      dt * 0.0005,

    );

    s.awareness = Math.min(

      1,

      s.awareness +

      dt * 0.00035,

    );

    s.learning = Math.min(

      1,

      s.learning +

      dt * 0.00025,

    );

    s.consciousness = Math.min(

      1,

      s.awareness * 0.6 +

      s.intelligence * 0.4,

    );

    /**
     * ----------------------------------------------------------
     * ENERGY
     * ----------------------------------------------------------
     */

    s.energy =

      0.5 +

      Math.sin(

        s.age * 2.5,

      ) *

      0.5;

  });

  const value =
    useMemo(

      () => state,

      [],

    );

  return (

    <GenesisContext.Provider
      value={value}
    >

      <GenesisRenderer />

      {children}

    </GenesisContext.Provider>

  );

}