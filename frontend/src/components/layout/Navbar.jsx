import { Link } from 'react-router-dom';
import { BrainCircuit, ArrowUpRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import './Navbar.css';

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to={user ? '/dashboard' : '/home'} className="navbar-logo">
          <span className="navbar-logo-icon"><BrainCircuit size={19} /></span>
          <span className="navbar-logo-text">SKILLGAP.AI</span>
        </Link>
        <nav className="navbar-links">
          <a href="/home#capabilities" className="navbar-link">Capabilities</a>
          <a href="/home#workflow" className="navbar-link">Workflow</a>
          <a href="/home#why" className="navbar-link">Why it works</a>
          {user ? (
            <Link to="/dashboard" className="btn btn-primary navbar-cta">Open dashboard <ArrowUpRight size={16} /></Link>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="btn btn-primary navbar-cta">Start free <ArrowUpRight size={16} /></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
