import { useEffect, useState } from 'react';
import { FolderKanban, Clock } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Loader from '../../components/common/Loader.jsx';
import { getProjects, getTechnologies } from '../../services/skillService';
import { LEVELS } from '../../utils/constants';
import { asList } from '../../utils/helpers';

export default function Projects() {
  const [technologies, setTechnologies] = useState({});
  const [technology, setTechnology] = useState('');
  const [targetRoles, setTargetRoles] = useState([]);
  const [targetRole, setTargetRole] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getTechnologies().then((res) => {
      setTechnologies(res.data.technologies);
      setTargetRoles(res.data.target_roles || []);
    });
  }, []);

  const handleFetch = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await getProjects({ technology, level, target_role: targetRole || null });
      setResult(res.data.projects);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="section-title">Project Recommendations</h1>
      <p className="section-subtitle">AI-picked projects matched to your technology and level.</p>

      <Card style={{ maxWidth: 720, margin: '0 auto 36px' }}>
        {error && <p className="error-text">{error}</p>}
        <div className="field">
          <label>Technology</label>
          <select value={technology} onChange={(e) => setTechnology(e.target.value)}>
            <option value="">Choose a technology…</option>
            {Object.keys(technologies).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Target Role</label>
          <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)}>
            <option value="">Choose a target role…</option>
            {targetRoles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Your Level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" disabled={!technology || loading} onClick={handleFetch}>
            <FolderKanban size={18} /> {loading ? 'Generating…' : 'Recommend Projects'}
          </button>
        </div>
      </Card>

      {loading && <Loader text="The AI mentor is picking projects for you…" />}

      {!loading && result && (
        <div className="grid-3 fade-up">
          {asList(result.projects).map((p, i) => (
            <Card key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span className="badge">{p.difficulty}</span>
                <span style={{ fontSize: 13, color: 'var(--text-soft)', display: 'flex', gap: 4, alignItems: 'center' }}>
                  <Clock size={14} /> {p.duration}
                </span>
              </div>
              <h3 style={{ fontSize: 17, marginBottom: 8 }}>{p.name}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55, marginBottom: 10 }}>{p.description}</p>
              <p style={{ fontSize: 13, marginBottom: 8 }}><b>Learning outcome:</b> {p.learning_outcome}</p>
              <div style={{ marginBottom: 6 }}>
                {asList(p.technologies).map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-soft)' }}>
                <b>Skills:</b> {asList(p.skills_required).join(', ')}
              </p>
            </Card>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
