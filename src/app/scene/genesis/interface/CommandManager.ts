/**
 * ==========================================================
 * LÉLUVERSE
 * COMMAND MANAGER
 *
 * Central command registry and dispatcher.
 * Powers the command palette, shortcuts,
 * AI actions, and automation.
 * ==========================================================
 */

export interface InterfaceCommand {

  id: string;

  title: string;

  description: string;

  category: string;

  enabled: boolean;

  execute(): void;

}

export default class CommandManager {

  private initialized =
    false;

  private readonly commands =
    new Map<
      string,
      InterfaceCommand
    >();

  initialize(): void {

    if (this.initialized)
      return;

    this.initialized =
      true;

  }

  update(
    _delta: number,
  ): void {

    if (!this.initialized)
      return;

  }

  shutdown(): void {

    this.commands.clear();

    this.initialized =
      false;

  }

  register(
    command: InterfaceCommand,
  ): void {

    this.commands.set(
      command.id,
      command,
    );

  }

  unregister(
    id: string,
  ): void {

    this.commands.delete(
      id,
    );

  }

  execute(
    id: string,
  ): boolean {

    const command =
      this.commands.get(id);

    if (
      !command ||
      !command.enabled
    ) {

      return false;

    }

    command.execute();

    return true;

  }

  get(
    id: string,
  ):
    | InterfaceCommand
    | undefined {

    return this.commands.get(
      id,
    );

  }

  getAll():
    InterfaceCommand[] {

    return Array.from(

      this.commands.values(),

    );

  }

  getCategory(
    category: string,
  ):
    InterfaceCommand[] {

    return this.getAll()

      .filter(

        command =>

          command.category ===
          category,

      );

  }

  search(
    query: string,
  ):
    InterfaceCommand[] {

    const search =

      query
        .trim()
        .toLowerCase();

    if (

      search.length === 0

    ) {

      return this.getAll();

    }

    return this.getAll()

      .filter(

        command =>

          command.title
            .toLowerCase()
            .includes(search) ||

          command.description
            .toLowerCase()
            .includes(search) ||

          command.category
            .toLowerCase()
            .includes(search),

      );

  }

  clear(): void {

    this.commands.clear();

  }

}