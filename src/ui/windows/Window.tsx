/**
 * ==========================================================
 * LÉLUVERSE
 * WINDOW
 * ==========================================================
 */

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface WindowProps {
  title: string;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  children: ReactNode;
}

export default function Window({
  title,
  initialX = 250,
  initialY = 120,
  width = 520,
  height = 700,
  children,
}: WindowProps) {
  const [open, setOpen] = useState(true);

  const [position, setPosition] = useState({
    x: initialX,
    y: initialY,
  });

  const dragging = useRef(false);

  const offset = useRef({
    x: 0,
    y: 0,
  });

  function handleMouseDown(
    event: React.MouseEvent<HTMLDivElement>,
  ) {
    dragging.current = true;

    offset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };

    event.preventDefault();
  }

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!dragging.current) return;

      setPosition({
        x: event.clientX - offset.current.x,
        y: event.clientY - offset.current.y,
      });
    }

    function handleMouseUp() {
      dragging.current = false;
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove,
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp,
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp,
      );
    };
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          left: 24,
          bottom: 24,
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: 28,
          background: "#7dd3fc",
          color: "#000",
          boxShadow:
            "0 0 24px rgba(125,211,252,.7)",
          zIndex: 999999,
        }}
      >
        ✦
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width,
        height,
        display: "flex",
        flexDirection: "column",
        background: "#111",
        color: "#fff",
        border: "1px solid #444",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow:
          "0 20px 60px rgba(0,0,0,.45)",
        zIndex: 999999,
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          height: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          background: "#1b1b1b",
          borderBottom:
            "1px solid #333",
          cursor: "grab",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        <span>{title}</span>

        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          ✕
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}