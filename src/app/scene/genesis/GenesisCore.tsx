/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CORE
 *
 * The living consciousness of Lélu.
 * Every engine, interface, renderer,
 * and simulation reads from this Core.
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

import { GenesisRenderer } from "./render";

export interface GenesisState {

  /**
   * Time
   */

  age: number;

  evolution: number;

  speed: number;

  paused: boolean;

  /**
   * Consciousness
   */

  chaos: number;

  stability: number;

  curiosity: number;

  intelligence: number;

  awareness: number;

  /**
   * Creation
   */

  energy: number;

  matter: number;

  gravity: number;

  light: number;

  life: number;

  civilizations: number;

  /**
   * Learning
   */

  learning: number;

  simulation: number;

  teaching: number;

  /**
   * Rendering
   */

  dimension: 1 | 2 | 3 | 4 | 5;

}

const GenesisContext =
  createContext<MutableRefObject<GenesisState> | null>(null);

export function useGenesis() {

  const context = useContext(GenesisContext);

  if (!context) {

    throw new Error(
      "GenesisCore must wrap the scene.",
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

  const state = useRef<GenesisState>({

    age: 0,

    evolution: 0,

    speed: 1,

    paused: false,

    chaos: 1,

    stability: 0,

    curiosity: 1,

    intelligence: 0,

    awareness: 0,

    energy: 1,

    matter: 0,

    gravity: 0,

    light: 0,

    life: 0,

    civilizations: 0,

    learning: 0,

    simulation: 0,

    teaching: 0,

    dimension: 3,

  });

  useFrame((_, delta) => {

    const s = state.current;

    if (s.paused) return;

    const dt = delta * s.speed;

    s.age += dt;

    s.evolution += dt;

    /**
     * Consciousness
     */

    s.chaos = Math.max(

      0.05,

      s.chaos - dt * 0.001,

    );

    s.stability = Math.min(

      1,

      s.stability + dt * 0.0008,

    );

    s.intelligence = Math.min(

      1,

      s.intelligence + dt * 0.0005,

    );

    s.awareness = Math.min(

      1,

      s.awareness + dt * 0.00035,

    );

    s.learning = Math.min(

      1,

      s.learning + dt * 0.00025,

    );

    /**
     * Energy Pulse
     */

    s.energy =

      0.5 +

      Math.sin(s.age * 2.5) * 0.5;

  });

  const value = useMemo(

    () => state,

    [],

  );

  return (

    <GenesisContext.Provider value={value}>

      <GenesisRenderer />

      {children}

    </GenesisContext.Provider>

  );

}