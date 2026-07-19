/**
 * ==========================================================
 * LÉLU
 * ENGINEER SERVICE
 * ==========================================================
 */

export interface EngineerReply {

  text:
    string;

  source:
    "ai" |
    "local";

}



export default class EngineerService {


  async answer(
    message:
      string,
  ):
    Promise<EngineerReply> {


    const normalized =
      message.trim();



    if (!normalized) {

      return {

        text:
          "I’m ready to help with architecture, debugging, or implementation.",

        source:
          "local",

      };

    }



    const lowered =
      normalized.toLowerCase();





    if (

      lowered.includes("debug") ||

      lowered.includes("error") ||

      lowered.includes("bug")

    ) {

      return {

        text:
          "Start by isolating the failing module, reproducing the issue, and checking the latest stack trace. Then reduce the problem to the smallest possible state.",

        source:
          "local",

      };

    }





    if (

      lowered.includes("architecture") ||

      lowered.includes("system") ||

      lowered.includes("design")

    ) {

      return {

        text:
          "A clean engineering approach is to separate concerns into services, keep interfaces small, and wire behavior through a thin controller layer.",

        source:
          "local",

      };

    }





    if (

      lowered.includes("code") ||

      lowered.includes("build") ||

      lowered.includes("compile")

    ) {

      return {

        text:
          "I’d recommend validating the change with a build pass first, then tightening the public interface before adding more behavior.",

        source:
          "local",

      };

    }





    return {

      text:
        `Engineering note: ${normalized}. I can help shape the implementation plan, debug the issue, or review the system design.`,

      source:
        "local",

    };

  }

}