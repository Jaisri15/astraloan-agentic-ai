// src/pages/BorrowerIntelligence.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, TrendingUp, AlertTriangle, BatteryCharging } from 'lucide-react';

export default function BorrowerIntelligence() {
  const [profile, setProfile] = useState({});
  const [income, setIncome] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('userProfile');
    if (data) {
      const p = JSON.parse(data);
      setProfile(p);
      setIncome((Number(p.annualIncome) || 60000) / 12);
    } else {
      setIncome(5000); // Default to 5000/mo
    }
  }, []);

  const dti = (1200 / income) * 100; // Mock 1200 monthly debt
  const safeDti = 35; // %
  const currentDtiColor = dti > 45 ? 'var(--reject)' : dti > 35 ? 'var(--review)' : 'var(--success)';

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="text-glow">Borrower Intelligence Dashboard</h2>
        <p>AI-driven insights into your financial behavior and repayment capacity.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Chart Card (Simulated) */}
          <div className="glass-card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
             <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Monthly Affordability Forecast</h3>
             <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '2%', paddingBottom: '1rem', borderBottom: '1px solid var(--text-muted)', position: 'relative' }}>
                <span style={{ position: 'absolute', top: 0, left: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Projected Disposable Income</span>
                {[65, 70, 72, 60, 55, 80].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: `linear-gradient(to top, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, ${h/100}))`, height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>M{i+1}</span>
                  </div>
                ))}
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="glass-card">
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-glow)' }}>
                  <TrendingUp size={20} />
                  <h4 style={{ margin: 0 }}>Behavior Insights</h4>
               </div>
               <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                 Your spending velocity indicates a high savings rate. You usually keep 30% of your net income liquid, showing excellent financial discipline.
               </p>
            </div>
            <div className="glass-card">
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--review)' }}>
                  <AlertTriangle size={20} />
                  <h4 style={{ margin: 0 }}>Improvement Tips</h4>
               </div>
               <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                 <li style={{ marginBottom: '0.25rem' }}>Reduce credit card utilization to below 15%.</li>
                 <li>Keep older credit accounts open.</li>
               </ul>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <div className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                 <BatteryCharging color="var(--primary-glow)" size={24} />
                 <h3 style={{ margin: 0 }}>Repayment Capacity</h3>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                   <span>Monthly Income</span>
                   <span>${income.toFixed(0)}</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-dark)', borderRadius: '3px' }}>
                   <div style={{ height: '100%', width: '100%', background: 'var(--primary-glow)', borderRadius: '3px' }}></div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                   <span>Debt to Income (DTI)</span>
                   <span style={{ color: currentDtiColor }}>{dti.toFixed(1)}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-dark)', borderRadius: '3px' }}>
                   <div style={{ height: '100%', width: `${Math.min(dti, 100)}%`, background: currentDtiColor, borderRadius: '3px' }}></div>
                </div>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `3px solid ${currentDtiColor}` }}>
                 <p style={{ fontSize: '0.85rem', margin: 0 }}>
                   Your current DTI is {dti.toFixed(1)}%. {dti > safeDti ? "We recommend reducing your existing obligations to improve loan approval odds." : "This is well within the healthy range of < 35%."}
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
