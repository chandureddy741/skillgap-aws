import Card from '../common/Card.jsx';

export default function ReadinessCard({ title, text }) {
  return (
    <Card>
      <h3 style={{ fontSize: 16, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
        {text || 'Run a skill analysis to unlock AI insights.'}
      </p>
    </Card>
  );
}
