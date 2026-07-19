/**
 * ==========================================================
 * LÉLU
 * PATTERN MEMORY
 * ==========================================================
 */

import type ResponsePattern
  from "./ResponsePattern";

import IndexedDBStore
  from "../core/memory/IndexedDBStore";

import type {
  MemoryRecord,
} from "../core/memory/MemoryStore";


export default class PatternMemory {


  private readonly patterns =
    new Map<string, ResponsePattern>();


  private readonly store =
    new IndexedDBStore();


  private initialized =
    false;



  /**
   * Load persistent memories.
   */
  public async initialize():
    Promise<void> {


    if (
      this.initialized
    ) {

      return;

    }


    const memories =
      await this.store.all(
        "user",
      );


    for (
      const memory of memories
    ) {


      const pattern:
        ResponsePattern = {


        id:
          memory.id,


        prompt:
          typeof memory.metadata?.prompt === "string"

            ? memory.metadata.prompt

            : memory.title,


        response:
          memory.content,


        intent:
          typeof memory.metadata?.intent === "string"

            ? memory.metadata.intent

            : "memory",


        keywords:
          memory.tags,


        context:
          typeof memory.metadata?.context === "object"

            ? memory.metadata.context as Record<string, unknown>

            : {},


        confidence:
          memory.importance,


        successfulUses:
          1,


        failedUses:
          0,


        createdAt:
          memory.created,


        updatedAt:
          memory.updated,


      };


      this.patterns.set(

        pattern.id,

        pattern,

      );

    }


    this.initialized =
      true;

  }





  /**
   * Add memory and persist.
   */
  public async add(
    pattern:
      ResponsePattern,
  ):
    Promise<void> {


    await this.initialize();


    this.patterns.set(

      pattern.id,

      pattern,

    );



    const memory:
      MemoryRecord = {


      id:
        pattern.id,


      space:
        "user",


      title:
        pattern.prompt,


      content:
        pattern.response,


      tags:
        pattern.keywords,


      importance:
        pattern.confidence,


      created:
        pattern.createdAt,


      updated:
        pattern.updatedAt,


      metadata:
      {

        prompt:
          pattern.prompt,


        intent:
          pattern.intent,


        context:
          pattern.context,

      },

    };



    await this.store.save(
      memory,
    );

  }





  public get(
    id:
      string,
  ):
    ResponsePattern | undefined {


    return this.patterns.get(
      id,
    );

  }





  public async remove(
    id:
      string,
  ):
    Promise<boolean> {


    const removed =
      this.patterns.delete(
        id,
      );


    await this.store.delete(
      id,
    );


    return removed;

  }





  public async clear():
    Promise<void> {


    this.patterns.clear();


    await this.store.clear();

  }





  public getAll():
    ResponsePattern[] {


    return [

      ...this.patterns.values(),

    ];

  }





  /**
   * Search memory.
   * Loads persistent memory first.
   */
  public async search(
    prompt:
      string,
  ):
    Promise<ResponsePattern[]> {


    await this.initialize();



    const query =
      prompt.toLowerCase();



    return this.getAll()

      .filter(

        pattern =>

          pattern.prompt
            .toLowerCase()
            .includes(query)


          ||


          pattern.response
            .toLowerCase()
            .includes(query)


          ||


          pattern.keywords.some(

            keyword =>

              query.includes(

                keyword.toLowerCase(),

              ),

          ),

      );

  }


}