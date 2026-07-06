/**
 * ==========================================================
 * LÉLUVERSE
 * EVOLUTION ENGINE
 * ==========================================================
 *
 * Controls the growth of every creation.
 */

import type { EvolutionNode } from "./EvolutionTypes";

class EvolutionEngine {

  private nodes = new Map<string, EvolutionNode>();

  public boot(): void {

    console.log("══════════════════════════════");
    console.log("EVOLUTION ENGINE ONLINE");
    console.log(`Nodes : ${this.nodes.size}`);
    console.log("══════════════════════════════");

  }

  public register(node: EvolutionNode): void {

    this.nodes.set(node.id, node);

  }

  public evolve(id: string, amount = 1): void {

    const node = this.nodes.get(id);

    if (!node) return;

    node.experience += amount;

    if (node.experience >= node.level * 100) {

      node.level++;

      node.experience = 0;

    }

  }

  public getAll(): EvolutionNode[] {

    return [...this.nodes.values()];

  }

}

const evolutionEngine = new EvolutionEngine();

export default evolutionEngine;