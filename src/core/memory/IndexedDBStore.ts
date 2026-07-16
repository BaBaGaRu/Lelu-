/**
 * ==========================================================
 * LÉLU
 * INDEXEDDB STORE
 * ==========================================================
 */

import type MemoryStore from "./MemoryStore";
import type {
  MemoryRecord,
  MemorySpace,
} from "./MemoryStore";

export default class IndexedDBStore
  implements MemoryStore {

  private db?: IDBDatabase;

  async initialize(): Promise<void> {

    if (this.db) return;

    await new Promise<void>((resolve, reject) => {

      const request =
        indexedDB.open(
          "lelu-memory",
          1,
        );

      request.onupgradeneeded = () => {

        const db =
          request.result;

        if (
          !db.objectStoreNames.contains(
            "memories",
          )
        ) {

          db.createObjectStore(
            "memories",
            {
              keyPath: "id",
            },
          );

        }

      };

      request.onsuccess = () => {

        this.db =
          request.result;

        resolve();

      };

      request.onerror = () =>
        reject(request.error);

    });

  }

  async save(
    memory: MemoryRecord,
  ): Promise<void> {

    await this.initialize();

    return new Promise(
      (resolve, reject) => {

        const tx =
          this.db!.transaction(
            "memories",
            "readwrite",
          );

        tx.objectStore(
          "memories",
        ).put(memory);

        tx.oncomplete = () =>
          resolve();

        tx.onerror = () =>
          reject(tx.error);

      },
    );

  }

  async update(
    memory: MemoryRecord,
  ): Promise<void> {

    return this.save(memory);

  }

  async delete(
    id: string,
  ): Promise<void> {

    await this.initialize();

    return new Promise(
      (resolve, reject) => {

        const tx =
          this.db!.transaction(
            "memories",
            "readwrite",
          );

        tx.objectStore(
          "memories",
        ).delete(id);

        tx.oncomplete = () =>
          resolve();

        tx.onerror = () =>
          reject(tx.error);

      },
    );

  }

  async clear(): Promise<void> {

    await this.initialize();

    return new Promise(
      (resolve, reject) => {

        const tx =
          this.db!.transaction(
            "memories",
            "readwrite",
          );

        tx.objectStore(
          "memories",
        ).clear();

        tx.oncomplete = () =>
          resolve();

        tx.onerror = () =>
          reject(tx.error);

      },
    );

  }

  async get(
    id: string,
  ): Promise<MemoryRecord | null> {

    await this.initialize();

    return new Promise(
      (resolve, reject) => {

        const request =
          this.db!
            .transaction(
              "memories",
            )
            .objectStore(
              "memories",
            )
            .get(id);

        request.onsuccess = () =>
          resolve(
            request.result ??
            null,
          );

        request.onerror = () =>
          reject(
            request.error,
          );

      },
    );

  }

  async all(
    space?: MemorySpace,
  ): Promise<MemoryRecord[]> {

    await this.initialize();

    return new Promise(
      (resolve, reject) => {

        const request =
          this.db!
            .transaction(
              "memories",
            )
            .objectStore(
              "memories",
            )
            .getAll();

        request.onsuccess = () => {

          const memories =
            request.result as MemoryRecord[];

          resolve(

            space

              ? memories.filter(
                  memory =>
                    memory.space ===
                    space,
                )

              : memories,

          );

        };

        request.onerror = () =>
          reject(
            request.error,
          );

      },
    );

  }

  async search(
    query: string,
    space?: MemorySpace,
  ): Promise<MemoryRecord[]> {

    const text =
      query.toLowerCase();

    const memories =
      await this.all(space);

    return memories

      .map(memory => {

        let score = 0;

        if (
          memory.title
            .toLowerCase()
            .includes(text)
        ) {

          score += 10;

        }

        if (
          memory.content
            .toLowerCase()
            .includes(text)
        ) {

          score += 8;

        }

        for (const tag of memory.tags) {

          if (
            tag
              .toLowerCase()
              .includes(text)
          ) {

            score += 5;

          }

        }

        score +=
          memory.importance;

        return {

          score,

          memory,

        };

      })

      .filter(
        item =>
          item.score > 0,
      )

      .sort(
        (a, b) =>
          b.score -
          a.score,
      )

      .slice(0, 10)

      .map(
        item =>
          item.memory,
      );

  }

  async recent(
    limit = 20,
    space?: MemorySpace,
  ): Promise<MemoryRecord[]> {

    const memories =
      await this.all(space);

    return memories

      .sort(
        (a, b) =>
          b.updated -
          a.updated,
      )

      .slice(
        0,
        limit,
      );

  }

}