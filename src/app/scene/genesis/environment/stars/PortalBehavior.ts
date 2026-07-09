/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL BEHAVIOR
 *
 * Shared movement system.
 * ==========================================================
 */

import type {

  LivingPortal,

  PortalParticle,

} from "./PortalTypes";

import {

  evolveParticle,

} from "./ParticleEvolution";

import {

  respawnParticle,

} from "./ParticleSpawner";

export function updateParticle(

  particle: PortalParticle,

  portals: LivingPortal[],

  delta: number,

  time: number,

){

  if(

    portals.length===0

  ) return;

  evolveParticle(

    particle,

  );

  if(

    particle.portalId>=

    portals.length

  ){

    particle.portalId=0;

  }

  const portal=

    portals[

      particle.portalId

    ];

  switch(

    particle.evolution

  ){

    case"birth":

      particle.angle+=

        particle.speed*

        delta;

      particle.orbit+=

        delta*.15;

      break;

    case"warp":

      particle.angle+=

        particle.speed*

        delta*6;

      particle.orbit*=

        .996;

      break;

    case"portal":

      particle.angle+=

        delta*2;

      break;

    case"galaxy":

      particle.angle+=

        delta*.6;

      particle.orbit+=

        Math.sin(

          time+

          particle.pulse,

        )*

        delta;

      break;

    case"bloom":

      particle.orbit+=

        Math.sin(

          time*4+

          particle.pulse,

        )*

        delta*3;

      break;

    case"crystal":

      particle.angle=

        Math.round(

          particle.angle/

          (Math.PI/4),

        )*

        (Math.PI/4);

      break;

    case"morph":

      particle.angle+=

        delta*3;

      particle.orbit+=

        Math.cos(

          time*2,

        )*

        delta;

      break;

    case"death":

      particle.orbit-=

        delta*4;

      if(

        particle.orbit<

        .2

      ){

        particle.evolution=

          "rebirth";

      }

      break;

    case"rebirth":

      respawnParticle(

        particle,

        portals.length,

      );

      break;

  }

  const orbit=

    portal.radius*

    particle.orbit;

  particle.position=[

    portal.position[0]+

    Math.cos(

      particle.angle+

      portal.rotation,

    )*

    orbit,

    portal.position[1]+

    Math.sin(

      particle.angle+

      portal.rotation,

    )*

    orbit,

    portal.position[2]+

    Math.sin(

      time+

      particle.pulse,

    )*2,

  ];

}