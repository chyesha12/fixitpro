import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const DEMO_SERVICES = {
  1: { id:1, name:'Plumbing Repair', category:'Plumbing', description:'Fix leaks, pipes, drains and all plumbing issues', base_price:499, duration_minutes:90, icon:'🔧' },
  2: { id:2, name:'Electrical Wiring', category:'Electrical', description:'Safe electrical installation and repair services', base_price:599, duration_minutes:120, icon:'⚡' },
  3: { id:3, name:'AC Repair & Service', category:'HVAC', description:'AC repair, gas refilling and maintenance', base_price:699, duration_minutes:120, icon:'❄️' },
};

const TIME_SLOTS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    address: '', city: '', state: 'Gujarat', pincode: '',
    scheduled_date: '', scheduled_time: '', notes: ''
  });
  const [bookingResult, setBookingResult] = useState(null);

  useEffect(() => {
    axios.get(`/api/services/${serviceId}`).then(res => setService(res.data))
      .catch(() => setService(DEMO_SERVICES[serviceId] || DEMO_SERVICES[1]));
  }, [serviceId]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!user) { toast.error('Please login to book a service'); navigate('/login'); return; }
    if (!form.address || !form.scheduled_date || !form.scheduled_time) {
      toast.error('Please fill all required fields'); return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/bookings/', { service_id: parseInt(serviceId), ...form });
      setBookingResult(res.data);
      setStep(3);
      toast.success('Booking confirmed! 🎉');
    } catch (err) {
      const msg = err.response?.data?.error || 'Booking failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (!service) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="booking-page">
      <div className="page-header">
        <div className="container">
          <Link to="/services" className="back-link">← Back to Services</Link>
          <h1>Book {service.icon} {service.name}</h1>
          <p>{service.category} · From ₹{service.base_price} · {service.duration_minutes} min</p>
        </div>
      </div>

      <div className="container booking-container">
        {/* Steps */}
        <div className="steps-indicator">
          {['Service Details', 'Schedule & Address', 'Confirmation'].map((label, i) => (
            <div key={i} className={`step-item ${step >= i+1 ? 'active' : ''} ${step > i+1 ? 'done' : ''}`}>
              <div className="step-num">{step > i+1 ? '✓' : i+1}</div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="booking-grid">
          {/* Main content */}
          <div className="booking-main">
            {step === 1 && (
              <div className="step-content animate-in">
                <h2>Service Details</h2>
                <div className="service-detail-card">
                  <div className="sdc-icon">{service.icon}</div>
                  <div>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <div className="sdc-meta">
                      <span>📂 {service.category}</span>
                      <span>⏱ {service.duration_minutes} minutes</span>
                      <span>✅ Verified Professionals</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Additional Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Describe your issue or any special instructions..."
                    rows={4}
                  />
                </div>
                {!user && (
                  <div className="auth-notice">
                    ⚠️ You need to <Link to="/login">login</Link> or <Link to="/signup">sign up</Link> to complete your booking.
                  </div>
                )}
                <button className="btn btn-primary" onClick={() => setStep(2)} style={{width:'100%', justifyContent:'center'}}>
                  Continue to Schedule →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="step-content animate-in">
                <h2>Schedule & Address</h2>
                <div className="form-group">
                  <label>Select Date *</label>
                  <input type="date" name="scheduled_date" value={form.scheduled_date}
                    onChange={handleChange} min={today} />
                </div>
                <div className="form-group">
                  <label>Select Time Slot *</label>
                  <div className="time-slots">
                    {TIME_SLOTS.map(t => (
                      <button key={t}
                        className={`time-slot ${form.scheduled_time === t ? 'selected' : ''}`}
                        onClick={() => setForm({...form, scheduled_time: t})}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Full Address *</label>
                  <input type="text" name="address" value={form.address}
                    onChange={handleChange} placeholder="House no., Street, Landmark" />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>City *</label>
                    <input type="text" name="city" value={form.city}
                      onChange={handleChange} placeholder="e.g. Ahmedabad" />
                  </div>
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input type="text" name="pincode" value={form.pincode}
                      onChange={handleChange} placeholder="e.g. 390001" maxLength={6} />
                  </div>
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select name="state" value={form.state} onChange={handleChange}>
                    {['Gujarat','Maharashtra','Rajasthan','Delhi','Karnataka','Tamil Nadu','Uttar Pradesh','West Bengal'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="btn-row">
                  <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}
                    style={{flex:1, justifyContent:'center'}}>
                    {loading ? '⏳ Booking...' : '✅ Confirm Booking'}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && bookingResult && (
              <div className="step-content animate-in success-screen">
                <div className="success-icon">🎉</div>
                <h2>Booking Confirmed!</h2>
                <p>Your booking has been placed successfully. A technician will be assigned shortly.</p>
                <div className="booking-id-card">
                  <span>Booking Code</span>
                  <strong>{bookingResult.booking_code}</strong>
                </div>
                <div className="success-actions">
                  <Link to="/my-bookings" className="btn btn-primary">View My Bookings</Link>
                  <Link to="/services" className="btn btn-outline">Book Another Service</Link>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="booking-summary">
            <h3>Order Summary</h3>
            <div className="summary-service">
              <span className="sum-icon">{service.icon}</span>
              <div>
                <strong>{service.name}</strong>
                <span>{service.category}</span>
              </div>
            </div>
            {form.scheduled_date && (
              <div className="summary-row">
                <span>Date</span>
                <span>{new Date(form.scheduled_date).toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'})}</span>
              </div>
            )}
            {form.scheduled_time && (
              <div className="summary-row">
                <span>Time</span><span>{form.scheduled_time}</span>
              </div>
            )}
            {form.city && (
              <div className="summary-row">
                <span>City</span><span>{form.city}</span>
              </div>
            )}
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Service Charge</span>
              <span>₹{service.base_price}</span>
            </div>
            <div className="summary-row">
              <span>Platform Fee</span><span>₹0</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{service.base_price}</span>
            </div>
            <div className="summary-note">
              <span>🔒 Secure booking · No hidden charges</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .booking-page {}
        .page-header { padding: 120px 0 50px; background: var(--gradient-hero); }
        .back-link { color: var(--primary); text-decoration: none; font-size: 0.9rem; display: inline-block; margin-bottom: 12px; }
        .back-link:hover { text-decoration: underline; }
        .page-header h1 { font-size: 2.2rem; margin-bottom: 8px; }
        .page-header p { color: var(--text-muted); }
        .booking-container { padding-top: 40px; padding-bottom: 80px; }
        .steps-indicator {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 40px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px 24px;
          justify-content: center;
          gap: 40px;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }
        .step-item.active { color: var(--primary); }
        .step-item.done { color: var(--success); }
        .step-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 2px solid currentColor;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .step-item.active .step-num { background: var(--primary); border-color: var(--primary); color: white; }
        .step-item.done .step-num { background: var(--success); border-color: var(--success); color: white; }
        .booking-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
          align-items: start;
        }
        .booking-main {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px;
        }
        .step-content h2 { font-size: 1.5rem; margin-bottom: 24px; }
        .service-detail-card {
          display: flex;
          gap: 16px;
          background: #f8fafc;
          border: 1px solid rgba(255,107,53,0.2);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .sdc-icon { font-size: 2.5rem; flex-shrink: 0; }
        .service-detail-card h3 { font-size: 1.15rem; margin-bottom: 6px; }
        .service-detail-card p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 12px; }
        .sdc-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.8rem; color: var(--text-muted); }
        .time-slots {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 8px;
        }
        .time-slot {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #f8fafc;
          color: var(--text-muted);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .time-slot:hover { border-color: var(--primary); color: var(--primary); }
        .time-slot.selected { background: var(--gradient); border-color: transparent; color: white; font-weight: 600; }
        .btn-row { display: flex; gap: 16px; margin-top: 8px; }
        .auth-notice {
          background: #fffbeb;
          border: 1px solid rgba(245,158,11,0.3);
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 0.9rem;
          color: var(--warning);
          margin-bottom: 16px;
        }
        .auth-notice a { color: var(--primary); font-weight: 600; }
        .success-screen { text-align: center; padding: 20px 0; }
        .success-icon { font-size: 4rem; margin-bottom: 16px; }
        .success-screen h2 { font-size: 2rem; margin-bottom: 12px; color: var(--success); }
        .success-screen p { color: var(--text-muted); margin-bottom: 24px; }
        .booking-id-card {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .booking-id-card span { color: var(--text-muted); font-size: 0.85rem; }
        .booking-id-card strong { font-family: 'Syne', sans-serif; font-size: 1.8rem; color: var(--success); }
        .success-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .booking-summary {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          position: sticky;
          top: 100px;
        }
        .booking-summary h3 { font-size: 1.1rem; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
        .summary-service {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        .sum-icon { font-size: 2rem; }
        .summary-service strong { display: block; margin-bottom: 4px; }
        .summary-service span { color: var(--text-muted); font-size: 0.85rem; }
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .summary-row span:last-child { color: var(--text); font-weight: 500; }
        .summary-row.total { color: var(--text); }
        .summary-divider { height: 1px; background: var(--border); margin: 16px 0; }
        .summary-total {
          display: flex;
          justify-content: space-between;
          padding: 16px;
          background: #eff6ff;
          border-radius: 8px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          margin-top: 8px;
        }
        .summary-total span:last-child { color: var(--primary); }
        .summary-note {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.8rem;
          margin-top: 12px;
        }
        @media (max-width: 900px) {
          .booking-grid { grid-template-columns: 1fr; }
          .booking-summary { position: static; }
          .time-slots { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
