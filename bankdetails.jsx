// src/pages/BankDetails.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react'; // Placeholder for bank logo

export default function BankDetails() {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  
  const [formData, setFormData] = useState({
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    ifsc: '',
    branch: '',
    linkedMobile: '',
    hasLoans: 'no',
    emi: '',
    loanType: ''
  });

  const [bankInfo, setBankInfo] = useState({ detected: false, name: '' });

  useEffect(() => {
    const savedBank = localStorage.getItem('userBank');
    if (savedBank) {
      setFormData(prev => ({ ...prev, ...JSON.parse(savedBank) }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'ifsc' && value.length >= 4) {
      // Mock Smart bank analyzer / Auto-detect
      setBankInfo({
        detected: true,
        name: 'Global Neo Bank'
      });
      setFormData(prev => ({ ...prev, bankName: 'Global Neo Bank', branch: 'Main City Branch' }));
    } else if (name === 'ifsc' && value.length < 4) {
      setBankInfo({ detected: false, name: '' });
    }
  };

  const handleSendOtp = () => {
    if (formData.linkedMobile.length < 10) {
      alert("Enter a valid mobile number first.");
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otpInput === '1234') {
      setOtpVerified(true);
    } else {
      alert("Invalid OTP! Use 1234 for testing.");
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!otpVerified) {
       alert("Please verify your bank details via OTP first.");
       return;
    }
    if (formData.accountNumber.length < 8) {
      alert("Please enter a valid account number.");
      return;
    }
    localStorage.setItem('userBank', JSON.stringify(formData));
    navigate('/apply');
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="text-gradient">Bank Account Details</h2>
        <p style={{ marginBottom: '2rem' }}>Our Smart Bank Analyzer will try to auto-fetch details from your IFSC/Routing code.</p>

        <form onSubmit={handleContinue}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="input-group">
              <label className="input-label">IFSC / Routing Number</label>
              <input required type="text" name="ifsc" className="input-field" value={formData.ifsc} onChange={handleChange} placeholder="Routing Code" />
            </div>
            {bankInfo.detected && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(139,92,246,0.3)' }}>
                <Building2 color="#c084fc" size={24} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-glow)' }}>Detected Bank</div>
                  <div style={{ fontWeight: 'bold' }}>{bankInfo.name}</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Bank Name</label>
              <input required type="text" name="bankName" className="input-field" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" />
            </div>
            <div className="input-group">
              <label className="input-label">Bank Branch</label>
              <input required type="text" name="branch" className="input-field" value={formData.branch} onChange={handleChange} placeholder="Branch Name" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Account Holder Name</label>
              <input required type="text" name="accountHolder" className="input-field" value={formData.accountHolder} onChange={handleChange} placeholder="John Doe" />
            </div>
            <div className="input-group">
              <label className="input-label">Account Number</label>
              <input required type="text" name="accountNumber" className="input-field" value={formData.accountNumber} onChange={handleChange} placeholder="123456789" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1rem' }}>
            <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="input-label">Linked Mobile Number</label>
              <input required type="tel" name="linkedMobile" className="input-field" value={formData.linkedMobile} onChange={handleChange} placeholder="+1 234 567 8900" disabled={otpVerified} />
            </div>
            {!otpVerified && !otpSent && (
              <button type="button" className="btn btn-secondary" onClick={handleSendOtp}>Send OTP</button>
            )}
            {otpSent && !otpVerified && (
              <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                 <input type="text" className="input-field" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} placeholder="Enter 4-digit OTP" maxLength={4} />
                 <button type="button" className="btn btn-primary" onClick={handleVerifyOtp}>Verify</button>
              </div>
            )}
            {otpVerified && (
              <div style={{ padding: '0.75rem', color: 'var(--success)', fontWeight: 'bold' }}>✓ OTP Verified</div>
            )}
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', marginTop: '1rem', background: 'rgba(255,255,255,0.02)' }}>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label className="input-label">Do you have existing loans?</label>
              <select name="hasLoans" className="input-field" value={formData.hasLoans} onChange={handleChange}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            {formData.hasLoans === 'yes' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="animate-fade-in">
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Monthly EMI ($)</label>
                  <input required type="number" name="emi" className="input-field" value={formData.emi} onChange={handleChange} placeholder="500" />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Loan Type</label>
                  <select name="loanType" className="input-field" value={formData.loanType} onChange={handleChange}>
                    <option value="personal">Personal Loan</option>
                    <option value="auto">Auto Loan</option>
                    <option value="home">Home Loan</option>
                    <option value="education">Education Loan</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
            Continue to Loan Application
          </button>
        </form>
      </div>
    </div>
  );
}
