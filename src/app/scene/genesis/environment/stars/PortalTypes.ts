/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL TYPES
 * ==========================================================
 */

export type PortalState =

  | "forming"
  | "opening"
  | "stable"
  | "event"
  | "collapse"
  | "rebirth";

export type PortalEvent =

  | "none"
  | "portal"
  | "warp"
  | "bloom"
  | "code"
  | "dance"
  | "pods"
  | "parade"
  | "rollercoaster"
  | "memory"
  | "galaxy"
  | "crystal";

export interface LivingPortal {

  id:number;

  position:[

    number,

    number,

    number,

  ];

  baseRadius:number;

  radius:number;

  energy:number;

  age:number;

  phase:number;

  frequency:number;

  growth:number;

  rotation:number;

  spin:number;

  timer:number;

  state:PortalState;

  event:PortalEvent;

}

export interface PortalParticle{

  id:number;

  portalId:number;

  position:[

    number,

    number,

    number,

  ];

  velocity:[

    number,

    number,

    number,

  ];

  angle:number;

  orbit:number;

  speed:number;

  size:number;

  pulse:number;

  age:number;

  life:number;

  evolution:

    | "birth"
    | "warp"
    | "morph"
    | "portal"
    | "galaxy"
    | "bloom"
    | "crystal"
    | "death"
    | "rebirth";

  alive:boolean;

}