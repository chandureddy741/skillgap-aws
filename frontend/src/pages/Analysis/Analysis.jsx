import { Link, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  ListOrdered,
  BookOpen,
  FolderKanban,
  FileText,
  Compass,
  Clock,
} from 'lucide-react';
import MainLayout from '../../layouts/MainLayout.jsx';
import Card from '../../components/common/Card.jsx';
import ProgressChart from '../../components/dashboard/ProgressChart.jsx';
import { asList } from '../../utils/helpers';
import './Analysis.css';

export default function Analysis() {
  const { state } = useLocation();
  const result = state?.result;

  if (!result) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: 60 }}>
          <p style={{ marginBottom: 20, color: 'var(--text-soft)' }}>No analysis to show yet.</p>
          <Link to="/assessment" className="btn btn-primary">Start Skill Analysis</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="analysis-header">
        <div>
          <h1>{state.technology} — Skill Gap Report</h1>
          <p>{result.skill_gap_summary}</p>
        </div>
        <span className="badge" style={{ fontSize: 15 }}>{result.current_level}</span>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <Card>
          <h3 style={{ marginBottom: 14 }}>Confidence Score</h3>
          <ProgressChart label="AI Confidence in Your Current Skills" value={result.confidence_score} />
          <p className="analysis-meta"><Clock size={15} /> Estimated learning time: <b>{result.estimated_learning_time}</b></p>
          <p className="analysis-meta">Interview readiness: <b>{result.interview_readiness}</b></p>
        </Card>
        <Card>
          <h3 style={{ marginBottom: 10, display: 'flex', gap: 8, alignItems: 'center' }}><Compass size={18} /> Career Advice</h3>
          <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.65 }}>{result.career_advice}</p>
          <p style={{ fontSize: 14, marginTop: 12, lineHeight: 1.6 }}><b>Why it matters:</b> {result.industry_importance}</p>
        </Card>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <Card>
          <h3 className="list-title green"><CheckCircle2 size={18} /> Current Knowledge</h3>
          <ul>{asList(result.current_knowledge).map((t) => <li key={t}>{t}</li>)}</ul>
        </Card>
        <Card>
          <h3 className="list-title red"><AlertTriangle size={18} /> Missing Concepts</h3>
          <ul>{asList(result.missing_concepts).map((t) => <li key={t}>{t}</li>)}</ul>
        </Card>
        <Card>
          <h3 className="list-title amber"><AlertTriangle size={18} /> Weak Areas</h3>
          <ul>{asList(result.weak_areas).map((t) => <li key={t}>{t}</li>)}</ul>
        </Card>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <h3 className="list-title"><ListOrdered size={18} /> Recommended Learning Sequence</h3>
        <ol className="sequence-list">
          {asList(result.learning_sequence).map((t) => <li key={t}>{t}</li>)}
        </ol>
      </Card>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <Card>
          <h3 className="list-title"><BookOpen size={18} /> Recommended Resources</h3>
          <ul>
            {asList(result.recommended_resources).map((r, i) => (
              <li key={i}>{typeof r === 'string' ? r : `${r.name} (${r.type})`}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="list-title"><FileText size={18} /> Resume Improvements</h3>
          <ul>{asList(result.resume_improvements).map((t) => <li key={t}>{t}</li>)}</ul>
        </Card>
      </div>

      <Card style={{ marginBottom: 30 }}>
        <h3 className="list-title"><FolderKanban size={18} /> Recommended Projects</h3>
        <div className="grid-3">
          {asList(result.recommended_projects).map((p, i) => (
            <div key={i} className="project-mini">
              <span className="badge">{typeof p === 'string' ? 'Project' : p.difficulty}</span>
              <h4>{typeof p === 'string' ? p : p.name}</h4>
              {typeof p !== 'string' && <p>{p.description}</p>}
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/roadmap" state={{ technology: state.technology }} className="btn btn-primary">Generate Learning Roadmap</Link>
        <Link to="/assessment" className="btn btn-secondary">Analyze Another Technology</Link>
      </div>
    </MainLayout>
  );
}
