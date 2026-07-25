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
}

export default function InterfaceManager({
  assistant,
  isOpen,
  onClose,
}: InterfaceManagerProps) {
  return (
    <Window
      isOpen={isOpen}
      onClose={onClose}
    >
      <ChatWindow
        assistant={assistant}
      />
    </Window>
  );
}