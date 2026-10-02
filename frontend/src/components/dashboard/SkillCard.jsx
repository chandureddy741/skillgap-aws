import Card from '../common/Card.jsx';

export default function SkillCard({ icon: Icon, title, value, sub, color = 'var(--blue)' }) {
  return (
    <Card className="fade-up" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <span
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 46,
          height: 46,
          borderRadius: 14,
          background: 'var(--light-blue)',
          color,
          flexShrink: 0,
        }}
      >
        <Icon size={22} />
      </span>
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-soft)' }}>{title}</p>
        <p style={{ fontSize: 22, fontWeight: 800, margin: '2px 0' }}>{value ?? '—'}</p>
        {sub && <p style={{ fontSize: 13, color: 'var(--text-soft)' }}>{sub}</p>}
      </div>
    </Card>
  );
}
