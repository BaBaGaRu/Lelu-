import { useEffect, useMemo, useState } from "react";
import type BrowserVoiceService from "../../abilities/voice/BrowserVoiceService";

interface VoiceDebugPanelProps {
  voiceService: BrowserVoiceService;
}

export default function VoiceDebugPanel({ voiceService }: VoiceDebugPanelProps) {
  const [snapshot, setSnapshot] = useState(() => voiceService.getDebugSnapshot());

  useEffect(() => {
    const unsubscribe = voiceService.subscribeDebug((next) => setSnapshot(next));
    return unsubscribe;
  }, [voiceService]);

  const items = useMemo(() => [
    { label: "Permission", value: snapshot.permissionStatus },
    { label: "Microphone", value: snapshot.microphoneStatus },
    { label: "Speech engine", value: snapshot.speechEngineStatus },
    { label: "Transcript", value: snapshot.transcript || "—" },
    { label: "AI", value: snapshot.aiStatus },
    { label: "TTS", value: snapshot.ttsStatus },
    { label: "State", value: snapshot.voiceState },
    { label: "Last error", value: snapshot.lastError || "—" },
    { label: "Recovery", value: snapshot.recoveryAttempts.toString() },
  ], [snapshot]);

  return (
    <div style={{ display: "grid", gap: 8, padding: 12, borderRadius: 12, background: "rgba(2,6,23,0.75)", border: "1px solid rgba(147,197,253,0.24)", color: "#e2e8f0" }}>
      <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.24em", color: "#93c5fd" }}>Voice Debug</div>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13 }}>
          <span style={{ color: "#94a3b8" }}>{item.label}</span>
          <span style={{ textAlign: "right", maxWidth: 220, overflowWrap: "anywhere" }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
