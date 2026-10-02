import { useEffect, useState } from 'react';
import { GraduationCap, Target } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Loader from '../../components/common/Loader.jsx';
import ProgressChart from '../../components/dashboard/ProgressChart.jsx';
import useAuth from '../../hooks/useAuth';
import { getAnalyses, getRoadmaps } from '../../services/skillService';
import { formatDate } from '../../utils/helpers';
import './Profile.css';

export default function Profile() {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAnalyses(), getRoadmaps()])
      .then(([a, r]) => {
        setAnalyses(a.data);
        setRoadmaps(r.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <MainLayout><Loader text="Loading profile…" /></MainLayout>;

  return (
    <MainLayout>
      <div className="profile-hero glass-card">
        <div className="profile-avatar">{user?.full_name?.[0]?.toUpperCase()}</div>
        <div>
          <h1>{user?.full_name}</h1>
          <p>{user?.email}</p>
          <p className="profile-meta">
            <GraduationCap size={15} /> {user?.college || 'College not set'} · {user?.department || 'Department not set'} · {user?.year || 'Year not set'}
          </p>
          <p className="profile-meta">
            <Target size={15} /> Learning goal: {user?.learning_goal || 'Not set yet'}
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 26 }}>
        <Card>
          <h3 style={{ marginBottom: 14 }}>Skill Progress</h3>
          {analyses.length ? (
            analyses.slice(0, 5).map((a) => (
              <ProgressChart key={a.id} label={`${a.technology} (${a.current_level || '—'})`} value={a.confidence_score || 0} />
            ))
          ) : (
            <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>No skill analyses yet.</p>
          )}
        </Card>
        <Card>
          <h3 style={{ marginBottom: 14 }}>Current Roadmaps</h3>
          {roadmaps.length ? (
            roadmaps.slice(0, 5).map((r) => (
              <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontWeight: 600 }}>{r.technology}</span>
                <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>{formatDate(r.created_at)}</span>
              </div>
            ))
          ) : (
            <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>No roadmaps yet.</p>
          )}
        </Card>
      </div>

      <Card style={{ marginTop: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Completed Topics</h3>
        {analyses.length ? (
          <div>
            {[...new Set(analyses.flatMap((a) => a.completed_topics || []))].map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>Complete a skill analysis to see topics here.</p>
        )}
      </Card>
    </MainLayout>
  );
}
