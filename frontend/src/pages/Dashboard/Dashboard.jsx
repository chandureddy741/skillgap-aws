import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, FileSearch, FolderKanban, Gauge, Map, MessagesSquare, ScanSearch, Sparkles, Target, TrendingUp } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Loader from '../../components/common/Loader.jsx';
import useAuth from '../../hooks/useAuth';
import { getDashboardStats } from '../../services/skillService';
import { formatDate } from '../../utils/helpers';
import './Dashboard.css';

function Metric({ icon: Icon, label, value, sub }) {
  return <div className="mission-metric"><div className="mission-metric-icon"><Icon size={18}/></div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div>;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then((res) => setStats(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <MainLayout><Loader text="Building your career intelligence dashboard…" /></MainLayout>;
  const s = stats || {};
  const readiness = Math.min(100, (s.total_analyses || 0) * 15 + (s.total_roadmaps || 0) * 15 + (s.total_resume_reports || 0) * 20 + (s.total_interview_preps || 0) * 10);
  const firstName = user?.full_name?.split(' ')[0] || 'Learner';

  const actions = [
    { to:'/assessment', icon:ScanSearch, title:'Run skill scan', text:'Find the highest-impact gaps blocking your target role.' },
    { to:'/roadmap', icon:Map, title:'Generate roadmap', text:'Turn those gaps into an ordered execution plan.' },
    { to:'/projects', icon:FolderKanban, title:'Build proof', text:'Choose a project that converts learning into portfolio evidence.' },
    { to:'/resume', icon:FileSearch, title:'Improve resume', text:'Check ATS readiness and missing proof for your role.' },
    { to:'/interview', icon:MessagesSquare, title:'Enter interview arena', text:'Practice technical, HR, coding and MCQ rounds.' },
  ];

  return (
    <MainLayout>
      <section className="mission-hero">
        <div>
          <span className="mission-kicker"><Sparkles size={14}/> CAREER MISSION CONTROL</span>
          <h1>Welcome back, {firstName}.</h1>
          <p>Your dashboard converts every analysis into one clear next action. Do not collect reports—close gaps.</p>
        </div>
        <Link to="/assessment" className="btn btn-primary">New skill scan <ArrowRight size={17}/></Link>
      </section>

      <section className="mission-metrics">
        <Metric icon={Gauge} label="Current level" value={s.current_skill_level || 'Not mapped'} sub={s.confidence_score != null ? `${Math.round(s.confidence_score)}% skill confidence` : 'Run your first scan'} />
        <Metric icon={TrendingUp} label="Career readiness" value={`${readiness}%`} sub={`${s.completed_topics_count || 0} tracked topics`} />
        <Metric icon={FileSearch} label="Resume signal" value={s.resume_score != null ? `${Math.round(s.resume_score)}/100` : 'No score'} sub={`${s.total_resume_reports || 0} resume reports`} />
        <Metric icon={MessagesSquare} label="Interview practice" value={`${s.total_interview_preps || 0}`} sub="generated prep sessions" />
      </section>

      <section className="mission-layout">
        <Card className="readiness-core">
          <div className="panel-head"><div><span>READINESS ENGINE</span><h2>Your progress loop</h2></div><BrainCircuit size={25}/></div>
          <div className="readiness-ring" style={{'--score': `${readiness * 3.6}deg`}}><div><strong>{readiness}%</strong><span>readiness</span></div></div>
          <div className="readiness-breakdown">
            <div><span>Skill analyses</span><b>{s.total_analyses || 0}</b></div>
            <div><span>Roadmaps</span><b>{s.total_roadmaps || 0}</b></div>
            <div><span>Resume checks</span><b>{s.total_resume_reports || 0}</b></div>
            <div><span>Interview preps</span><b>{s.total_interview_preps || 0}</b></div>
          </div>
        </Card>

        <Card className="next-action-panel">
          <div className="panel-head"><div><span>NEXT BEST ACTION</span><h2>{s.recommended_skills?.length ? 'Close your priority gaps' : 'Create your baseline'}</h2></div><Target size={24}/></div>
          {s.recommended_skills?.length ? (
            <><p>Start with the first missing concepts below. They are taken from your latest AI analysis.</p><div className="priority-stack">{s.recommended_skills.slice(0,5).map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span><b>{x}</b></div>)}</div><Link to="/roadmap" className="btn btn-secondary">Turn into roadmap <ArrowRight size={16}/></Link></>
          ) : (
            <><p>No baseline exists yet. Select a technology, mark what you genuinely know, and let the system identify the gap.</p><Link to="/assessment" className="btn btn-primary">Run first skill scan</Link></>
          )}
        </Card>
      </section>

      <section className="action-section">
        <div className="section-row"><div><span className="mission-kicker">EXECUTION LOOP</span><h2>Move from analysis to evidence</h2></div></div>
        <div className="action-grid">{actions.map(({to,icon:Icon,title,text},i)=><Link to={to} className="action-card" key={title}><span className="action-index">0{i+1}</span><Icon size={22}/><h3>{title}</h3><p>{text}</p><ArrowRight size={16}/></Link>)}</div>
      </section>

      <section className="mission-layout lower">
        <Card>
          <div className="panel-head"><div><span>RECENT SIGNALS</span><h2>Latest analyses</h2></div></div>
          {(s.recent_analyses || []).length ? s.recent_analyses.map(a => <div className="signal-row" key={a.id}><div><b>{a.technology}</b><span>{formatDate(a.created_at)}</span></div><em>{a.current_level || 'Analyzed'}</em></div>) : <p className="empty-copy">No analyses yet.</p>}
        </Card>
        <Card>
          <div className="panel-head"><div><span>ACTIVE ROADMAP</span><h2>{s.active_roadmap?.technology || 'No active roadmap'}</h2></div></div>
          <p className="empty-copy">{s.active_roadmap ? 'Continue the roadmap generated from your learning goal and skill gaps.' : 'Generate a roadmap after your skill scan to create a structured execution path.'}</p>
          <Link to="/roadmap" className="btn btn-secondary">{s.active_roadmap ? 'Open roadmap' : 'Generate roadmap'} <ArrowRight size={16}/></Link>
        </Card>
      </section>
    </MainLayout>
  );
}
