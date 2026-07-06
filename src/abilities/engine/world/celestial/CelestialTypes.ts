/**
 * ==========================================================
 * LÉLUVERSE
 * CELESTIAL TYPES
 * ==========================================================
 *
 * Everything visible in the sky belongs to the Celestial
 * Engine.
 */

export type CelestialCategory =
  | "Star"
  | "Constellation"
  | "Meteor"
  | "Comet"
  | "Planet"
  | "Moon"
  | "Galaxy"
  | "Nebula"
  | "Aurora"
  | "Asteroid"
  | "Satellite"
  | "BlackHole"
  | "Supernova";

export interface CelestialObject {

  id: string;

  name: string;

  category: CelestialCategory;

  brightness: number;

  size: number;

  orbitSpeed: number;

  rotationSpeed: number;

  active: boolean;

  related: string[];

}