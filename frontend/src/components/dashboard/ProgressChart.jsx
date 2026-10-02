export default function ProgressChart({ label, value }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue-dark)' }}>{pct}%</span>
      </div>
      <div className="progress-bar">
        <div style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
