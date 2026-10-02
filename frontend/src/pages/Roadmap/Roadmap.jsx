import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Map } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Loader from '../../components/common/Loader.jsx';
import Timeline from '../../components/roadmap/Timeline.jsx';
import TargetRole from '../../components/forms/TargetRole.jsx';
import { generateRoadmap, getAnalyses, getRoadmaps, getTechnologies } from '../../services/skillService';
import './Roadmap.css';

export default function Roadmap() {
  const { state } = useLocation();
  const [technologies, setTechnologies] = useState({});
  const [targetRoles, setTargetRoles] = useState([]);
  const [technology, setTechnology] = useState(state?.technology || '');
  const [targetRole, setTargetRole] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getTechnologies().then((res) => {
      setTechnologies(res.data.technologies);
      setTargetRoles(res.data.target_roles);
    });
    getRoadmaps().then((res) => {
      if (res.data.length) {
        setRoadmap(res.data[0].roadmap);
        setTechnology((t) => t || res.data[0].technology);
      }
    });
  }, []);

  const handleGenerate = async () => {
    setError('');
    setLoading(true);
    try {
      const analyses = await getAnalyses();
      const match = analyses.data.find((a) => a.technology === technology);
      const res = await generateRoadmap({
        technology,
        completed_topics: match?.completed_topics || [],
        target_role: targetRole || null,
      });
      setRoadmap(res.data.roadmap);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate roadmap.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="section-title">Personalized Learning Roadmap</h1>
      <p className="section-subtitle">A visual timeline from Beginner to Industry Ready — built by AI for you.</p>

      <Card style={{ maxWidth: 720, margin: '0 auto 36px' }}>
        {error && <p className="error-text">{error}</p>}
        <div className="field">
          <label>Technology</label>
          <select value={technology} onChange={(e) => setTechnology(e.target.value)}>
            <option value="">Choose a technology…</option>
            {Object.keys(technologies).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <TargetRole roles={targetRoles} value={targetRole} onChange={setTargetRole} />
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" disabled={!technology || loading} onClick={handleGenerate}>
            <Map size={18} /> {loading ? 'Generating…' : 'Generate Roadmap'}
          </button>
        </div>
      </Card>

      {loading && <Loader text="The AI mentor is designing your roadmap…" />}

      {!loading && roadmap && (
        <div className="fade-up">
          <Card style={{ marginBottom: 30, textAlign: 'center' }}>
            <h2 style={{ marginBottom: 8 }}>{roadmap.technology} Roadmap</h2>
            <p style={{ color: 'var(--text-soft)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>{roadmap.summary}</p>
            <p style={{ marginTop: 10 }}><span className="badge">Total time: {roadmap.total_estimated_time}</span></p>
          </Card>
          <Timeline stages={roadmap.stages || []} />
        </div>
      )}
    </MainLayout>
  );
}
