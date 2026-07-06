/**
 * ==========================================================
 * LÉLUVERSE
 * RELATIONSHIP ENGINE
 * ==========================================================
 *
 * The connective tissue of the Léluverse.
 */

import type { Relationship } from "./RelationshipTypes";

class RelationshipEngine {

  private relationships = new Map<string, Relationship>();

  public boot(): void {

    console.log("══════════════════════════════");
    console.log("RELATIONSHIP ENGINE ONLINE");
    console.log(`Relationships : ${this.relationships.size}`);
    console.log("══════════════════════════════");

  }

  public connect(relationship: Relationship): void {

    this.relationships.set(relationship.id, relationship);

  }

  public disconnect(id: string): void {

    this.relationships.delete(id);

  }

  public getAll(): Relationship[] {

    return [...this.relationships.values()];

  }

  public find(id: string): Relationship[] {

    return [...this.relationships.values()].filter(

      relation =>
        relation.from === id ||
        relation.to === id

    );

  }

}

const relationshipEngine = new RelationshipEngine();

export default relationshipEngine;