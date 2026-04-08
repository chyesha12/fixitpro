import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // null | 'user' | 'provider'
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // User form
  const [userForm, setUserForm] = useState({ name: '', email: '', phone: '', address: '', password: '', confirm_password: '' });

  // Service Provider form
  const [providerForm, setProviderForm] = useState({
    name: '', email: '', phone: '', address: '',
    password: '', confirm_password: '',
    experience: '', bio: '',
    skills: '', services: '',
    certifications: '', languages: '', serviceAreas: '',
  });

  const handleUserSubmit = async e => {
    e.preventDefault();
    if (!userForm.name || !userForm.email || !userForm.password) { toast.error('Please fill required fields'); return; }
    if (userForm.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (userForm.password !== userForm.confirm_password) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await signup({ ...userForm, role: 'user' });
      toast.success('Account created successfully! 🎉');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Signup failed. Try again.');
    } finally { setLoading(false); }
  };

  const handleProviderSubmit = async e => {
    e.preventDefault();
    if (!providerForm.name || !providerForm.email || !providerForm.password) { toast.error('Please fill required fields'); return; }
    if (providerForm.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (providerForm.password !== providerForm.confirm_password) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await signup({ ...providerForm, role: 'provider' });
      toast.success('Provider profile created! 🎉');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Signup failed. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg"><div className="auth-orb"></div></div>

      {/* ROLE SELECTION SCREEN */}
      {!role && (
        <div className="auth-card role-card">
          <div className="auth-logo">⚡ FixIt<span>Pro</span></div>
          <h1>Join FixItPro</h1>
          <p>Choose how you want to get started</p>

          <div className="role-options">
            <button className="role-btn" onClick={() => setRole('user')}>
              <div className="role-icon">👤</div>
              <div className="role-label">I'm a Customer</div>
              <div className="role-desc">Book services from top local professionals</div>
              <div className="role-arrow">→</div>
            </button>

            <button className="role-btn provider" onClick={() => setRole('provider')}>
              <div className="role-icon">🛠️</div>
              <div className="role-label">I'm a Service Provider</div>
              <div className="role-desc">Create your profile and start earning</div>
              <div className="role-arrow">→</div>
            </button>
          </div>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in →</Link>
          </p>
        </div>
      )}

      {/* USER SIGNUP FORM */}
      {role === 'user' && (
        <div className="auth-card" style={{ maxWidth: '500px' }}>
          <button className="back-btn" onClick={() => setRole(null)}>← Back</button>
          <div className="auth-logo">⚡ FixIt<span>Pro</span></div>
          <h1>Create Account</h1>
          <p>Join thousands of happy customers</p>

          <form onSubmit={handleUserSubmit} className="auth-form">
            <div className="grid-2">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="John Doe" value={userForm.name}
                  onChange={e => setUserForm({ ...userForm, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" value={userForm.phone}
                  onChange={e => setUserForm({ ...userForm, phone: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" placeholder="you@example.com" value={userForm.email}
                onChange={e => setUserForm({ ...userForm, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" placeholder="Your home address" value={userForm.address}
                onChange={e => setUserForm({ ...userForm, address: e.target.value })} />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Password *</label>
                <div className="pass-wrap">
                  <input type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={userForm.password} onChange={e => setUserForm({ ...userForm, password: e.target.value })} />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password *</label>
                <input type="password" placeholder="Re-enter password"
                  value={userForm.confirm_password} onChange={e => setUserForm({ ...userForm, confirm_password: e.target.value })} />
              </div>
            </div>
            <div className="terms-note">
              By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? '⏳ Creating account...' : '🚀 Create Account'}
            </button>
          </form>

          <p className="auth-switch">Already have an account? <Link to="/login">Sign in →</Link></p>
        </div>
      )}

      {/* SERVICE PROVIDER SIGNUP FORM */}
      {role === 'provider' && (
        <div className="auth-card provider-form-card">
          <button className="back-btn" onClick={() => setRole(null)}>← Back</button>
          <div className="auth-logo">⚡ FixIt<span>Pro</span></div>
          <h1>Create Provider Profile</h1>
          <p>Set up your professional profile and start earning</p>

          <form onSubmit={handleProviderSubmit} className="auth-form">
            <div className="section-title">👤 Basic Information</div>
            <div className="grid-2">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="Rajesh Kumar" value={providerForm.name}
                  onChange={e => setProviderForm({ ...providerForm, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" value={providerForm.phone}
                  onChange={e => setProviderForm({ ...providerForm, phone: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" placeholder="you@example.com" value={providerForm.email}
                onChange={e => setProviderForm({ ...providerForm, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" placeholder="45, Patel Nagar, Ahmedabad, Gujarat" value={providerForm.address}
                onChange={e => setProviderForm({ ...providerForm, address: e.target.value })} />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Password *</label>
                <div className="pass-wrap">
                  <input type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={providerForm.password} onChange={e => setProviderForm({ ...providerForm, password: e.target.value })} />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password *</label>
                <input type="password" placeholder="Re-enter password"
                  value={providerForm.confirm_password} onChange={e => setProviderForm({ ...providerForm, confirm_password: e.target.value })} />
              </div>
            </div>

            <div className="section-title">🛠️ Professional Details</div>
            <div className="form-group">
              <label>Years of Experience</label>
              <input type="text" placeholder="e.g. 8 years" value={providerForm.experience}
                onChange={e => setProviderForm({ ...providerForm, experience: e.target.value })} />
            </div>
            <div className="form-group">
              <label>About Me / Bio</label>
              <textarea placeholder="Describe your expertise, experience and what makes you stand out..."
                value={providerForm.bio} rows={3}
                onChange={e => setProviderForm({ ...providerForm, bio: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Skills & Expertise <span className="hint">(comma separated)</span></label>
              <input type="text" placeholder="e.g. Leak Detection, Pipe Repair, Drain Cleaning"
                value={providerForm.skills} onChange={e => setProviderForm({ ...providerForm, skills: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Services Offered <span className="hint">(comma separated)</span></label>
              <input type="text" placeholder="e.g. Plumbing Repair, Water Purifier Service"
                value={providerForm.services} onChange={e => setProviderForm({ ...providerForm, services: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Certifications <span className="hint">(comma separated)</span></label>
              <input type="text" placeholder="e.g. ISI Certified Plumber, CPVC Installation Expert"
                value={providerForm.certifications} onChange={e => setProviderForm({ ...providerForm, certifications: e.target.value })} />
            </div>

            <div className="section-title">🌐 Availability</div>
            <div className="grid-2">
              <div className="form-group">
                <label>Languages <span className="hint">(comma separated)</span></label>
                <input type="text" placeholder="e.g. Gujarati, Hindi, English"
                  value={providerForm.languages} onChange={e => setProviderForm({ ...providerForm, languages: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Service Areas <span className="hint">(comma separated)</span></label>
                <input type="text" placeholder="e.g. Ahmedabad, Surat, Vadodara"
                  value={providerForm.serviceAreas} onChange={e => setProviderForm({ ...providerForm, serviceAreas: e.target.value })} />
              </div>
            </div>

            <div className="terms-note">
              By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? '⏳ Creating profile...' : '🚀 Create Provider Profile'}
            </button>
          </form>

          <p className="auth-switch">Already have an account? <Link to="/login">Sign in →</Link></p>
        </div>
      )}

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 20px 40px;
          position: relative;
        }
        .auth-bg { position: fixed; inset: 0; background: var(--gradient-hero); z-index: 0; }
        .auth-orb {
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%);
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          filter: blur(60px);
        }
        .auth-card {
          position: relative; z-index: 1;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
          animation: fadeInUp 0.5s ease;
        }
        .role-card { max-width: 480px; }
        .provider-form-card { max-width: 560px; }
        .auth-logo { font-family:'Syne',sans-serif; font-size:1.4rem; font-weight:800; margin-bottom:24px; color: var(--text); }
        .auth-logo span { color: var(--primary); }
        .auth-card h1 { font-size:1.8rem; margin-bottom:8px; }
        .auth-card > p { color: var(--text-muted); margin-bottom:32px; }

        /* Role selection */
        .role-options { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
        .role-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border: 2px solid var(--border);
          border-radius: 16px;
          background: #f8fafc;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
          position: relative;
        }
        .role-btn:hover { border-color: var(--primary); background: #eff6ff; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.12); }
        .role-btn.provider:hover { border-color: #059669; background: #f0fdf4; box-shadow: 0 8px 24px rgba(5,150,105,0.12); }
        .role-icon { font-size: 2rem; flex-shrink: 0; }
        .role-label { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .role-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; }
        .role-arrow { margin-left: auto; font-size: 1.2rem; color: var(--text-muted); }

        /* Back button */
        .back-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
          padding: 0;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .back-btn:hover { color: var(--primary); }

        /* Section titles */
        .section-title {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
          margin: 16px 0 12px;
        }

        .hint { font-weight: 400; font-size: 0.78rem; color: var(--text-muted); }

        .auth-form { display:flex; flex-direction:column; gap:4px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pass-wrap { position:relative; }
        .pass-wrap input { padding-right:48px; }
        .pass-toggle { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; font-size:1rem; }
        textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: inherit;
          resize: vertical;
          color: var(--text);
          background: #fff;
          transition: border-color 0.2s;
        }
        textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .terms-note { color: var(--text-muted); font-size:0.82rem; margin:8px 0; line-height:1.6; }
        .terms-note a { color:var(--primary); text-decoration:none; }
        .auth-btn { width:100%; justify-content:center; padding:14px; font-size:1rem; margin-top:8px; }
        .auth-switch { color:var(--text-muted); font-size:0.9rem; text-align:center; margin-top:20px; }
        .auth-switch a { color:var(--primary); font-weight:600; text-decoration:none; }
        .auth-switch a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default SignupPage;
