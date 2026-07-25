/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS INTERFACE
 * ==========================================================
 *
 * InterfaceManager is now mounted by App.tsx
 * outside of the Canvas. This component
 * intentionally renders nothing so the
 * Genesis scene remains 3D-only.
 * ==========================================================
 */

import LeluAssistant from "../../../abilities/assistant/LeluAssistant";

interface GenesisInterfaceProps {
  assistant: LeluAssistant;
}

export default function GenesisInterface({
  assistant: _assistant,
}: GenesisInterfaceProps) {
  return null;
}