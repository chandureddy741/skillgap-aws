import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/common/Loader.jsx';

import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import Register from '../pages/Register/Register.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import Assessment from '../pages/Assessment/Assessment.jsx';
import Analysis from '../pages/Analysis/Analysis.jsx';
import Roadmap from '../pages/Roadmap/Roadmap.jsx';
import ResumeAnalysis from '../pages/ResumeAnalysis/ResumeAnalysis.jsx';
import Projects from '../pages/Projects/Projects.jsx';
import Interview from '../pages/Interview/Interview.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import Settings from '../pages/Settings/Settings.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader text="Loading…" />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function EntryRoute() {
  const { user, loading } = useAuth();
  if (loading) return <Loader text="Loading…" />;
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
}

function PublicOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader text="Loading…" />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EntryRoute />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
      <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/assessment" element={<Protected><Assessment /></Protected>} />
      <Route path="/analysis" element={<Protected><Analysis /></Protected>} />
      <Route path="/roadmap" element={<Protected><Roadmap /></Protected>} />
      <Route path="/resume" element={<Protected><ResumeAnalysis /></Protected>} />
      <Route path="/projects" element={<Protected><Projects /></Protected>} />
      <Route path="/interview" element={<Protected><Interview /></Protected>} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} />
      <Route path="/settings" element={<Protected><Settings /></Protected>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
