/**
 * ==========================================================
 * LÉLUVERSE
 * WINDOW
 * Transparent Overlay
 * ==========================================================
 */

import type { ReactNode } from "react";

interface WindowProps {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
}

export default function Window({
  children,
  isOpen = true,
  onClose,
  title,
}: WindowProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {title ? (
        <div style={{ position: "absolute", top: 20, left: 20, color: "#f8fafc", fontSize: 14, fontWeight: 700, pointerEvents: "none" }}>{title}</div>
      ) : null}
      <button
        type="button"
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 44,
          height: 44,
          border: "none",
          borderRadius: "50%",
          background: "rgba(0,0,0,.55)",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          pointerEvents: "auto",
          backdropFilter: "blur(12px)",
        }}
      >
        ✕
      </button>

      <div
        style={{
          flex: 1,
          display: "flex",
          minHeight: 0,
          pointerEvents: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}