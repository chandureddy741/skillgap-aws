import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import useAuth from '../../hooks/useAuth';
import { login } from '../../services/authService';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form);
      await loginWithToken(res.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-text">{error}</p>}
      <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
      <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
      <Button type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
        {loading ? 'Signing in…' : 'Login'}
      </Button>
      <p style={{ marginTop: 16, fontSize: 14, color: 'var(--text-soft)', textAlign: 'center' }}>
        No account yet?{' '}
        <Link to="/register" style={{ color: 'var(--blue-dark)', fontWeight: 600 }}>
          Create Account
        </Link>
      </p>
    </form>
  );
}
