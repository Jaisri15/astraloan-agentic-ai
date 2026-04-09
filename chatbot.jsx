// src/components/Chatbot.jsx
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI Loan Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput("");
    
    setTimeout(() => {
      let reply = "That's a great question! For specific loan advice, please continue your application.";
      if (input.toLowerCase().includes("interest")) reply = "Our interest rates start dynamically from 5% based on your AI risk score.";
      if (input.toLowerCase().includes("fraud")) reply = "Our platform uses real-time device fingerprinting and pattern analysis to prevent fraud.";
      
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      {isOpen ? (
        <div className="glass-card animate-fade-in" style={{ width: '300px', height: '400px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem', background: 'var(--bg-highlight)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle color="var(--primary-glow)" size={20} />
              <h3 style={{ margin: 0, fontSize: '1rem' }}>AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
               <X size={20} />
            </button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.isBot ? 'flex-start' : 'flex-end', 
                background: msg.isBot ? 'rgba(139, 92, 246, 0.1)' : 'var(--primary-glow)',
                color: msg.isBot ? 'var(--text-main)' : '#000',
                padding: '0.75rem', 
                borderRadius: '8px', 
                maxWidth: '80%',
                fontSize: '0.9rem' 
              }}>
                {msg.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..." 
              style={{ flex: 1, background: 'transparent', border: 'none', padding: '1rem', color: 'var(--text-main)' }}
            />
            <button type="submit" style={{ background: 'transparent', border: 'none', padding: '1rem', color: 'var(--primary-glow)', cursor: 'pointer' }}>
              <Send size={20} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          className="btn btn-primary animate-fade-in" 
          onClick={() => setIsOpen(true)} 
          style={{ width: '60px', height: '60px', borderRadius: '50%', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)' }}
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
}
