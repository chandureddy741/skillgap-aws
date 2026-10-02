import { Link } from 'react-router-dom';
import {
  ArrowRight, BrainCircuit, ScanSearch, Route, FolderKanban, FileSearch,
  MessagesSquare, Target, Sparkles, CheckCircle2, Radar, Activity, Gauge
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import './Home.css';

const capabilities = [
  { icon: ScanSearch, tag: '01', title: 'Diagnose', text: 'Map what you know against the skills required for a technology and target role.' },
  { icon: Route, tag: '02', title: 'Plan', text: 'Convert gaps into an ordered, stage-based learning roadmap with tasks and projects.' },
  { icon: FolderKanban, tag: '03', title: 'Build', text: 'Generate project recommendations that match your present level and learning goals.' },
  { icon: FileSearch, tag: '04', title: 'Prove', text: 'Analyze your resume for ATS readiness, missing skills and portfolio evidence.' },
  { icon: MessagesSquare, tag: '05', title: 'Prepare', text: 'Practice technical, HR, coding and MCQ rounds using AI-generated interview sets.' },
  { icon: Target, tag: '06', title: 'Track', text: 'Bring scores, progress, reports and next actions into one career mission control.' },
];

export default function Home() {
  return (
    <div className="page">
      <Navbar />
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> AI career intelligence for students</span>
          <h1>Stop guessing what to learn next.</h1>
          <p className="hero-gradient-text">Find the gap. Build the proof. Get interview-ready.</p>
          <p className="hero-subtitle">AI Skill Gap Agent turns your current skills, target role and resume into one adaptive career loop—from diagnosis to execution.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">Run my skill scan <ArrowRight size={17} /></Link>
            <a href="#workflow" className="btn btn-secondary">See the workflow</a>
          </div>
          <div className="hero-trust">
            <span><CheckCircle2 size={14} /> Role-aware</span>
            <span><CheckCircle2 size={14} /> Personalized roadmaps</span>
            <span><CheckCircle2 size={14} /> Resume + interview loop</span>
          </div>
        </div>

        <div className="hero-console">
          <div className="console-top"><span></span><span></span><span></span><b>CAREER MISSION CONTROL</b></div>
          <div className="console-grid">
            <div className="console-score"><Radar size={20} /><span>Skill confidence</span><strong>72%</strong><div className="mini-bar"><i style={{width:'72%'}} /></div></div>
            <div className="console-score"><Gauge size={20} /><span>Readiness</span><strong>64%</strong><div className="mini-bar"><i style={{width:'64%'}} /></div></div>
          </div>
          <div className="console-path">
            <span className="path-label">NEXT BEST ACTION</span>
            <h3>Strengthen REST APIs + SQL joins</h3>
            <p>2 priority gaps are blocking Backend Developer readiness.</p>
          </div>
          <div className="console-steps">
            {['Skill Scan','Roadmap','Project Proof','Resume','Interview'].map((x,i)=><div className={i < 2 ? 'done' : ''} key={x}><span>{i+1}</span><b>{x}</b></div>)}
          </div>
        </div>
      </section>

      <section className="container home-section" id="capabilities">
        <div className="section-kicker">ONE PRODUCT · SIX CAPABILITIES</div>
        <h2 className="section-title">A complete readiness loop, not a one-time AI report.</h2>
        <p className="section-subtitle">Each module feeds the same goal: identify the highest-impact gap and convert it into evidence you can show in interviews.</p>
        <div className="capability-grid">
          {capabilities.map(({icon:Icon, tag, title, text}) => (
            <article className="capability-card" key={title}>
              <div className="capability-head"><span>{tag}</span><Icon size={21}/></div>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container workflow-section" id="workflow">
        <div className="workflow-panel">
          <div>
            <div className="section-kicker">ADAPTIVE WORKFLOW</div>
            <h2>Diagnose → Plan → Build → Prove → Prepare</h2>
            <p>The user begins with a self-assessment. The AI compares completed topics against the technology map and target role, generates a gap report, creates a roadmap, suggests portfolio projects, reviews the resume, and finally generates interview preparation.</p>
          </div>
          <div className="workflow-rail">
            {['Profile + target role','Skill gap analysis','Adaptive roadmap','Project portfolio','Resume evidence','Interview preparation'].map((s,i)=><div key={s}><span>{String(i+1).padStart(2,'0')}</span><b>{s}</b><Activity size={16}/></div>)}
          </div>
        </div>
      </section>

      <section className="container home-section" id="why">
        <div className="why-banner">
          <BrainCircuit size={34} />
          <div><span className="section-kicker">HACKATHON VALUE</span><h2>One AI mentor that turns uncertainty into measurable next actions.</h2></div>
          <Link to="/register" className="btn btn-primary">Build my plan <ArrowRight size={17}/></Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
