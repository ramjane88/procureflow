"use client";
import { STAGES, STAGE_COLORS, STAGE_LABELS } from "@/lib/constants";

export default function StageRail({ stage }) {
  const curIdx = STAGES.indexOf(stage);
  return (
    <div style={{ display: "flex", gap: 4, marginTop: 14 }}>
      {STAGES.map((s, i) => {
        const done   = i <= curIdx;
        const active = i === curIdx;
        const c = done ? STAGE_COLORS[s] : "var(--border)";
        return (
          <div key={s} style={{ flex: 1 }}>
            <div style={{
              height: active ? 5 : 4,
              borderRadius: 99,
              background: c,
              transition: "all 0.3s",
              boxShadow: active ? `0 0 8px ${STAGE_COLORS[s]}88` : "none",
            }} />
            <div style={{
              fontSize: 7,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              textAlign: "center",
              marginTop: 3,
              color: done ? STAGE_COLORS[s] : "var(--border2)",
              transition: "color 0.3s",
            }}>
              {STAGE_LABELS[s]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
