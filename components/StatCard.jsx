export default function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderTop: `3px solid ${color}`,
      borderRadius: 12,
      padding: "16px 18px",
      transition: "transform 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{
        fontSize: 10, color: "var(--muted)",
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase",
        letterSpacing: 1, marginBottom: 8,
      }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
    </div>
  );
}
