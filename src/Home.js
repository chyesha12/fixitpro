import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';

const STATS = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '1,200+', label: 'Expert Technicians' },
  { value: '15+', label: 'Service Categories' },
  { value: '4.8★', label: 'Average Rating' },
];

const HOW_IT_WORKS = [
  { icon: '🔍', step: '01', title: 'Choose a Service', desc: 'Browse from 15+ professional home services tailored to your needs.' },
  { icon: '📅', step: '02', title: 'Book an Appointment', desc: 'Select your preferred date, time and location instantly.' },
  { icon: '👨‍🔧', step: '03', title: 'Expert Arrives', desc: 'A verified technician reaches your doorstep on time.' },
  { icon: '✅', step: '04', title: 'Job Done!', desc: 'Service completed with satisfaction guarantee.' },
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/api/services/').then(res => {
      setServices(res.data.slice(0, 8));
    }).catch(() => {
      // Demo data fallback
      setServices(DEMO_SERVICES.slice(0, 8));
    }).finally(() => setLoading(false));
  }, []);

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb1"></div>
          <div className="hero-orb orb2"></div>
          <div className="hero-grid"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge">🏆 India's #1 Local Service Platform</div>
          <h1 className="hero-title">
            Professional Services<br />
            <span>At Your Doorstep</span>
          </h1>
          <p className="hero-subtitle">
            Connect with verified plumbers, electricians, technicians and more.<br />
            Instant booking. Real-time tracking. 100% satisfaction guaranteed.
          </p>
          <div className="hero-search">
            <input
              type="text"
              placeholder="Search for a service... (e.g. plumbing, AC repair)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary">🔍 Search</button>
          </div>
          <div className="hero-actions">
            <Link to="/services" className="btn btn-primary">Explore All Services</Link>
            <Link to="/about" className="btn btn-outline">How It Works</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Professional solutions for every home need</p>
          </div>
          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : (
            <>
              <div className="services-grid">
                {(searchQuery ? filtered : services).map(s => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
              <div style={{textAlign:'center', marginTop:'40px'}}>
                <Link to="/services" className="btn btn-outline">View All 15 Services →</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Get professional help in 4 simple steps</p>
          </div>
          <div className="how-grid">
            {HOW_IT_WORKS.map((item, i) => (
              <div className="how-card" key={i}>
                <div className="how-step">{item.step}</div>
                <div className="how-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && <div className="how-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Ready to Fix Something?</h2>
              <p>Book a professional service in under 2 minutes. Available 7 days a week.</p>
              <div style={{display:'flex', gap:'16px', flexWrap:'wrap'}}>
                <Link to="/services" className="btn btn-primary">Book a Service</Link>
                <Link to="/contact" className="btn btn-outline">Talk to Us</Link>
              </div>
            </div>
            <div className="cta-visual">🏠</div>
          </div>
        </div>
      </section>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          padding-top: 80px;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: var(--gradient-hero);
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
        }
        .orb1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,255,255,0.3), transparent);
          top: -200px; right: -100px;
        }
        .orb2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(124,58,237,0.3), transparent);
          bottom: -100px; left: -100px;
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,107,53,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding-top: 60px;
          padding-bottom: 80px;
        }
        .hero-badge {
          display: inline-block;
          padding: 8px 20px;
          background: #eff6ff;
          border: 1.5px solid #bfdbfe;
          border-radius: 50px;
          background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 24px;
          animation: fadeInUp 0.6s ease;
        }
        .hero-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          line-height: 1.1;
          margin-bottom: 20px;
          animation: fadeInUp 0.6s ease 0.1s both;
        }
        .hero-title span { background:var(--gradient); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .hero-subtitle {
          color: var(--text-muted);
          font-size: 1.15rem;
          line-height: 1.8;
          margin-bottom: 36px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.6s ease 0.2s both;
        }
        .hero-search {
          display: flex;
          max-width: 560px;
          margin: 0 auto 28px;
          background: rgba(255,255,255,0.9);
          border: 1.5px solid rgba(255,255,255,0.6);
          border-radius: 50px;
          overflow: hidden;
          animation: fadeInUp 0.6s ease 0.3s both;
        }
        .hero-search input {
          flex: 1;
          padding: 16px 24px;
          background: transparent;
          border: none;
          color: var(--text);
          font-size: 0.95rem;
          outline: none;
        }
        .hero-search input::placeholder { color: var(--text-muted); }
        .hero-search .btn { border-radius: 0 50px 50px 0; }
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.6s ease 0.4s both;
        }
        .stats-section {
          background: #f8fafc;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 40px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .stat-card {
          text-align: center;
          padding: 20px;
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          margin-bottom: 4px;
        }
        .stat-label { color: var(--text-muted); font-size: 0.9rem; }
        .section-header { text-align: center; margin-bottom: 48px; }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .how-section { background: #f8fafc; }
        .how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
        }
        .how-card {
          background: #fff;
          border: 1.5px solid rgba(255,255,255,0.6);
          border-radius: var(--radius);
          padding: 32px 24px;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
        }
        .how-card:hover { border-background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; transform: translateY(-4px); }
        .how-step {
          position: absolute;
          top: -14px; left: 50%;
          transform: translateX(-50%);
          background: var(--gradient);
          color: white;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.8rem;
          padding: 4px 14px;
          border-radius: 50px;
        }
        .how-icon {
          font-size: 2.5rem;
          margin: 12px 0 16px;
        }
        .how-card h3 { margin-bottom: 10px; font-size: 1.05rem; }
        .how-card p { color: var(--text-muted); font-size: 0.875rem; line-height: 1.6; }
        .how-arrow {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.5rem;
          background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          z-index: 1;
        }
        .cta-section { padding: 80px 0; }
        .cta-card {
          background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%);
          border: 1.5px solid #bfdbfe;
          border-radius: 24px;
          padding: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .cta-content h2 { font-size: 2.2rem; margin-bottom: 12px; }
        .cta-content p { color: var(--text-muted); font-size: 1.05rem; margin-bottom: 28px; }
        .cta-visual { font-size: 8rem; opacity: 0.6; }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .how-grid { grid-template-columns: repeat(2, 1fr); }
          .how-arrow { display: none; }
          .cta-card { flex-direction: column; text-align: center; padding: 40px 24px; }
          .cta-content > div { justify-content: center; }
          .cta-visual { display: none; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .how-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

const DEMO_SERVICES = [
  { id:1, name:'Plumbing Repair', category:'Plumbing', description:'Fix leaks, pipes, drains and all plumbing issues', base_price:499, duration_minutes:90, icon:'🔧', rating:4.7, total_reviews:234 },
  { id:2, name:'Electrical Wiring', category:'Electrical', description:'Safe electrical installation and repair services', base_price:599, duration_minutes:120, icon:'⚡', rating:4.8, total_reviews:189 },
  { id:3, name:'AC Repair & Service', category:'HVAC', description:'AC repair, cleaning, gas refilling and maintenance', base_price:699, duration_minutes:120, icon:'❄️', rating:4.6, total_reviews:312 },
  { id:4, name:'Appliance Repair', category:'Appliance', description:'Repair of washing machines, refrigerators, microwaves', base_price:449, duration_minutes:90, icon:'🔨', rating:4.5, total_reviews:156 },
  { id:5, name:'Carpentry Work', category:'Carpentry', description:'Furniture assembly, repair, custom woodwork', base_price:549, duration_minutes:180, icon:'🪚', rating:4.7, total_reviews:98 },
  { id:6, name:'Painting Services', category:'Painting', description:'Interior and exterior painting for homes and offices', base_price:799, duration_minutes:240, icon:'🎨', rating:4.8, total_reviews:143 },
  { id:7, name:'Deep Cleaning', category:'Cleaning', description:'Full home deep cleaning with professional equipment', base_price:999, duration_minutes:300, icon:'🧹', rating:4.9, total_reviews:278 },
  { id:8, name:'Pest Control', category:'Pest Control', description:'Effective pest control for home and office spaces', base_price:599, duration_minutes:120, icon:'🐛', rating:4.6, total_reviews:167 },
];

export default Home;
