"use client";
import { STAGE_COLORS } from "@/lib/constants";

export default function Badge({ stage }) {
  const c = STAGE_COLORS[stage] || "#64748b";
  return (
    <span style={{
      background: c + "22",
      color: c,
      border: `1px solid ${c}55`,
      borderRadius: 999,
      fontSize: 10,
      fontWeight: 700,
      padding: "3px 12px",
      fontFamily: "var(--font-mono)",
      whiteSpace: "nowrap",
      letterSpacing: 0.3,
    }}>
      {stage}
    </span>
  );
}
