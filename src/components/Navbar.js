import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleLogout = () => { logout(); toast.success('Logged out successfully'); navigate('/'); };
  const isActive = p => location.pathname === p;
  const close = () => setMobileOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={close}>
          <div className="logo-icon">⚡</div>
          <span>FixIt<span>Pro</span></span>
        </Link>

        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {[['/', 'Home'],['/services','Services'],['/about','About'],
            ['/reviews','Reviews'],['/faq','FAQ'],['/contact','Contact']].map(([p,l]) => (
            <Link key={p} to={p} className={isActive(p) ? 'active' : ''} onClick={close}>{l}</Link>
          ))}
          {user && <Link to="/my-bookings" className={isActive('/my-bookings') ? 'active' : ''} onClick={close}>My Bookings</Link>}
          {user?.role === 'admin'      && <Link to="/admin"            className={`nav-admin ${isActive('/admin') ? 'active' : ''}`}            onClick={close}>⚙️ Admin</Link>}
          {user?.role === 'technician' && <Link to="/provider-profile" className={isActive('/provider-profile') ? 'active' : ''} onClick={close}>My Profile</Link>}
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <div className="user-avatar">{user.name?.[0]?.toUpperCase()}</div>
              <div className="user-info">
                <span className="user-name">{user.name?.split(' ')[0]}</span>
                <span className="user-role">{user.role}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline" style={{padding:'7px 18px',fontSize:'0.82rem'}}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login"  className="btn btn-ghost"   style={{padding:'9px 22px',fontSize:'0.875rem'}}>Login</Link>
              <Link to="/signup" className="btn btn-primary" style={{padding:'9px 22px',fontSize:'0.875rem'}}>Sign Up</Link>
            </>
          )}
        </div>

        <button className={`mobile-toggle ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
          <span/><span/><span/>
        </button>
      </div>

      <style>{`
        .navbar {
          position: fixed; top:0; left:0; right:0; z-index:1000;
          padding: 14px 0;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: all .3s ease;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.97);
          border-bottom-color: var(--border);
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          padding: 10px 0;
        }
        .nav-container { display:flex; align-items:center; gap:24px; }
        .nav-logo { display:flex; align-items:center; gap:8px; text-decoration:none; flex-shrink:0; }
        .logo-icon { width:34px; height:34px; background:var(--gradient); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1rem; }
        .nav-logo > span { font-family:'Poppins',sans-serif; font-size:1.3rem; font-weight:700; color:var(--text); }
        .nav-logo span span { background:var(--gradient); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .nav-links { display:flex; align-items:center; gap:2px; flex:1; }
        .nav-links a { color:var(--text-muted); text-decoration:none; font-size:0.875rem; font-weight:500; padding:7px 13px; border-radius:8px; transition:all .2s; white-space:nowrap; }
        .nav-links a:hover { color:var(--primary); background:var(--primary-pale); }
        .nav-links a.active { color:var(--primary); background:var(--primary-pale); font-weight:600; }
        .nav-admin { background:var(--primary-pale) !important; color:var(--primary) !important; }
        .nav-actions { display:flex; align-items:center; gap:10px; flex-shrink:0; }
        .user-menu { display:flex; align-items:center; gap:8px; }
        .user-avatar { width:34px; height:34px; background:var(--gradient); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:0.875rem; flex-shrink:0; }
        .user-info { display:flex; flex-direction:column; }
        .user-name { font-weight:600; color:var(--text); font-size:0.85rem; line-height:1.2; }
        .user-role { color:var(--primary); font-size:0.7rem; text-transform:capitalize; }
        .mobile-toggle { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .mobile-toggle span { display:block; width:22px; height:2px; background:var(--text); border-radius:2px; transition:all .3s; }
        .mobile-toggle.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
        .mobile-toggle.open span:nth-child(2) { opacity:0; }
        .mobile-toggle.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }
        @media(max-width:960px){
          .nav-links,.nav-actions { display:none; }
          .mobile-toggle { display:flex; }
          .nav-links.open {
            display:flex; flex-direction:column;
            position:fixed; top:62px; left:0; right:0;
            background:#fff; padding:16px 20px 20px;
            border-bottom:1px solid var(--border);
            box-shadow:0 8px 24px rgba(0,0,0,0.08);
            gap:4px;
          }
          .nav-links.open ~ .nav-actions { display:none; }
        }
      `}</style>
    </nav>
  );
};
export default Navbar;
