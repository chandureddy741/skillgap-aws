import { useEffect, useState } from 'react';
import { FileSearch } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Loader from '../../components/common/Loader.jsx';
import ResumeUpload from '../../components/forms/ResumeUpload.jsx';
import TargetRole from '../../components/forms/TargetRole.jsx';
import ProgressChart from '../../components/dashboard/ProgressChart.jsx';
import { analyzeResume, getTechnologies } from '../../services/skillService';
import { asList } from '../../utils/helpers';
import '../Analysis/Analysis.css';

export default function ResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('');
  const [targetRoles, setTargetRoles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getTechnologies().then((res) => setTargetRoles(res.data.target_roles));
  }, []);

  const handleAnalyze = async () => {
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (targetRole) formData.append('target_role', targetRole);
      const res = await analyzeResume(formData);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.detail || 'Resume analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="section-title">Resume Analysis</h1>
      <p className="section-subtitle">Upload your resume PDF and get an AI-powered ATS review.</p>

      <Card style={{ maxWidth: 720, margin: '0 auto 36px' }}>
        {error && <p className="error-text">{error}</p>}
        <ResumeUpload file={file} setFile={setFile} />
        <div style={{ marginTop: 18 }}>
          <TargetRole roles={targetRoles} value={targetRole} onChange={setTargetRole} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" disabled={!file || loading} onClick={handleAnalyze}>
            <FileSearch size={18} /> {loading ? 'Analyzing…' : 'Analyze Resume'}
          </button>
        </div>
      </Card>

      {loading && <Loader text="The AI reviewer is reading your resume…" />}

      {!loading && result && (
        <div className="fade-up">
          <div className="grid-2" style={{ marginBottom: 24 }}>
            <Card>
              <h3 style={{ marginBottom: 14 }}>Scores</h3>
              <ProgressChart label="ATS Score" value={result.ats_score} />
              <ProgressChart label="Resume Score" value={result.resume_score} />
            </Card>
            <Card>
              <h3 style={{ marginBottom: 10 }}>Overall Assessment</h3>
              <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.65 }}>{result.summary}</p>
            </Card>
          </div>
          <div className="grid-3" style={{ marginBottom: 24 }}>
            <Card>
              <h3 className="list-title green">Strengths</h3>
              <ul>{asList(result.strengths).map((t) => <li key={t}>{t}</li>)}</ul>
            </Card>
            <Card>
              <h3 className="list-title red">Weak Sections</h3>
              <ul>{asList(result.weak_sections).map((t) => <li key={t}>{t}</li>)}</ul>
            </Card>
            <Card>
              <h3 className="list-title amber">Missing Skills</h3>
              <ul>{asList(result.missing_skills).map((t) => <li key={t}>{t}</li>)}</ul>
            </Card>
          </div>
          <div className="grid-3">
            <Card>
              <h3 className="list-title">Suggested Projects</h3>
              <ul>{asList(result.suggested_projects).map((t) => <li key={t}>{t}</li>)}</ul>
            </Card>
            <Card>
              <h3 className="list-title">Suggested Certifications</h3>
              <ul>{asList(result.suggested_certifications).map((t) => <li key={t}>{t}</li>)}</ul>
            </Card>
            <Card>
              <h3 className="list-title">Suggested Improvements</h3>
              <ul>{asList(result.suggested_improvements).map((t) => <li key={t}>{t}</li>)}</ul>
            </Card>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
