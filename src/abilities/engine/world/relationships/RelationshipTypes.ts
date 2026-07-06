/**
 * ==========================================================
 * LÉLUVERSE
 * RELATIONSHIP TYPES
 * ==========================================================
 *
 * Everything in the Léluverse can be connected.
 */

export type RelationshipType =
  | "Inspired"
  | "Created"
  | "Learns"
  | "Remembers"
  | "References"
  | "Contains"
  | "LivesIn"
  | "Related"
  | "PartOf"
  | "EvolvedFrom"
  | "ConnectedTo"
  | "Supports"
  | "Collaborates"
  | "Observes"
  | "Expresses"
  | "Represents"
  | "Protects"
  | "Discovered";

export interface Relationship {

  id: string;

  from: string;

  to: string;

  type: RelationshipType;

  strength: number;

  created: Date;

  updated: Date;

  active: boolean;

}