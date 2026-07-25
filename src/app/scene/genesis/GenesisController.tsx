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
  isChatOpen: boolean;
  onToggleChat: () => void;
  onToggleLogs: () => void;
  onToggleApiConsole: () => void;
}

export default function GenesisController({
  assistant,
  isChatOpen,
  onToggleChat,
  onToggleLogs,
  onToggleApiConsole,
}: GenesisControllerProps) {
  return (
    <>
      <GenesisTime />

      <GenesisCore />

      <GenesisInterface
        assistant={assistant}
        isChatOpen={isChatOpen}
        onToggleChat={onToggleChat}
        onToggleLogs={onToggleLogs}
        onToggleApiConsole={onToggleApiConsole}
      />

      <GenesisPlayground />
    </>
  );
}