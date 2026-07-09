/**
 * ==========================================================
 * LÉLUVERSE
 * PARTICLE SPAWNER
 * ==========================================================
 */

import type {

  PortalParticle,

} from "./PortalTypes";

export const PARTICLE_COUNT = 600;

export function createParticles(): PortalParticle[] {

  return Array.from({

    length: PARTICLE_COUNT,

  }).map((_, id) => ({

    id,

    portalId:

      Math.floor(

        Math.random() * 4,

      ),

    position:[0,0,0],

    velocity:[0,0,0],

    angle:

      Math.random() *

      Math.PI * 2,

    orbit:

      .5 +

      Math.random() * 2,

    speed:

      .4 +

      Math.random() * 2,

    size:

      .01 +

      Math.random() * .04,

    pulse:

      Math.random() *

      Math.PI * 2,

    age:0,

    life:

      5 +

      Math.random() * 8,

    evolution:"birth",

    alive:true,

  }));

}

export function respawnParticle(

  particle: PortalParticle,

  portalCount: number,

){

  particle.portalId =

    Math.floor(

      Math.random() *

      portalCount,

    );

  particle.angle =

    Math.random() *

    Math.PI * 2;

  particle.orbit =

    .5 +

    Math.random() * 2;

  particle.speed =

    .4 +

    Math.random() * 2;

  particle.pulse =

    Math.random() *

    Math.PI * 2;

  particle.age = 0;

  particle.life =

    5 +

    Math.random() * 8;

  particle.evolution =

    "birth";

}