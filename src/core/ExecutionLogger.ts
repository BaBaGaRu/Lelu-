/**
 * ==========================================================
 * LÉLU
 * EXECUTION LOGGER
 * ==========================================================
 */

export interface ExecutionLog {

  id: string;

  timestamp: number;

  stage: string;

  message: string;

  success: boolean;

}

export default class ExecutionLogger {

  private readonly logs:
    ExecutionLog[] = [];

  log(

    stage: string,

    message: string,

    success = true,

  ): void {

    this.logs.push({

      id:
        crypto.randomUUID(),

      timestamp:
        Date.now(),

      stage,

      message,

      success,

    });

  }

  info(

    stage: string,

    message: string,

  ): void {

    this.log(

      stage,

      message,

      true,

    );

  }

  error(

    stage: string,

    message: string,

  ): void {

    this.log(

      stage,

      message,

      false,

    );

  }

  all(): ExecutionLog[] {

    return [

      ...this.logs,

    ];

  }

  clear(): void {

    this.logs.length = 0;

  }

  latest():
    ExecutionLog | undefined {

    return this.logs.at(-1);

  }

}