/**
 * ==========================================================
 * LÉLUVERSE
 * PORTAL ENGINE
 * ==========================================================
 *
 * Manages every portal throughout the Léluverse.
 */

import type { Portal } from "./PortalTypes";

class PortalEngine {

  private portals = new Map<string, Portal>();

  public boot(): void {

    console.log("══════════════════════════════");

    console.log("PORTAL ENGINE ONLINE");

    console.log(`Portals : ${this.portals.size}`);

    console.log("══════════════════════════════");

  }

  public create(portal: Portal): void {

    this.portals.set(portal.id, portal);

  }

  public get(id: string): Portal | undefined {

    return this.portals.get(id);

  }

  public getAll(): Portal[] {

    return [...this.portals.values()];

  }

  public remove(id: string): void {

    this.portals.delete(id);

  }

}

const portalEngine = new PortalEngine();

export default portalEngine;