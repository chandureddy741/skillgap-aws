import Card from '../common/Card.jsx';

export default function RecommendationCard({ title, items = [] }) {
  return (
    <Card>
      <h3 style={{ fontSize: 16, marginBottom: 12 }}>{title}</h3>
      {items.length ? (
        <div>
          {items.map((item) => (
            <span key={item} className="chip">{item}</span>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>Nothing here yet.</p>
      )}
    </Card>
  );
}
