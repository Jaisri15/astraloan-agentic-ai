// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';
import BankDetails from './pages/BankDetails';
import ApplicationForm from './pages/ApplicationForm';
import Decision from './pages/Decision';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import LoanComparison from './pages/LoanComparison';
import BorrowerIntelligence from './pages/BorrowerIntelligence';
import Chatbot from './components/Chatbot';
import { Bell } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <Router>
      <header className="app-header">
        <div className="container header-container">
          <Link to="/" className="logo text-glow">
            <Activity color="#8b5cf6" size={28} />
            Agentic AI Auto-Underwriter
          </Link>
          <nav className="nav-links" style={{ alignItems: 'center' }}>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/settings" className="nav-link">Settings</Link>
            <div style={{ position: 'relative' }}>
               <button onClick={() => setShowNotifs(!showNotifs)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', position: 'relative' }}>
                  <Bell size={20} className="nav-link" />
                  <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--reject)', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>1</span>
               </button>
               {showNotifs && (
                 <div className="glass-card animate-fade-in" style={{ position: 'absolute', right: 0, top: '2.5rem', width: '300px', padding: '1rem', zIndex: 100 }}>
                   <h4 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', margin: '0 0 1rem 0' }}>Notifications</h4>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     <div style={{ background: 'rgba(245, 158, 11, 0.1)', borderLeft: '3px solid var(--review)', padding: '0.5rem' }}>
                       <p style={{ margin: 0, fontSize: '0.85rem' }}>Your recent application #APP-1234 requires a W-2 upload.</p>
                     </div>
                   </div>
                 </div>
               )}
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/bank-details" element={<BankDetails />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/decision" element={<Decision />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/compare" element={<LoanComparison />} />
          <Route path="/intelligence" element={<BorrowerIntelligence />} />
        </Routes>
      </main>
      <Chatbot />
    </Router>
  );
}

export default App;
