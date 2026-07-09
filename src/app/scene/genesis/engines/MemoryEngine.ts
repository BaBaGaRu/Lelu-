/**
 * ==========================================================
 * LÉLUVERSE
 * MEMORY ENGINE
 * ==========================================================
 */

import type { GenesisState } from "../state/GenesisState";

export interface GenesisMemory {

  timestamp: number;

  type: string;

  value: number;

}

export default class MemoryEngine {

  private readonly memories: GenesisMemory[] = [];

  update(
    state: GenesisState,
    _delta: number,
  ): void {

    if (state.paused) return;

    if (

      state.learning >

      this.memories.length * 0.01

    ) {

      this.memories.push({

        timestamp: state.age,

        type: "learning",

        value: state.learning,

      });

    }

  }

  getMemories(): GenesisMemory[] {

    return this.memories;

  }

  clear(): void {

    this.memories.length = 0;

  }

}