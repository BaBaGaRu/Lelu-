/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CONTROLLER
 * ==========================================================
 */

import GenesisCore from "./GenesisCore";
import GenesisTime from "./GenesisTime";
import GenesisInterface from "./GenesisInterface";
import GenesisPlayground from "./GenesisPlayground";

import LeluAssistant from "../../../abilities/assistant/LeluAssistant";

interface GenesisControllerProps {
  assistant: LeluAssistant;
}

export default function GenesisController({
  assistant,
}: GenesisControllerProps) {
  return (
    <>
      <GenesisTime />

      <GenesisCore />

      <GenesisInterface
        assistant={assistant}
      />

      <GenesisPlayground />
    </>
  );
}