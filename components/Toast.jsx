"use client";
import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300); }, 3000);
    return () => clearTimeout(t);
  }, [message]);

  if (!message) return null;
  const ok = type === "success";
  return (
    <div style={{
      position: "fixed", top: 20, right: 20, zIndex: 999,
      background: ok ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
      border: `1px solid ${ok ? "var(--green)" : "var(--red)"}`,
      borderRadius: 10, padding: "12px 20px",
      color: ok ? "var(--green)" : "var(--red)",
      fontSize: 13, fontFamily: "var(--font-mono)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-10px)",
      transition: "all 0.3s",
      maxWidth: 340,
    }}>
      {ok ? "✓ " : "⚠ "}{message}
    </div>
  );
}
