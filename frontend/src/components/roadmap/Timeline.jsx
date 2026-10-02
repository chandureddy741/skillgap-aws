import RoadmapCard from './RoadmapCard.jsx';

export default function Timeline({ stages = [] }) {
  return (
    <div className="timeline">
      {stages.map((stage, i) => (
        <div key={stage.level || i} className="timeline-item">
          <div className="timeline-marker">
            <span className={`timeline-dot ${stage.status || 'upcoming'}`} />
            {i < stages.length - 1 && <span className="timeline-line" />}
          </div>
          <RoadmapCard stage={stage} />
        </div>
      ))}
    </div>
  );
}
