import { useEffect, useState } from 'react';
import { MessagesSquare, ChevronDown, ChevronUp } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Loader from '../../components/common/Loader.jsx';
import { getInterviewPrep, getTechnologies } from '../../services/skillService';
import { LEVELS } from '../../utils/constants';
import { asList } from '../../utils/helpers';

function QA({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 10, textAlign: 'left', fontSize: 15, fontWeight: 600, color: 'var(--text)' }}
      >
        {question}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>{answer}</p>}
    </div>
  );
}

export default function Interview() {
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
      const res = await getInterviewPrep({ technology, level, target_role: targetRole || null });
      setResult(res.data.interview);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate interview prep.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="section-title">Interview Preparation</h1>
      <p className="section-subtitle">AI-generated technical questions, HR questions, coding challenges, and MCQs.</p>

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
            <MessagesSquare size={18} /> {loading ? 'Generating…' : 'Generate Interview Prep'}
          </button>
        </div>
      </Card>

      {loading && <Loader text="The AI interviewer is preparing questions…" />}

      {!loading && result && (
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Card>
            <h3 style={{ marginBottom: 8 }}>Technical Questions</h3>
            {asList(result.technical_questions).map((q, i) => <QA key={i} question={q.question} answer={q.answer} />)}
          </Card>
          <Card>
            <h3 style={{ marginBottom: 8 }}>HR Questions</h3>
            {asList(result.hr_questions).map((q, i) => <QA key={i} question={q.question} answer={q.answer} />)}
          </Card>
          <Card>
            <h3 style={{ marginBottom: 8 }}>Coding Challenges</h3>
            {asList(result.coding_challenges).map((c, i) => (
              <QA key={i} question={c.title} answer={`${c.problem} — Hint: ${c.hint} — Approach: ${c.solution_outline}`} />
            ))}
          </Card>
          <Card>
            <h3 style={{ marginBottom: 8 }}>MCQs</h3>
            {asList(result.mcqs).map((m, i) => (
              <QA
                key={i}
                question={m.question}
                answer={`Options: ${asList(m.options).join(' | ')} — Correct: ${m.correct}. ${m.explanation}`}
              />
            ))}
          </Card>
          <Card>
            <h3 style={{ marginBottom: 12 }}>Mock Interview Questions</h3>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              {asList(result.mock_interview_questions).map((q) => <li key={q}>{q}</li>)}
            </ul>
          </Card>
          <Card>
            <h3 style={{ marginBottom: 12 }}>Preparation Tips</h3>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              {asList(result.preparation_tips).map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Card>
        </div>
      )}
    </MainLayout>
  );
}
