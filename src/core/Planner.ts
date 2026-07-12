/**
 * ==========================================================
 * LÉLU
 * PLANNER
 * ==========================================================
 */

import type Provider
  from "../providers/Provider";

export default class Planner {

  plan(

    query: string,

    providers:
      Provider[],

  ): Provider[] {

    const text =
      query.toLowerCase();

    const matches =
      providers.filter(

        provider =>

          provider.enabled &&

          provider.canSearch(
            text,
          ),

      );

    if (
      matches.length === 0
    ) {

      return providers

        .filter(
          provider =>
            provider.enabled,
        )

        .sort(
          (a, b) =>
            b.priority -
            a.priority,
        )

        .slice(0, 3);

    }

    return matches.sort(

      (a, b) =>

        b.priority -
        a.priority,

    );

  }

}