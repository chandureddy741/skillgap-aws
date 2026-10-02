function Section({ title, items }) {
  if (!items.length) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{title}</p>
      <ul style={{ paddingLeft: 20, fontSize: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default function WeeklyPlan({ practiceTasks, miniProjects, majorProjects, skillsGained }) {
  return (
    <div>
      <Section title="Practice Tasks" items={practiceTasks} />
      <Section title="Mini Projects" items={miniProjects} />
      <Section title="Major Projects" items={majorProjects} />
      {skillsGained.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>Skills Gained</p>
          <div>{skillsGained.map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
      )}
    </div>
  );
}
