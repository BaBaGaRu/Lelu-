/**
 * ==========================================================
 * LÉLUVERSE
 * KNOWLEDGE ENGINE
 * ==========================================================
 *
 * The living knowledge graph of Lélu.
 */

import type { KnowledgeNode } from "./KnowledgeTypes";

class KnowledgeEngine {

  private nodes = new Map<string, KnowledgeNode>();

  public boot(): void {

    console.log("══════════════════════════════");
    console.log("KNOWLEDGE ENGINE ONLINE");
    console.log(`Nodes : ${this.nodes.size}`);
    console.log("══════════════════════════════");

  }

  public add(node: KnowledgeNode): void {

    this.nodes.set(node.id, node);

  }

  public update(node: KnowledgeNode): void {

    this.nodes.set(node.id, node);

  }

  public get(id: string): KnowledgeNode | undefined {

    return this.nodes.get(id);

  }

  public getAll(): KnowledgeNode[] {

    return [...this.nodes.values()];

  }

  public remove(id: string): void {

    this.nodes.delete(id);

  }

}

const knowledgeEngine = new KnowledgeEngine();

export default knowledgeEngine;