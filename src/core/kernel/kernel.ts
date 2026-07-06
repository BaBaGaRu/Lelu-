/**
 * ==========================================================
 * LÉLU KERNEL
 * ==========================================================
 *
 * Core operating system for Lélu.
 */

import Constitution from "../../constitution/Constitution";
import Ordinances from "../../constitution/Ordinances";
import Government from "../../constitution/Roles";

export interface ModuleDefinition {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
}

class LeluKernel {
  private readonly constitution = Constitution;
  private readonly ordinances = Ordinances;
  private readonly government = Government;

  private readonly modules = new Map<string, ModuleDefinition>();

  private booted = false;

  public boot(): void {
    if (this.booted) return;

    console.clear();

    console.log("=================================");
    console.log("LÉLU ENGINEER V1");
    console.log("=================================");
    console.log(`Version: ${this.constitution.identity.version}`);
    console.log(`Codename: ${this.constitution.identity.codename}`);
    console.log(`Government Roles: ${this.government.length}`);
    console.log("Kernel Status: ONLINE");
    console.log("=================================");

    this.booted = true;
  }

  public registerModule(module: ModuleDefinition): void {
    this.modules.set(module.id, module);
  }

  public unregisterModule(id: string): void {
    this.modules.delete(id);
  }

  public getModule(id: string): ModuleDefinition | undefined {
    return this.modules.get(id);
  }

  public getModules(): ModuleDefinition[] {
    return Array.from(this.modules.values());
  }

  public getConstitution() {
    return this.constitution;
  }

  public getOrdinances() {
    return this.ordinances;
  }

  public getGovernment() {
    return this.government;
  }

  public isBooted(): boolean {
    return this.booted;
  }
}

const Kernel = new LeluKernel();

export default Kernel;