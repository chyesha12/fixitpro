import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="fl-icon">⚡</div>
            <span>FixIt<em>Pro</em></span>
          </div>
          <p>India's most trusted local service marketplace. Connecting skilled professionals with homeowners across the country.</p>
          <div className="socials">
            {[['📘','Facebook'],['🐦','Twitter'],['📸','Instagram'],['💼','LinkedIn']].map(([icon,label])=>(
              <a href="#" key={label} title={label}>{icon}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          {['All Services','Plumbing','Electrical','AC Repair','Deep Cleaning','Pest Control'].map(l=>(
            <Link key={l} to="/services">{l}</Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/admin">Admin Panel</Link>
          <Link to="/provider-profile">Service Provider</Link>
        </div>
        <div className="footer-col">
          <h4>Get In Touch</h4>
          <div className="contact-item">📍 Ahmedabad, Gujarat, India</div>
          <div className="contact-item">📞 +91 98765 43210</div>
          <div className="contact-item">✉️ support@fixitpro.in</div>
          <div className="contact-item">⏰ Mon–Sat: 8am – 8pm</div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 FixItPro Technologies Pvt. Ltd. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>
    </div>
    <style>{`
      .footer { background:#f8fafc; border-top:1px solid var(--border); padding:64px 0 0; margin-top:80px; }
      .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; margin-bottom:48px; }
      .footer-logo { display:flex; align-items:center; gap:9px; margin-bottom:14px; }
      .fl-icon { width:32px; height:32px; background:var(--gradient); border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:0.95rem; }
      .footer-logo > span { font-family:'Poppins',sans-serif; font-size:1.3rem; font-weight:700; color:var(--text); }
      .footer-logo em { font-style:normal; background:var(--gradient); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      .footer-brand p { color:var(--text-muted); font-size:0.875rem; line-height:1.75; margin-bottom:20px; max-width:300px; }
      .socials { display:flex; gap:10px; }
      .socials a { width:36px; height:36px; background:#fff; border:1px solid var(--border); border-radius:9px; display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:1rem; transition:all .2s; box-shadow:var(--shadow-sm); }
      .socials a:hover { background:var(--primary-pale); border-color:var(--primary); transform:translateY(-2px); }
      .footer-col h4 { font-size:0.9rem; font-weight:700; color:var(--text); margin-bottom:16px; text-transform:uppercase; letter-spacing:.05em; }
      .footer-col a { display:block; color:var(--text-muted); text-decoration:none; font-size:0.875rem; margin-bottom:10px; transition:color .2s; }
      .footer-col a:hover { color:var(--primary); }
      .contact-item { color:var(--text-muted); font-size:0.875rem; margin-bottom:10px; }
      .footer-bottom { border-top:1px solid var(--border); padding:22px 0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
      .footer-bottom p { color:var(--text-soft); font-size:0.82rem; }
      .footer-links { display:flex; gap:20px; }
      .footer-links a { color:var(--text-soft); text-decoration:none; font-size:0.82rem; transition:color .2s; }
      .footer-links a:hover { color:var(--primary); }
      @media(max-width:900px){ .footer-grid{grid-template-columns:1fr 1fr;} }
      @media(max-width:500px){ .footer-grid{grid-template-columns:1fr;} .footer-bottom{flex-direction:column;text-align:center;} }
    `}</style>
  </footer>
);
export default Footer;
