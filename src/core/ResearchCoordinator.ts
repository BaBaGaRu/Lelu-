/**
 * ==========================================================
 * LÉLU
 * RESEARCH COORDINATOR
 * ==========================================================
 */

import Planner
  from "./Planner";

import ProviderQueue
  from "./ProviderQueue";

import registerProviders
  from "./RegisterProvider";

import type Provider
  from "../providers/Provider";

import type {
  KnowledgeResult,
} from "../providers/Provider";

export default class ResearchCoordinator {

  private readonly planner =
    new Planner();

  private readonly queue =
    new ProviderQueue();

  private readonly registry =
    registerProviders();

  async search(
    query: string,
  ): Promise<KnowledgeResult[]> {

    const providers =
      this.planner.plan(

        query,

        this.registry.all(),

      );

    const results =
      await Promise.all(

        providers.map(

          (provider: Provider) =>

            this.queue.enqueue(

              provider,

              query,

            ),

        ),

      );

    return results

      .flat()

      .sort(

        (a, b) =>

          b.confidence -
          a.confidence,

      )

      .filter(

        (result, index, array) =>

          array.findIndex(

            item =>

              (item.url ?? item.id) ===
              (result.url ?? result.id),

          ) === index,

      );

  }

}