// src/pages/Settings.jsx
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

export default function Settings() {
  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="text-gradient">Data Privacy & Security Settings</h2>
        <p style={{ marginBottom: '2rem' }}>We take your privacy seriously. Here is how your data is managed and encrypted on our platform.</p>

        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
          <button className="btn btn-secondary">Toggle Dark Mode</button>
          <button className="btn btn-secondary" style={{ borderColor: 'var(--success)', color: 'var(--success)' }}>Enable Auto Bank Sync</button>
          <button className="btn btn-secondary" style={{ borderColor: 'var(--review)', color: 'var(--review)' }}>Logout</button>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Lock color="var(--primary-glow)" size={32} />
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>End-to-End Encryption</h3>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>All your personal identity and financial data is encrypted at rest using AES-256 and in transit via TLS 1.3.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Shield color="var(--success)" size={32} />
            <div>
               <h3 style={{ margin: '0 0 0.5rem 0' }}>AI Bias & Fair Lending</h3>
               <p style={{ margin: 0, fontSize: '0.95rem' }}>Our models are regularly audited to prevent discrimination. Your demographic inputs do not negatively influence the weighted risk score.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Eye color="var(--review)" size={32} />
            <div>
               <h3 style={{ margin: '0 0 0.5rem 0' }}>User Data Rights</h3>
               <p style={{ margin: 0, fontSize: '0.95rem' }}>You reserve the absolute right to view or wipe your application history from our databases instantly under GDRP/CCPA regulations.</p>
            </div>
          </div>
        </div>

        <button className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', borderColor: 'var(--reject)', color: 'var(--reject)' }}>
          Wipe My Data Permanently
        </button>
      </div>
    </div>
  );
}
