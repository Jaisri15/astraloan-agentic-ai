// src/pages/Decision.jsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function Decision() {
  const [appData, setAppData] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [bankData, setBankData] = useState({});
  const navigate = useNavigate();
  const reportRef = useRef();

  useEffect(() => {
    const data = localStorage.getItem('lastApplication');
    const profile = localStorage.getItem('userProfile');
    const bank = localStorage.getItem('userBank');

    if (data) setAppData(JSON.parse(data));
    if (profile) setProfileData(JSON.parse(profile));
    if (bank) setBankData(JSON.parse(bank));
    
    if (!data) navigate('/');
  }, [navigate]);

  const downloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;
    
    // Check if device is desktop or we should zoom out essentially
    const canvas = await html2canvas(element, { scale: 1.5, useCORS: true, backgroundColor: '#09090b' });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    // Add some padding to PDF
    const margin = 10;
    const contentWidth = pdfWidth - 2 * margin;
    const pdfHeight = (canvas.height * contentWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, pdfHeight);
    pdf.save(`Underwriting_Report_${appData.id}.pdf`);
  };

  if (!appData) return <div className="container">Loading...</div>;

  const { result } = appData;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="text-glow">Decision Results</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>View Dashboard</button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>Apply Again</button>
          <button className="btn btn-primary" onClick={downloadPDF}>Download PDF Report</button>
        </div>
      </div>

      <div ref={reportRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', borderRadius: '16px', background: 'var(--bg-dark)' }}>
        
        {/* Top Header Card */}
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)' }}>
          <div>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Application ID: {appData.id}</h3>
            <h1 className="text-gradient" style={{ margin: 0 }}>{result.decision}</h1>
            <p style={{ marginTop: '0.5rem' }}>Calculated on: {new Date().toLocaleString()}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `6px solid var(--${result.statusId === 'approved' ? 'success' : result.statusId === 'review' ? 'review' : 'reject'})`,
              fontSize: '2rem', fontWeight: 'bold'
            }}>
              {result.score}
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Risk Score</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
          {/* User Profile Summary */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--primary-glow)' }}>Applicant Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Name:</span> <br/>{profileData.fullName || appData.name}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Email:</span> <br/>{profileData.email || appData.email}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Phone:</span> <br/>{profileData.phone || appData.phone}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Age:</span> <br/>{appData.age} Years</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Income:</span> <br/>${profileData.annualIncome}/year</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Employment:</span> <br/>{appData.employmentType}</div>
            </div>
          </div>

          {/* Bank & Loan Summary */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--primary-glow)' }}>Financial Request</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Bank Name:</span> <br/>{bankData.bankName || 'N/A'}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Account No:</span> <br/>{bankData.accountNumber ? `****${bankData.accountNumber.slice(-4)}` : 'N/A'}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Req. Amount:</span> <br/>${appData.loanAmount}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Purpose:</span> <br/>{appData.loanPurpose}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Monthly Debt:</span> <br/>${appData.monthlyDebt}</div>
              <div><span style={{ color: 'var(--text-muted)' }}>Credit Score:</span> <br/>{appData.creditScore}</div>
            </div>
          </div>
        </div>

        {/* XAI Explanations */}
        <div>
          <h3>Explainable AI (XAI) Insights</h3>
          <p style={{ marginBottom: '1.5rem' }}>Our agentic model calculated your score based on the following factors:</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
            {result.explanations.map((exp, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                <span className={`status-badge status-${exp.type === 'positive' ? 'approved' : exp.type === 'negative' ? 'rejected' : 'review'}`} style={{ marginBottom: '1rem' }}>
                  {exp.factor}
                </span>
                <p style={{ color: 'white', marginTop: '0.5rem', fontSize: '0.9rem', lineHeight: 1.5 }}>{exp.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action */}
        <div className="glass-card" style={{ borderColor: 'rgba(139, 92, 246, 0.4)' }}>
          <h3 className="text-glow">Agent Recommendation</h3>
          <p style={{ color: 'white', marginTop: '1rem', fontSize: '1.1rem' }}>{result.recommendation}</p>
        </div>

      </div>
    </div>
  );
}
