import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import useAuth from '../../hooks/useAuth';
import { register } from '../../services/authService';

const initial = {
  full_name: '',
  college: '',
  department: '',
  year: '',
  email: '',
  password: '',
  confirm_password: '',
};

export default function RegisterForm() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await register(form);
      await loginWithToken(res.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Registration failed. Check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-text">{error}</p>}
      <Input label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} required />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Input label="College" name="college" value={form.college} onChange={handleChange} />
        <Input label="Department" name="department" value={form.department} onChange={handleChange} />
      </div>
      <Input label="Year" name="year" placeholder="e.g. 2nd Year" value={form.year} onChange={handleChange} />
      <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
        <Input label="Confirm Password" type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} required minLength={6} />
      </div>
      <Button type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
        {loading ? 'Creating account…' : 'Create Account'}
      </Button>
      <p style={{ marginTop: 16, fontSize: 14, color: 'var(--text-soft)', textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--blue-dark)', fontWeight: 600 }}>
          Login
        </Link>
      </p>
    </form>
  );
}
