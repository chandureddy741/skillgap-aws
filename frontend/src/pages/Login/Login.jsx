import AuthLayout from '../../layouts/AuthLayout.jsx';
import LoginForm from '../../components/auth/LoginForm.jsx';
import './Login.css';

export default function Login() {
  return (
    <AuthLayout>
      <div className="glass-card auth-card fade-up">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Login to continue your learning journey.</p>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
