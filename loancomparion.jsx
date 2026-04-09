// src/pages/LoanComparison.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, ArrowRight, Activity } from 'lucide-react';

export default function LoanComparison() {
  const navigate = useNavigate();
  const [bankData, setBankData] = useState({});
  const [requestedAmount, setRequestedAmount] = useState(25000);

  useEffect(() => {
    const bank = localStorage.getItem('userBank');
    if (bank) {
      setBankData(JSON.parse(bank));
    }
  }, []);

  const offers = [
    {
      bank: bankData.bankName || 'Your Primary Bank',
      interest: 7.5,
      tenure: 36, // months
      approvalProb: 92,
      emi: ((requestedAmount * (7.5/100/12) * Math.pow(1 + 7.5/100/12, 36)) / (Math.pow(1 + 7.5/100/12, 36) - 1)).toFixed(2)
    },
    {
      bank: 'NeoTech Finance',
      interest: 6.2,
      tenure: 48,
      approvalProb: 75,
      emi: ((requestedAmount * (6.2/100/12) * Math.pow(1 + 6.2/100/12, 48)) / (Math.pow(1 + 6.2/100/12, 48) - 1)).toFixed(2)
    },
    {
      bank: 'Global Secure Bank',
      interest: 8.1,
      tenure: 24,
      approvalProb: 98,
      emi: ((requestedAmount * (8.1/100/12) * Math.pow(1 + 8.1/100/12, 24)) / (Math.pow(1 + 8.1/100/12, 24) - 1)).toFixed(2)
    }
  ];

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="text-glow">Loan Comparison Module</h2>
          <p>AI generated loan offers based on your vault data and risk profile.</p>
        </div>
        <div>
          <label className="input-label" style={{ display: 'inline-block', marginRight: '1rem' }}>Adjust Base Loan ($)</label>
          <input type="number" className="input-field" value={requestedAmount} onChange={(e) => setRequestedAmount(Number(e.target.value) || 0)} style={{ width: '150px' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {offers.map((offer, i) => (
          <div key={i} className="glass-card" style={{ border: i === 0 ? '1px solid var(--primary-glow)' : '' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <Landmark color={i === 0 ? "var(--primary-glow)" : "var(--text-muted)"} size={32} />
              <h3 style={{ margin: 0, color: i === 0 ? 'var(--primary-glow)' : 'white' }}>{offer.bank}</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Interest Rate</span><br /><span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{offer.interest}%</span></div>
              <div><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tenure</span><br /><span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{offer.tenure} mo</span></div>
              <div><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Est. EMI</span><br /><span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--review)' }}>${offer.emi}</span></div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>AI Approval Prob.</span><br />
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: offer.approvalProb > 80 ? 'var(--success)' : 'var(--review)' }}>{offer.approvalProb}%</span>
              </div>
            </div>
            
            <button className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              Apply Now <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
