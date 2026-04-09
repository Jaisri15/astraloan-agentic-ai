// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Activity } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    
    // Simulate signup
    localStorage.setItem('userEmail', formData.email);
    // Initialize empty profile
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userBank');
    localStorage.removeItem('lastApplication');
    
    navigate('/profile-setup');
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', textAlign: 'center', position: 'relative' }}>
        <div className="floating-icon">
          <UserPlus color="#c084fc" size={32} />
        </div>
        
        <h2 className="text-gradient" style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>Create Account</h2>
        <p style={{ marginBottom: '2rem' }}>Register to access the Agentic AI Platform.</p>

        <form onSubmit={handleSignup} style={{ textAlign: 'left' }}>
          {error && <div style={{ color: 'var(--reject)', marginBottom: '1rem', fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}
          
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              required 
              type="email" 
              name="email"
              className="input-field" 
              placeholder="agent@ai.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label className="input-label">Password</label>
            <input 
              required 
              type="password" 
              name="password"
              className="input-field" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label className="input-label">Confirm Password</label>
            <input 
              required 
              type="password" 
              name="confirmPassword"
              className="input-field" 
              placeholder="••••••••" 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            <Activity size={18} /> Generate AI Profile
          </button>
          
          <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
            <Link to="/" className="nav-link" style={{ color: 'var(--primary-glow)' }}>Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
