import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const STATUS_LABELS = {
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  confirmed: { label: 'Confirmed', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
  in_progress: { label: 'In Progress', color: '#ff6b35', bg: 'rgba(255,107,53,0.1)' },
  completed: { label: 'Completed', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  cancelled: { label: 'Cancelled', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
};

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchBookings();
  }, [user]);

  const fetchBookings = () => {
    setLoading(true);
    axios.get('/api/bookings/my').then(res => setBookings(res.data))
      .catch(() => setBookings(DEMO_BOOKINGS))
      .finally(() => setLoading(false));
  };

  const cancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await axios.put(`/api/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch {
      toast.error('Could not cancel booking');
    }
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="bookings-page">
      <div className="page-header">
        <div className="container">
          <h1>My Bookings</h1>
          <p>Track and manage all your service bookings</p>
        </div>
      </div>

      <div className="container" style={{paddingTop:'40px', paddingBottom:'80px'}}>
        <div className="filter-tabs">
          {['all','pending','confirmed','in_progress','completed','cancelled'].map(f => (
            <button key={f} className={`tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : STATUS_LABELS[f]?.label || f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : filtered.length === 0 ? (
          <div className="empty-bookings">
            <div style={{fontSize:'4rem', marginBottom:'16px'}}>📋</div>
            <h3>No bookings found</h3>
            <p>You haven't made any bookings yet.</p>
            <Link to="/services" className="btn btn-primary" style={{marginTop:'16px'}}>Book a Service</Link>
          </div>
        ) : (
          <div className="bookings-list">
            {filtered.map(b => {
              const st = STATUS_LABELS[b.status] || STATUS_LABELS.pending;
              return (
                <div className="booking-card" key={b.id}>
                  <div className="bc-left">
                    <div className="bc-icon">{b.icon || '🔧'}</div>
                  </div>
                  <div className="bc-main">
                    <div className="bc-header">
                      <div>
                        <h3>{b.service_name}</h3>
                        <span className="bc-code">#{b.booking_code}</span>
                      </div>
                      <span className="status-badge" style={{color: st.color, background: st.bg}}>
                        ● {st.label}
                      </span>
                    </div>
                    <div className="bc-details">
                      <span>📅 {b.scheduled_date ? new Date(b.scheduled_date).toLocaleDateString('en-IN') : 'N/A'}</span>
                      <span>🕐 {b.scheduled_time || 'N/A'}</span>
                      <span>📍 {b.address}</span>
                      {b.technician_name && <span>👨‍🔧 {b.technician_name}</span>}
                    </div>
                    <div className="bc-footer">
                      <span className="bc-amount">₹{b.total_amount}</span>
                      <div className="bc-actions">
                        {(b.status === 'confirmed' || b.status === 'in_progress') && (
                          <Link to={`/track/${b.id}`} className="btn btn-ghost" style={{padding:'6px 14px', fontSize:'0.8rem'}}>
                            📍 Track
                          </Link>
                        )}
                        {(b.status === 'pending' || b.status === 'confirmed') && (
                          <button onClick={() => cancelBooking(b.id)} className="btn btn-outline"
                            style={{padding:'6px 14px', fontSize:'0.8rem', borderColor:'var(--error)', color:'var(--error)'}}>
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .bookings-page {}
        .page-header { padding: 120px 0 50px; background: var(--gradient-hero); }
        .page-header h1 { font-size: 2.5rem; margin-bottom: 8px; }
        .page-header p { color: var(--text-muted); }
        .filter-tabs { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; }
        .tab {
          padding: 8px 20px;
          border-radius: 50px;
          border: 1px solid var(--border);
          background: #fff;
          color: var(--text-muted);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab:hover { border-color: var(--primary); color: var(--primary); }
        .tab.active { background: var(--gradient); border-color: transparent; color: white; }
        .bookings-list { display: flex; flex-direction: column; gap: 16px; }
        .booking-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          display: flex;
          gap: 20px;
          transition: all 0.3s ease;
        }
        .booking-card:hover { border-color: var(--primary); }
        .bc-icon { font-size: 2.5rem; width: 56px; height: 56px; background: #eff6ff; border-radius: 12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .bc-main { flex: 1; min-width: 0; }
        .bc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 12px; flex-wrap: wrap; }
        .bc-header h3 { font-size: 1.1rem; margin-bottom: 4px; }
        .bc-code { color: var(--text-muted); font-size: 0.8rem; font-family: monospace; }
        .status-badge { padding: 4px 12px; border-radius: 50px; font-size: 0.8rem; font-weight: 600; white-space: nowrap; }
        .bc-details { display: flex; flex-wrap: wrap; gap: 12px; color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px; }
        .bc-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .bc-amount { font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 700; color: var(--primary); }
        .bc-actions { display: flex; gap: 8px; }
        .empty-bookings { text-align: center; padding: 80px 20px; }
        .empty-bookings h3 { font-size: 1.4rem; margin-bottom: 8px; }
        .empty-bookings p { color: var(--text-muted); }
      `}</style>
    </div>
  );
};

const DEMO_BOOKINGS = [
  { id:1, booking_code:'BK12345678', service_name:'Plumbing Repair', icon:'🔧', scheduled_date:'2024-12-20', scheduled_time:'10:00', address:'123 Main St, Ahmedabad', status:'completed', total_amount:499, technician_name:'Rajesh Kumar' },
  { id:2, booking_code:'BK87654321', service_name:'AC Repair & Service', icon:'❄️', scheduled_date:'2024-12-25', scheduled_time:'14:00', address:'456 Garden Road, Surat', status:'confirmed', total_amount:699, technician_name:'Suresh Patel' },
  { id:3, booking_code:'BK11223344', service_name:'Deep Cleaning', icon:'🧹', scheduled_date:'2024-12-28', scheduled_time:'09:00', address:'789 Park Lane, Vadodara', status:'pending', total_amount:999 },
];

export default MyBookings;
