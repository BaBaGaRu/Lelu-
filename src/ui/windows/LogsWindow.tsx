import LeluAssistant from "../../abilities/assistant/LeluAssistant";
import LiveLogViewer from "../components/LiveLogViewer";
import VoiceDebugPanel from "../components/VoiceDebugPanel";
import Window from "./Window";

interface LogsWindowProps {
  assistant: LeluAssistant;
  isOpen: boolean;
  onClose: () => void;
}

export default function LogsWindow({ assistant: _assistant, isOpen, onClose }: LogsWindowProps) {
  return (
    <Window isOpen={isOpen} onClose={onClose} title="Logs">
      <div style={{ width: "100%", padding: 24, color: "#f8fafc", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.26em", color: "#93c5fd" }}>System</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Logs</div>
          </div>
        </div>
        <VoiceDebugPanel voiceService={_assistant.voice} />
        <LiveLogViewer />
      </div>
    </Window>
  );
}
