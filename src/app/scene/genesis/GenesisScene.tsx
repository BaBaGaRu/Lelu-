/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS SCENE
 *
 * The birthplace of Lélu.
 * Every reality begins here.
 * ==========================================================
 */

import GenesisController from "./GenesisController";
import LeluAssistant from "../../../abilities/assistant/LeluAssistant";

interface GenesisSceneProps {
  assistant: LeluAssistant;
}

export default function GenesisScene({
  assistant,
}: GenesisSceneProps) {
  return (
    <>
      <color
        attach="background"
        args={["#000000"]}
      />

      <GenesisController
        assistant={assistant}
      />
    </>
  );
}