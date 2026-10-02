import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout.jsx';
import SkillForm from '../../components/forms/SkillForm.jsx';
import Card from '../../components/common/Card.jsx';
import Loader from '../../components/common/Loader.jsx';
import { analyzeSkills, getTechnologies } from '../../services/skillService';
import './Assessment.css';

export default function Assessment() {
  const [technologies, setTechnologies] = useState({});
  const [targetRoles, setTargetRoles] = useState([]);
  const [technology, setTechnology] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getTechnologies().then((res) => {
      setTechnologies(res.data.technologies);
      setTargetRoles(res.data.target_roles);
    });
  }, []);

  useEffect(() => {
    setSelectedTopics([]);
  }, [technology]);

  const toggleTopic = (topic) =>
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );

  const handleAnalyze = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await analyzeSkills({
        technology,
        completed_topics: selectedTopics,
        target_role: targetRole || null,
      });
      navigate('/analysis', { state: res.data });
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="section-title">AI Skill Gap Analysis</h1>
      <p className="section-subtitle">
        Select a technology, tick what you already know, and let the AI mentor find your gaps.
      </p>
      <Card style={{ maxWidth: 900, margin: '0 auto' }}>
        {loading ? (
          <Loader text="The AI mentor is analyzing your skills…" />
        ) : (
          <>
            {error && <p className="error-text">{error}</p>}
            <SkillForm
              technologies={technologies}
              targetRoles={targetRoles}
              technology={technology}
              setTechnology={setTechnology}
              selectedTopics={selectedTopics}
              toggleTopic={toggleTopic}
              targetRole={targetRole}
              setTargetRole={setTargetRole}
            />
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button className="btn btn-primary" disabled={!technology} onClick={handleAnalyze}>
                <Sparkles size={18} /> Analyze My Skills
              </button>
            </div>
          </>
        )}
      </Card>
    </MainLayout>
  );
}
