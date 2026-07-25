/**
 * ==========================================================
 * LÉLUVERSE
 * INTERFACE MANAGER
 * ==========================================================
 */

import LeluAssistant from "../../abilities/assistant/LeluAssistant";
import ChatWindow from "./ChatWindow";
import Window from "./Window";

interface InterfaceManagerProps {
  assistant: LeluAssistant;
  isOpen: boolean;
  onClose: () => void;
  panel: "chat" | "logs";
}

export default function InterfaceManager({
  assistant,
  isOpen,
  onClose,
  panel,
}: InterfaceManagerProps) {
  return (
    <Window
      isOpen={isOpen && panel === "chat"}
      onClose={onClose}
      title="Chat"
    >
      <ChatWindow assistant={assistant} />
    </Window>
  );
}