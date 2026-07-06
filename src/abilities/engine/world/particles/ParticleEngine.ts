/**
 * ==========================================================
 * LÉLUVERSE
 * PARTICLE ENGINE
 * ==========================================================
 *
 * The visible intelligence of Lélu.
 */

import type { Particle } from "./ParticleTypes";

class ParticleEngine {

  private particles = new Map<string, Particle>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("PARTICLE ENGINE ONLINE");

    console.log(`Particles : ${this.particles.size}`);

    console.log("══════════════════════════════");

  }

  public add(particle: Particle): void {

    this.particles.set(particle.id, particle);

  }

  public remove(id: string): void {

    this.particles.delete(id);

  }

  public get(id: string): Particle | undefined {

    return this.particles.get(id);

  }

  public getAll(): Particle[] {

    return [...this.particles.values()];

  }

  public clear(): void {

    this.particles.clear();

  }

}
const particleEngine = new ParticleEngine();

export default particleEngine;