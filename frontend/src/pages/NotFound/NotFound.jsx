import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout.jsx';

export default function NotFound() {
  return (
    <MainLayout>
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1 style={{ fontSize: 64, fontWeight: 900, color: 'var(--blue)' }}>404</h1>
        <p style={{ color: 'var(--text-soft)', marginBottom: 24 }}>Page not found.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    </MainLayout>
  );
}
