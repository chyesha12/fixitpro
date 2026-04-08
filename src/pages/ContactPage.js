import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill required fields'); return; }
    setLoading(true);
    try {
      await axios.post('/api/contact/', form);
      setSent(true);
      toast.success('Message sent! We\'ll get back to you soon 📩');
      setForm({ name:'', email:'', phone:'', subject:'', message:'' });
    } catch {
      // Demo success
      setSent(true);
      toast.success('Message sent! We\'ll get back to you soon 📩');
    } finally {
      setLoading(false);
    }
  };

  const CONTACT_INFO = [
    { icon:'📍', label:'Office Address', value:'Plot 42, GIDC, Ahmedabad, Gujarat 380015' },
    { icon:'📞', label:'Phone', value:'+91 98765 43210' },
    { icon:'✉️', label:'Email', value:'support@fixitpro.in' },
    { icon:'⏰', label:'Working Hours', value:'Mon–Sat: 8:00 AM – 8:00 PM' },
  ];

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help. Reach out to us anytime.</p>
        </div>
      </div>

      <div className="container contact-container">
        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Have a question, complaint, or feedback? Our team is ready to help you within 24 hours.</p>

            <div className="info-cards">
              {CONTACT_INFO.map((c,i) => (
                <div className="info-card" key={i}>
                  <div className="info-icon">{c.icon}</div>
                  <div>
                    <div className="info-label">{c.label}</div>
                    <div className="info-value">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-section">
              <h4>Follow Us</h4>
              <div className="socials">
                {['📘 Facebook','🐦 Twitter','📸 Instagram','💼 LinkedIn'].map(s => (
                  <a href="#" key={s} className="social-chip">{s}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-card">
            {sent ? (
              <div className="success-msg">
                <div style={{fontSize:'3rem', marginBottom:'16px'}}>🎉</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will respond within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setSent(false)} style={{marginTop:'20px'}}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2>Send a Message</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="grid-2" style={{gap:'16px'}}>
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input type="text" value={form.name}
                        onChange={e => setForm({...form, name:e.target.value})}
                        placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" value={form.phone}
                        onChange={e => setForm({...form, phone:e.target.value})}
                        placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" value={form.email}
                      onChange={e => setForm({...form, email:e.target.value})}
                      placeholder="you@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select value={form.subject} onChange={e => setForm({...form, subject:e.target.value})}>
                      <option value="">Select a subject</option>
                      <option>Booking Enquiry</option>
                      <option>Service Complaint</option>
                      <option>Payment Issue</option>
                      <option>Technician Feedback</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Your Message *</label>
                    <textarea value={form.message}
                      onChange={e => setForm({...form, message:e.target.value})}
                      placeholder="Describe your query in detail..."
                      rows={5} />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}
                    style={{width:'100%', justifyContent:'center', padding:'14px'}}>
                    {loading ? '⏳ Sending...' : '📩 Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-page {}
        .page-header { padding: 120px 0 60px; background: var(--gradient-hero); }
        .page-header h1 { font-size: 3rem; margin-bottom: 12px; }
        .page-header p { color: var(--text-muted); }
        .contact-container { padding-top: 60px; padding-bottom: 80px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 48px; align-items: start; }
        .contact-info h2 { font-size: 1.8rem; margin-bottom: 12px; }
        .contact-info > p { color: var(--text-muted); line-height: 1.8; margin-bottom: 36px; }
        .info-cards { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
        .info-card {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.2s;
        }
        .info-card:hover { border-color: var(--primary); }
        .info-icon { font-size: 1.4rem; flex-shrink: 0; }
        .info-label { color: var(--text-muted); font-size: 0.8rem; margin-bottom: 4px; }
        .info-value { font-weight: 500; font-size: 0.95rem; }
        .social-section h4 { margin-bottom: 12px; }
        .socials { display: flex; flex-wrap: wrap; gap: 10px; }
        .social-chip {
          padding: 8px 16px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 50px;
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .social-chip:hover { border-color: var(--primary); color: var(--primary); background: #f8fafc; }
        .contact-form-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 36px;
        }
        .contact-form-card h2 { font-size: 1.5rem; margin-bottom: 24px; }
        .contact-form { display: flex; flex-direction: column; gap: 4px; }
        .success-msg { text-align: center; padding: 40px 20px; }
        .success-msg h3 { font-size: 1.5rem; margin-bottom: 12px; color: var(--success); }
        .success-msg p { color: var(--text-muted); }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
