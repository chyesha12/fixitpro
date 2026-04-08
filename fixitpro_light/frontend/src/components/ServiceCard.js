import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const stars = Math.round(service.rating || 0);
  return (
    <div className="service-card">
      <div className="sc-header">
        <div className="sc-icon">{service.icon}</div>
        <span className="sc-cat">{service.category}</span>
      </div>
      <h3>{service.name}</h3>
      <p className="sc-desc">{service.description}</p>
      <div className="sc-meta">
        <span className="sc-stars">{'★'.repeat(stars)}{'☆'.repeat(5-stars)} <span>({service.total_reviews||0})</span></span>
        <span className="sc-dur">⏱ {service.duration_minutes}m</span>
      </div>
      <div className="sc-footer">
        <div className="sc-price">
          <span>From</span>
          <strong>₹{service.base_price}</strong>
        </div>
        <Link to={`/book/${service.id}`} className="btn btn-primary" style={{padding:'9px 20px',fontSize:'0.82rem'}}>
          Book Now
        </Link>
      </div>
      <style>{`
        .service-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          padding: 22px;
          display: flex; flex-direction: column; gap: 11px;
          transition: all .25s ease;
          box-shadow: var(--shadow-sm);
          position: relative; overflow: hidden;
        }
        .service-card::after {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:var(--gradient); transform:scaleX(0); transition:transform .25s ease;
          transform-origin: left;
        }
        .service-card:hover::after { transform:scaleX(1); }
        .service-card:hover { border-color:#bfdbfe; transform:translateY(-5px); box-shadow:0 16px 40px rgba(37,99,235,0.12); }
        .sc-header { display:flex; align-items:center; justify-content:space-between; }
        .sc-icon { width:52px; height:52px; background:var(--gradient-soft); border:1.5px solid #dbeafe; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:2rem; }
        .sc-cat { padding:4px 12px; background:var(--primary-pale); color:var(--primary); border-radius:50px; font-size:0.72rem; font-weight:600; }
        .service-card h3 { font-size:1.05rem; color:var(--text); }
        .sc-desc { color:var(--text-muted); font-size:0.845rem; line-height:1.65; flex:1; }
        .sc-meta { display:flex; align-items:center; justify-content:space-between; font-size:0.78rem; }
        .sc-stars { color:#f59e0b; } .sc-stars span { color:var(--text-soft); }
        .sc-dur { color:var(--text-muted); }
        .sc-footer { display:flex; align-items:center; justify-content:space-between; padding-top:12px; border-top:1px solid var(--border); }
        .sc-price span { display:block; color:var(--text-soft); font-size:0.7rem; }
        .sc-price strong { font-family:'Poppins',sans-serif; font-size:1.3rem; font-weight:700; background:var(--gradient); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      `}</style>
    </div>
  );
};
export default ServiceCard;
