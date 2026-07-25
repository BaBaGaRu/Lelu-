/**
 * ==========================================================
 * LÉLUVERSE
 * CHAT WINDOW
 * ==========================================================
 */

import LeluAssistant from "../../abilities/assistant/LeluAssistant";
import ChatWindowContent from "../components/ChatWindowContext";

interface ChatWindowProps {
  assistant: LeluAssistant;
}

export default function ChatWindow({
  assistant,
}: ChatWindowProps) {
  return (
    <ChatWindowContent
      assistant={assistant}
    />
  );
}