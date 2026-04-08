import React from 'react';
import { Link } from 'react-router-dom';

const VALUES = [
  { icon: '🔒', title: 'Trust & Safety', desc: 'All technicians are background-verified and trained professionals.' },
  { icon: '⚡', title: 'Speed', desc: 'Book a service in under 2 minutes. Get help within the same day.' },
  { icon: '💯', title: 'Quality', desc: '30-day service warranty on all jobs. 100% satisfaction guaranteed.' },
  { icon: '💰', title: 'Fair Pricing', desc: 'Transparent pricing with no hidden charges. Pay only what you see.' },
  { icon: '🌍', title: 'Pan-India', desc: 'Operating in 50+ cities across India and expanding every month.' },
  { icon: '📱', title: 'Tech-Driven', desc: 'Real-time tracking, smart scheduling and instant notifications.' },
];

const About = () => (
  <div className="about-page">
    <div className="page-header">
      <div className="container">
        <h1>About FixItPro</h1>
        <p>India's most trusted local service marketplace</p>
      </div>
    </div>

    <div className="container">
      {/* Mission */}
      <section className="about-section">
        <div className="about-grid">
          <div>
            <h2 className="section-title">Our Mission</h2>
            <p style={{color:'var(--text-muted)', lineHeight:'1.9', fontSize:'1.05rem', marginBottom:'20px'}}>
              FixItPro was founded in 2020 with a single vision — to make quality home services accessible,
              affordable, and stress-free for every Indian household.
            </p>
            <p style={{color:'var(--text-muted)', lineHeight:'1.9', marginBottom:'28px'}}>
              We connect skilled, verified professionals with homeowners in need of plumbing, electrical,
              HVAC, cleaning, and 10+ other services — all with real-time tracking and a 30-day service guarantee.
            </p>
            <div className="mission-stats">
              {[['2020', 'Founded'], ['50+', 'Cities'], ['1200+', 'Technicians'], ['50K+', 'Customers']].map(([v,l]) => (
                <div className="m-stat" key={l}>
                  <strong>{v}</strong><span>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual">
            <div className="about-emoji-grid">
              {['🔧','⚡','❄️','🧹','🎨','🪚','💧','📦'].map((e,i) => (
                <div key={i} className="ae-box">{e}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section">
        <div className="section-header" style={{textAlign:'center', marginBottom:'48px'}}>
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">What drives us every single day</p>
        </div>
        <div className="grid-3">
          {VALUES.map((v,i) => (
            <div className="card" key={i}>
              <div style={{fontSize:'2rem', marginBottom:'12px'}}>{v.icon}</div>
              <h3 style={{marginBottom:'8px', fontSize:'1.05rem'}}>{v.title}</h3>
              <p style={{color:'var(--text-muted)', fontSize:'0.9rem', lineHeight:'1.7'}}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{paddingBottom:'80px', textAlign:'center'}}>
        <div style={{background:'linear-gradient(135deg,rgba(37,99,235,0.07),rgba(6,182,212,0.08))', border:'1px solid var(--border)', borderRadius:'24px', padding:'60px 40px'}}>
          <h2 style={{fontSize:'2rem', marginBottom:'12px'}}>Ready to experience FixItPro?</h2>
          <p style={{color:'var(--text-muted)', marginBottom:'28px'}}>Join 50,000+ happy customers across India</p>
          <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap'}}>
            <Link to="/services" className="btn btn-primary">Book a Service</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>

    <style>{`
      .about-page {}
      .page-header { padding: 120px 0 60px; background: var(--gradient-hero); }
      .page-header h1 { font-size: 3rem; margin-bottom: 12px; }
      .page-header p { color: var(--text-muted); font-size: 1.1rem; }
      .about-section { padding: 80px 0; border-bottom: 1px solid var(--border); }
      .about-section:last-child { border-bottom: none; }
      .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
      .mission-stats { display: flex; gap: 32px; flex-wrap: wrap; }
      .m-stat { display: flex; flex-direction: column; gap: 4px; }
      .m-stat strong { font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; color: var(--primary); }
      .m-stat span { color: var(--text-muted); font-size: 0.85rem; }
      .about-visual { display: flex; align-items: center; justify-content: center; }
      .about-emoji-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
      .ae-box {
        width: 70px; height: 70px;
        background: rgba(99,102,241,0.08);
        border: 1px solid var(--border);
        border-radius: 16px;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.8rem;
        transition: all 0.3s;
      }
      .ae-box:hover { background: rgba(99,102,241,0.18); transform: scale(1.1); border-color: var(--primary); }
      @media (max-width: 768px) {
        .about-grid { grid-template-columns: 1fr; }
        .about-visual { display: none; }
      }
    `}</style>
  </div>
);

export default About;
