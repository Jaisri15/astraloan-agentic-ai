// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useBiometrics, setUseBiometrics] = useState(false);
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('userEmail', email);
    navigate('/profile-setup');
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', textAlign: 'center', position: 'relative' }}>
        {/* Floating AI Assistant Icon */}
        <div className="floating-icon">
          <Activity color="#c084fc" size={32} />
        </div>
        
        <h2 className="text-gradient" style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>Welcome Back</h2>
        <p style={{ marginBottom: '2rem' }}>Authenticate to access your Agentic AI Profile.</p>

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              required 
              type="email" 
              className="input-field" 
              placeholder="agent@ai.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label className="input-label">Password</label>
            <input 
              required 
              type="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', fontSize: '0.875rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={useBiometrics} 
                onChange={() => setUseBiometrics(!useBiometrics)} 
                style={{ accentColor: 'var(--primary-glow)' }}
              />
              Enable Biometric Auth
            </label>
            <a href="#" className="nav-link" style={{ color: 'var(--primary-glow)' }}>Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}>
            {useBiometrics ? 'Login Using FaceID / Fingerprint' : 'Login to Workspace'}
          </button>
          
          <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
            <Link to="/signup" className="nav-link" style={{ color: 'var(--primary-glow)' }}>Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
