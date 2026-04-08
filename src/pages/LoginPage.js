import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 👋');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb"></div>
      </div>
      <div className="auth-card">
        <div className="auth-logo">⚡ FixIt<span>Pro</span></div>
        <h1>Welcome Back</h1>
        <p>Sign in to your account to manage bookings</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} autoComplete="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="pass-wrap">
              <input type={showPass ? 'text' : 'password'} placeholder="Enter your password"
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <div className="forgot-link"><a href="#">Forgot password?</a></div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? '⏳ Signing in...' : '🔓 Sign In'}
          </button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>
        <div className="social-auth">
          <button className="social-btn">🔵 Google</button>
          <button className="social-btn">🔷 Facebook</button>
        </div>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one free →</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 20px 40px;
          position: relative;
        }
        .auth-bg {
          position: fixed;
          inset: 0;
          background: var(--gradient-hero);
          z-index: 0;
        }
        .auth-orb {
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%);
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(60px);
        }
        .auth-card {
          position: relative;
          z-index: 1;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
          animation: fadeInUp 0.5s ease;
        }
        .auth-logo {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 24px;
          color: var(--text);
        }
        .auth-logo span { color: var(--primary); }
        .auth-card h1 { font-size: 1.8rem; margin-bottom: 8px; }
        .auth-card > p { color: var(--text-muted); margin-bottom: 32px; }
        .auth-form { display: flex; flex-direction: column; gap: 4px; }
        .pass-wrap { position: relative; }
        .pass-wrap input { padding-right: 48px; }
        .pass-toggle {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          cursor: pointer; font-size: 1rem;
        }
        .forgot-link { text-align: right; margin-bottom: 8px; }
        .forgot-link a { color: var(--primary); font-size: 0.85rem; text-decoration: none; }
        .auth-btn { width: 100%; justify-content: center; padding: 14px; font-size: 1rem; margin-top: 8px; }
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .social-auth { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .social-btn {
          padding: 12px;
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .social-btn:hover { border-color: var(--primary); background: #f8fafc; }
        .auth-switch { color: var(--text-muted); font-size: 0.9rem; text-align: center; }
        .auth-switch a { color: var(--primary); font-weight: 600; text-decoration: none; }
        .auth-switch a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default LoginPage;
