// src/pages/ApplicationForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Zap } from 'lucide-react';
import { calculateRisk } from '../utils/underwritingEngine';

export default function ApplicationForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [ocrData, setOcrData] = useState(null);
  const [bankDataLocal, setBankDataLocal] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    creditScore: '',
    monthlyIncome: '',
    monthlyDebt: '',
    age: '',
    employmentType: 'full-time',
    loanAmount: '',
    loanPurpose: 'home'
  });

  useEffect(() => {
    // Auto-fill from previous steps
    const profileData = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const bankData = JSON.parse(localStorage.getItem('userBank') || '{}');
    setBankDataLocal(bankData);
    
    // Calculate age from dob
    let ageCalc = '';
    if (profileData.dob) {
      const birthDate = new Date(profileData.dob);
      const today = new Date();
      ageCalc = today.getFullYear() - birthDate.getFullYear();
    }

    // Default debt from EMI if loans exist
    let defaultDebt = 0;
    if (bankData.hasLoans === 'yes' && bankData.emi) {
      defaultDebt = bankData.emi;
    }

    setFormData(prev => ({
      ...prev,
      name: profileData.fullName || '',
      email: profileData.email || '',
      phone: profileData.phone || '',
      monthlyIncome: profileData.annualIncome ? String(Math.round(Number(profileData.annualIncome) / 12)) : '',
      employmentType: profileData.employmentType || 'full-time',
      age: ageCalc.toString(),
      monthlyDebt: defaultDebt > 0 ? String(defaultDebt) : ''
    }));
  }, []);

  const evaluateSuggestions = (name, value, currentData) => {
    if (name === 'loanAmount') {
      const inc = Number(currentData.monthlyIncome);
      const amt = Number(value);
      if (inc > 0 && amt > inc * 15) {
        setAiSuggestion('AI Suggestion: Consider reducing the requested amount by 20% to significantly lower your rejection risk.');
      } else {
        setAiSuggestion('');
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadStatus('Scanning document with AI OCR...');
    setAiSuggestion('AI analyzing document authenticity and extracting features...');
    
    setTimeout(() => {
      // Simulate OCR Extraction
      const isMismatch = formData.monthlyIncome && Math.random() > 0.7; // 30% chance to simulate fraud warning
      setOcrData({
        extractedIncome: isMismatch ? Number(formData.monthlyIncome) * 0.8 : Number(formData.monthlyIncome) || 4500,
        authenticityScore: isMismatch ? 65 : 98,
        mismatch: isMismatch
      });
      
      setUploadStatus('Document verification complete.');
      if (isMismatch) {
        setAiSuggestion('⚠️ Fraud Warning: The income on the document seems 20% lower than stated. Please verify your pay slips.');
      } else {
        setAiSuggestion('✅ Document confirmed. Income details match the extracted payslip data.');
      }
    }, 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    evaluateSuggestions(name, value, newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Agentic AI processing delay
    setTimeout(() => {
      const payload = {
        ...formData,
        ocrData: ocrData || { authenticityScore: 50, mismatch: true },
        bankData: bankDataLocal
      };
      const result = calculateRisk(payload);
      
      const applicationRecord = {
        id: "APP-" + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleDateString(),
        ...formData,
        result
      };

      // Save to localStorage
      localStorage.setItem('lastApplication', JSON.stringify(applicationRecord));
      
      setLoading(false);
      navigate('/decision');
    }, 2000);
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '2rem' }}>
        
        {/* Left Side: Form */}
        <div className="glass-card">
          <h2 className="text-gradient">Loan Application</h2>
          <p style={{ marginBottom: '2rem' }}>Final step: Provide details for your desired loan. We've auto-filled data from your profile.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Full Name</label>
                <input required type="text" name="name" className="input-field" value={formData.name} readOnly style={{ opacity: 0.7 }} />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Credit Score</label>
                <input required type="number" min="300" max="850" name="creditScore" className="input-field" onChange={handleChange} value={formData.creditScore} placeholder="e.g. 720" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Age</label>
                <input required type="number" name="age" className="input-field" onChange={handleChange} value={formData.age} readOnly style={{ opacity: 0.7 }} />
              </div>
               <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Employment Type</label>
                <select name="employmentType" className="input-field" onChange={handleChange} value={formData.employmentType}>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="unemployed">Unemployed</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Monthly Income ($)</label>
                <input required type="number" name="monthlyIncome" className="input-field" onChange={handleChange} value={formData.monthlyIncome} placeholder="5000" />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Monthly Debt ($)</label>
                <input required type="number" name="monthlyDebt" className="input-field" onChange={handleChange} value={formData.monthlyDebt} placeholder="1200" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
               <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Loan Purpose</label>
                <select name="loanPurpose" className="input-field" onChange={handleChange} value={formData.loanPurpose}>
                  <option value="home">Home</option>
                  <option value="auto">Auto</option>
                  <option value="education">Education</option>
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                </select>
              </div>
               <div className="input-group" style={{ flex: 1 }}>
                <label className="input-label">Loan Amount Requested ($)</label>
                <input required type="number" name="loanAmount" className="input-field" onChange={handleChange} value={formData.loanAmount} placeholder="25000" />
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px dashed var(--primary-purple)', background: 'rgba(139,92,246,0.05)' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Smart Document Upload</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Upload ID, Payslips, or Bank Statements. Our Agentic OCR will parse the text and validate data integrity automatically.</p>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                  Choose File
                  <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} accept=".pdf,.png,.jpg,.jpeg" />
                </label>
                <span style={{ fontSize: '0.9rem', color: ocrData?.mismatch ? 'var(--reject)' : 'var(--primary-glow)' }}>
                  {uploadStatus || 'No document uploaded yet'}
                </span>
              </div>
              
              {ocrData && (
                <div className="animate-fade-in" style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div><strong>Extracted Income:</strong> ${ocrData.extractedIncome}/mo</div>
                    <div><strong>Authenticity Score:</strong> {ocrData.authenticityScore}/100</div>
                  </div>
                  {ocrData.mismatch && (
                    <div style={{ marginTop: '0.5rem', color: 'var(--reject)' }}>Data validation layer flagged anomalies. Check corrections before continuing.</div>
                  )}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} disabled={loading}>
              {loading ? 'Processing...' : 'Evaluate Loan Application'}
            </button>
          </form>
        </div>

        {/* Right Side: AI Panel */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
           <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid var(--primary-purple)', boxShadow: '0 0 30px rgba(139, 92, 246, 0.15)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                 <div className={loading ? "floating-icon" : ""} style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '0.75rem', borderRadius: '50%' }}>
                    <Activity color="#c084fc" size={28} />
                 </div>
                 <div>
                    <h3 style={{ margin: 0 }}>AI Underwriting Matrix</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>{loading ? "AI Analyzing..." : "Ready for analysis"}</p>
                 </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                      <Zap size={16} color="var(--review)" />
                      Smart Suggestions
                    </h4>
                    {aiSuggestion ? (
                      <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {aiSuggestion}
                      </p>
                    ) : (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Fill in forms. Based on your inputs, the AI will dynamically offer real-time loan structure optimizations here.
                      </p>
                    )}
                 </div>

                 {loading && (
                   <div className="animate-fade-in" style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                       <span style={{ fontSize: '0.85rem' }}>Evaluating DTI...</span>
                       <span style={{ fontSize: '0.85rem', color: 'var(--primary-glow)' }}>Loading</span>
                     </div>
                     <div style={{ height: '4px', background: 'var(--bg-dark)', borderRadius: '2px', overflow: 'hidden' }}>
                       <div style={{ height: '100%', background: 'var(--primary-glow)', animation: 'progress 2s infinite' }}></div>
                     </div>
                   </div>
                 )}
              </div>
           </div>
        </div>

      </div>
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
