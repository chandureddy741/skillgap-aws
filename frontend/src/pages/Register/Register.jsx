import AuthLayout from '../../layouts/AuthLayout.jsx';
import RegisterForm from '../../components/auth/RegisterForm.jsx';
import '../Login/Login.css';

export default function Register() {
  return (
    <AuthLayout>
      <div className="glass-card auth-card fade-up" style={{ maxWidth: 540 }}>
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">Start your AI-powered skill gap analysis today.</p>
        <RegisterForm />
      </div>
    </AuthLayout>
  );
}
