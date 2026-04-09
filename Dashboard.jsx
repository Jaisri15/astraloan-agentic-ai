// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, LayoutDashboard, FileText, UserCircle, Landmark, PlusCircle } from 'lucide-react';

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // For simplicity without a DB, just load the last application from localStorage into an array
    const data = localStorage.getItem('lastApplication');
    if (data) {
      setApplications([JSON.parse(data)]);
    }
  }, []);

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        
        {/* Sidebar Navigation */}
        <aside className="glass-card" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <Activity color="#8b5cf6" size={24} />
            <h3 className="text-glow" style={{ margin: 0, fontSize: '1.2rem' }}>User Panel</h3>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/dashboard" className="btn btn-secondary" style={{ justifyContent: 'flex-start', background: 'rgba(139,92,246,0.1)', borderColor: 'var(--primary-purple)' }}>
              <LayoutDashboard size={18} />
              Overview
            </Link>
            <Link to="/profile-setup" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none' }}>
              <UserCircle size={18} />
              Edit Profile
            </Link>
            <Link to="/compare" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none' }}>
              <Landmark size={18} />
              Loan Comparison
            </Link>
            <Link to="/intelligence" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none' }}>
              <Activity size={18} />
              Borrower Intel
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 className="text-glow">Applicant Dashboard</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => navigate('/compare')}>Compare Offers</button>
              <button className="btn btn-primary" onClick={() => navigate('/apply')}>
                <PlusCircle size={18} />
                Apply New Loan
              </button>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <FileText size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
              <p>No prior loan applications found.</p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>Start Application</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {applications.map((app, index) => (
                <div key={index} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ color: 'var(--primary-glow)', marginBottom: '0.25rem' }}>{app.id}</h3>
                    <p style={{ margin: 0 }}>
                      Submitted: {app.date} <br />
                      Amount: <strong>${parseFloat(app.loanAmount).toLocaleString()}</strong> | Purpose: {app.loanPurpose.charAt(0).toUpperCase() + app.loanPurpose.slice(1)}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span className={`status-badge status-${app.result.statusId}`} style={{ marginBottom: '0.5rem' }}>
                        {app.result.decision}
                      </span>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Risk Score: <strong style={{ color: 'var(--text-main)' }}>{app.result.score}</strong></p>
                    </div>
                    <button className="btn btn-secondary" onClick={() => navigate('/decision')}>
                      View Full Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
