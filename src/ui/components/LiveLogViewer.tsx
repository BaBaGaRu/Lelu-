import { useEffect, useState } from "react";
import appLog, { type ApiLogEventType } from "../../core/APIEventLog";

export default function LiveLogViewer() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ApiLogEventType | "all">("all");
  const [entries, setEntries] = useState(() => appLog.filter(filter, search));

  useEffect(() => {
    const refreshEntries = () => {
      setEntries(appLog.filter(filter, search));
    };

    refreshEntries();
    const timer = window.setInterval(refreshEntries, 600);
    return () => window.clearInterval(timer);
  }, [filter, search]);

  return (
    <section style={{ display: "grid", gap: 12, color: "#f8fafc", fontSize: 13 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search logs"
          style={{ flex: 1, minWidth: 220, borderRadius: 10, border: "1px solid rgba(255,255,255,0.16)", padding: "8px 10px", background: "rgba(15,23,42,0.75)", color: "#fff" }}
        />
        <select value={filter} onChange={(event) => setFilter(event.target.value as ApiLogEventType | "all")} style={{ borderRadius: 10, border: "1px solid rgba(255,255,255,0.16)", padding: "8px 10px", background: "rgba(15,23,42,0.75)", color: "#fff" }}>
          <option value="all">All</option>
          <option value="request">Requests</option>
          <option value="response">Responses</option>
          <option value="error">Errors</option>
          <option value="warning">Warnings</option>
          <option value="provider-switch">Switches</option>
          <option value="memory">Memory</option>
          <option value="voice">Voice</option>
          <option value="knowledge">Knowledge</option>
        </select>
        <button type="button" onClick={() => { const blob = new Blob([appLog.exportJson()], { type: "application/json" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "lelu-logs.json"; link.click(); URL.revokeObjectURL(url); }} style={{ borderRadius: 10, border: "1px solid rgba(255,255,255,0.16)", padding: "8px 10px", background: "rgba(15,23,42,0.75)", color: "#fff" }}>Export</button>
      </div>
      <div style={{ maxHeight: 260, overflow: "auto", display: "grid", gap: 8 }}>
        {entries.map((entry) => (
          <div key={entry.id} style={{ borderRadius: 10, padding: 10, background: "rgba(15,23,42,0.72)" }}>
            <div style={{ color: "#93c5fd", marginBottom: 4 }}>{entry.type} • {entry.provider}</div>
            <div>{entry.message}</div>
            {entry.data ? <div style={{ color: "#cbd5e1", marginTop: 4, fontSize: 12 }}>{JSON.stringify(entry.data)}</div> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
