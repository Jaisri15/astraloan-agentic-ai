// src/pages/ProfileSetup.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    gender: 'male',
    address: '',
    city: '',
    state: '',
    country: '',
    nationalId: '',
    annualIncome: '',
    employmentType: 'full-time'
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setFormData(prev => ({ ...prev, ...JSON.parse(savedProfile) }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(formData));
    navigate('/bank-details');
  };

  const calculateHealth = () => {
    let score = 0;
    if (formData.fullName) score += 10;
    if (formData.email) score += 10;
    if (formData.phone) score += 10;
    if (formData.address) score += 10;
    if (formData.nationalId) score += 20;
    if (formData.annualIncome && Number(formData.annualIncome) > 0) score += 30;
    if (formData.employmentType !== 'unemployed') score += 10;
    return score;
  };

  const healthScore = calculateHealth();

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 className="text-gradient">Personal Profile Setup</h2>
            <p style={{ marginBottom: '2rem' }}>Please enter your personal details to build your AI profile.</p>
          </div>
          <div style={{ textAlign: 'right', width: '200px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Financial Profile Health</div>
            <div style={{ height: '8px', background: 'var(--bg-dark)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${healthScore}%`, background: healthScore > 70 ? 'var(--success)' : healthScore > 40 ? 'var(--review)' : 'var(--reject)', transition: 'width 0.5s ease, background 0.5s ease' }}></div>
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: 'var(--primary-glow)' }}>{healthScore}% Complete</div>
          </div>
        </div>

        <form onSubmit={handleContinue}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input required type="text" name="fullName" className="input-field" value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
            </div>
            <div className="input-group">
              <label className="input-label">Email (Auto-filled)</label>
              <input required type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} readOnly style={{ opacity: 0.7, cursor: 'not-allowed' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
             <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input required type="tel" name="phone" className="input-field" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
            </div>
            <div className="input-group">
              <label className="input-label">Date of Birth</label>
              <input required type="date" name="dob" className="input-field" value={formData.dob} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Gender</label>
              <select name="gender" className="input-field" value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Address</label>
            <input required type="text" name="address" className="input-field" value={formData.address} onChange={handleChange} placeholder="123 AI Street" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="input-group">
              <label className="input-label">City</label>
              <input required type="text" name="city" className="input-field" value={formData.city} onChange={handleChange} placeholder="New York" />
            </div>
            <div className="input-group">
              <label className="input-label">State</label>
              <input required type="text" name="state" className="input-field" value={formData.state} onChange={handleChange} placeholder="NY" />
            </div>
            <div className="input-group">
              <label className="input-label">Country</label>
              <input required type="text" name="country" className="input-field" value={formData.country} onChange={handleChange} placeholder="USA" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div className="input-group">
              <label className="input-label">National ID / SSN</label>
              <input required type="text" name="nationalId" className="input-field" value={formData.nationalId} onChange={handleChange} placeholder="XXX-XX-XXXX" />
            </div>
            <div className="input-group">
              <label className="input-label">Annual Income ($)</label>
              <input required type="number" name="annualIncome" className="input-field" value={formData.annualIncome} onChange={handleChange} placeholder="120000" />
            </div>
            <div className="input-group">
              <label className="input-label">Employment Type</label>
              <select name="employmentType" className="input-field" value={formData.employmentType} onChange={handleChange}>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="self-employed">Self Employed</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
            Save & Continue to Bank Details
          </button>
        </form>
      </div>
    </div>
  );
}
