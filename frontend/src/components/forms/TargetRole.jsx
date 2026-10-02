export default function TargetRole({ roles = [], value, onChange }) {
  return (
    <div className="field">
      <label>Target Role (optional)</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a target role…</option>
        {roles.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
    </div>
  );
}
