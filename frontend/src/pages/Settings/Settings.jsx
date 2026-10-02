import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import useAuth from '../../hooks/useAuth';
import { changePassword, updateProfile } from '../../services/authService';

export default function Settings() {
  const { user, refreshUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    full_name: user?.full_name || '',
    college: user?.college || '',
    department: user?.department || '',
    year: user?.year || '',
    learning_goal: user?.learning_goal || '',
  });
  const [passwords, setPasswords] = useState({ current_password: '', new_password: '' });
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const saveProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await updateProfile(profile);
      await refreshUser();
      setMessage('Profile updated successfully.');
    } catch {
      setError('Failed to update profile.');
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await changePassword(passwords);
      setPasswords({ current_password: '', new_password: '' });
      setMessage('Password changed successfully.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to change password.');
    }
  };

  return (
    <MainLayout>
      <h1 className="section-title">Settings</h1>
      <p className="section-subtitle">Manage your profile, password, and preferences.</p>

      {message && <p style={{ color: '#059669', textAlign: 'center', marginBottom: 16, fontWeight: 600 }}>{message}</p>}
      {error && <p className="error-text" style={{ textAlign: 'center' }}>{error}</p>}

      <div className="grid-2">
        <Card>
          <h3 style={{ marginBottom: 16 }}>Profile</h3>
          <form onSubmit={saveProfile}>
            <Input label="Full Name" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} />
            <Input label="College" value={profile.college} onChange={(e) => setProfile({ ...profile, college: e.target.value })} />
            <Input label="Department" value={profile.department} onChange={(e) => setProfile({ ...profile, department: e.target.value })} />
            <Input label="Year" value={profile.year} onChange={(e) => setProfile({ ...profile, year: e.target.value })} />
            <Input label="Learning Goal" placeholder="e.g. Become a Full Stack Developer" value={profile.learning_goal} onChange={(e) => setProfile({ ...profile, learning_goal: e.target.value })} />
            <Button type="submit">Save Profile</Button>
          </form>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Card>
            <h3 style={{ marginBottom: 16 }}>Password</h3>
            <form onSubmit={savePassword}>
              <Input label="Current Password" type="password" value={passwords.current_password} onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })} required minLength={6} />
              <Input label="New Password" type="password" value={passwords.new_password} onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })} required minLength={6} />
              <Button type="submit">Change Password</Button>
            </form>
          </Card>

          <Card>
            <h3 style={{ marginBottom: 16 }}>Preferences</h3>
            <div className="field">
              <label>Notifications</label>
              <select value={notifications ? 'on' : 'off'} onChange={(e) => setNotifications(e.target.value === 'on')}>
                <option value="on">Enabled</option>
                <option value="off">Disabled</option>
              </select>
            </div>
            <div className="field">
              <label>Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
              </select>
            </div>
            <div className="field">
              <label>Theme</label>
              <select value="light" disabled>
                <option value="light">Light (default)</option>
              </select>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Logout
            </Button>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
