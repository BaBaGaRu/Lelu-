/**
 * ==========================================================
 * LÉLU
 * COGNITIVE CORE
 *
 * Executive cognition layer
 * ==========================================================
 */

import KnowledgeGraph
  from "./KnowledgeGraph";

import AgentManager
  from "./AgentManager";

import WorkspaceManager
  from "./WorkspaceManager";





export default class CognitiveCore {


  public readonly graph:
    KnowledgeGraph;



  public readonly agents:
    AgentManager;



  public readonly workspaces:
    WorkspaceManager;





  constructor() {


    this.graph =

      new KnowledgeGraph();



    this.agents =

      new AgentManager();



    this.workspaces =

      new WorkspaceManager();

  }





  /**
   * ==========================================================
   * Initialize cognition
   * ==========================================================
   */
  public initialize():

    void {


    this.createDefaultWorkspaces();


  }





  /**
   * ==========================================================
   * Default workspaces
   * ==========================================================
   */
  private createDefaultWorkspaces():

    void {


    this.workspaces.add(

      "core",

      "Lélu Core",

    );



    this.workspaces.add(

      "projects",

      "Projects",

    );



    this.workspaces.add(

      "knowledge",

      "Knowledge",

    );



    this.workspaces.add(

      "creative",

      "Creative",

    );



    this.workspaces.add(

      "growth",

      "Growth",

    );

  }





  /**
   * ==========================================================
   * Default agents
   *
   * AgentManager creates these already
   * ==========================================================
   */
  private createDefaultAgents():

    void {


    return;

  }





  /**
   * ==========================================================
   * Observe conversation
   * ==========================================================
   */
  public observe(

    text:
      string,

  ):
    void {


    const id =

      crypto.randomUUID();





    this.graph.addNode({

      id,

      type:

        "observation",


      label:

        text,


      data:

      {

        source:

          "conversation",

      },


      createdAt:

        Date.now(),

    });





    this.workspaces.add(

      "core",

      text,

    );

  }





  /**
   * ==========================================================
   * Create relationship
   * ==========================================================
   */
  public connect(

    from:
      string,


    to:
      string,


    relation:
      string,

  ):
    void {


    this.graph.connect(

      from,

      to,

      relation,

    );

  }





  /**
   * ==========================================================
   * Current cognitive state
   * ==========================================================
   */
  public state():

    {

      nodes: unknown[];

      connections: unknown[];

      agents: unknown[];

      workspaces: unknown[];

    } {


    return {


      nodes:

        this.graph.all(),



      connections:

        this.graph.connections(),



      agents:

        this.agents.all(),



      workspaces:

        this.workspaces.all(),

    };

  }

}