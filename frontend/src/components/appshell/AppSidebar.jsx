import { NavLink, useNavigate } from 'react-router-dom';
import {
  BrainCircuit, LayoutDashboard, ScanSearch, Route, FileSearch,
  FolderKanban, MessagesSquare, UserCircle2, Settings, LogOut, Sparkles
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import './AppSidebar.css';

const links = [
  { to: '/dashboard', label: 'Mission Control', icon: LayoutDashboard },
  { to: '/assessment', label: 'Skill Scan', icon: ScanSearch },
  { to: '/roadmap', label: 'Roadmap', icon: Route },
  { to: '/projects', label: 'Project Lab', icon: FolderKanban },
  { to: '/resume', label: 'Resume Lab', icon: FileSearch },
  { to: '/interview', label: 'Interview Arena', icon: MessagesSquare },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const firstName = user?.full_name?.split(' ')[0] || 'Learner';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="app-sidebar">
      <div className="side-brand">
        <span className="side-brand-mark"><BrainCircuit size={21} /></span>
        <div>
          <strong>SKILLGAP.AI</strong>
          <span>Career Intelligence</span>
        </div>
      </div>

      <div className="side-user">
        <span className="side-avatar">{firstName[0]?.toUpperCase()}</span>
        <div>
          <strong>{firstName}</strong>
          <span><Sparkles size={12} /> Growth mode active</span>
        </div>
      </div>

      <nav className="side-nav">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="side-footer">
        <div className="side-tip">
          <span>AI career loop</span>
          <strong>Diagnose → Build → Prove</strong>
        </div>
        <button onClick={handleLogout} className="side-logout"><LogOut size={17} /> Sign out</button>
      </div>
    </aside>
  );
}
