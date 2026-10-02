import { Clock } from 'lucide-react';
import Card from '../common/Card.jsx';
import WeeklyPlan from './WeeklyPlan.jsx';
import { asList } from '../../utils/helpers';

export default function RoadmapCard({ stage }) {
  return (
    <Card style={{ flex: 1, marginBottom: 30 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <h3 style={{ fontSize: 20 }}>{stage.level}</h3>
        <span className="badge"><Clock size={14} /> {stage.estimated_time}</span>
      </div>
      <div style={{ marginTop: 14 }}>
        <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>Topics</p>
        <div>{asList(stage.topics).map((t) => <span key={t} className="chip">{t}</span>)}</div>
      </div>
      <WeeklyPlan
        practiceTasks={asList(stage.practice_tasks)}
        miniProjects={asList(stage.mini_projects)}
        majorProjects={asList(stage.major_projects)}
        skillsGained={asList(stage.skills_gained)}
      />
    </Card>
  );
}
