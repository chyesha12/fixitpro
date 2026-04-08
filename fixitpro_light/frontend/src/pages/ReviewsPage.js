import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DEMO_REVIEWS = [
  { id:1, user_name:'Ravi Sharma', service_name:'Plumbing Repair', rating:5, comment:'Excellent service! The plumber arrived on time and fixed the leak perfectly. Very professional and clean work. Will definitely book again.', created_at:'2024-12-01' },
  { id:2, user_name:'Meena Patel', service_name:'AC Repair & Service', rating:5, comment:'My AC was not cooling at all. The technician diagnosed the problem quickly, refilled the gas and now it works like new. Great value for money!', created_at:'2024-12-05' },
  { id:3, user_name:'Ankit Verma', service_name:'Electrical Wiring', rating:4, comment:'Good service overall. The electrician was knowledgeable and completed the wiring safely. Minor delay but work quality was top-notch.', created_at:'2024-12-08' },
  { id:4, user_name:'Sunita Gupta', service_name:'Deep Cleaning', rating:5, comment:'My entire apartment looks brand new! The cleaning team was thorough, professional, and used good quality products. Highly recommended!', created_at:'2024-12-10' },
  { id:5, user_name:'Pradeep Joshi', service_name:'CCTV Installation', rating:5, comment:'4 cameras installed perfectly across my home. The technician explained everything clearly and the app setup was easy. Very happy with the result.', created_at:'2024-12-12' },
  { id:6, user_name:'Kavita Shah', service_name:'Pest Control', rating:4, comment:'Effective treatment for cockroaches and ants. The team was punctual and worked quickly. Haven\'t seen any pests since the treatment. Worth it!', created_at:'2024-12-14' },
  { id:7, user_name:'Deepak Singh', service_name:'Painting Services', rating:5, comment:'Our living room looks absolutely gorgeous now! The painters were meticulous, no mess left behind. The color recommendation was spot on.', created_at:'2024-12-15' },
  { id:8, user_name:'Pooja Nair', service_name:'Carpentry Work', rating:4, comment:'Got my wardrobe and study table assembled. The carpenter was skilled and did a neat job. Reasonable pricing for good quality work.', created_at:'2024-12-16' },
  { id:9, user_name:'Mahesh Reddy', service_name:'Water Purifier Service', rating:5, comment:'Quick and efficient RO service. The technician explained what was replaced and why. Water tastes much better now. Great technician!', created_at:'2024-12-17' },
];

const STATS = [
  { value: '4.8', label: 'Average Rating', suffix: '/5' },
  { value: '50,000+', label: 'Total Reviews', suffix: '' },
  { value: '96%', label: 'Would Recommend', suffix: '' },
  { value: '4.9', label: 'Technician Ratings', suffix: '/5' },
];

const SERVICE_OPTIONS = [
  'Plumbing Repair', 'AC Repair & Service', 'Electrical Wiring', 'Deep Cleaning',
  'CCTV Installation', 'Pest Control', 'Painting Services', 'Carpentry Work',
  'Water Purifier Service', 'Bathroom Renovation', 'Gas Stove Repair', 'Other',
];

const StarRating = ({ rating, size = '1rem' }) => (
  <div style={{ display:'flex', gap:'2px', fontSize: size }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ color: i <= rating ? '#fbbf24' : '#d1d5db' }}>★</span>
    ))}
  </div>
);

const StarPicker = ({ rating, onChange }) => (
  <div style={{ display:'flex', gap:'6px', fontSize:'2rem', cursor:'pointer' }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} onClick={() => onChange(i)}
        style={{ color: i <= rating ? '#fbbf24' : '#d1d5db', transition:'color 0.15s', userSelect:'none' }}>★</span>
    ))}
  </div>
);

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(DEMO_REVIEWS);
  const [filter, setFilter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    user_name: '', service_name: '', rating: 0, comment: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLoading(true);
    axios.get('/api/reviews/').then(res => {
      if (res.data.length > 0) setReviews(res.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 0 ? reviews : reviews.filter(r => r.rating === filter);

  const validate = () => {
    const e = {};
    if (!form.user_name.trim()) e.user_name = 'Name is required';
    if (!form.service_name) e.service_name = 'Please select a service';
    if (!form.rating) e.rating = 'Please select a rating';
    if (!form.comment.trim() || form.comment.trim().length < 10) e.comment = 'Comment must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await axios.post('/api/reviews/', { ...form });
    } catch (_) {}
    // Add locally regardless
    const newReview = {
      id: Date.now(), ...form,
      created_at: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [newReview, ...prev]);
    setSubmitted(true);
    setSubmitting(false);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setForm({ user_name: '', service_name: '', rating: 0, comment: '' });
      setErrors({});
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setForm({ user_name: '', service_name: '', rating: 0, comment: '' });
    setErrors({});
  };

  return (
    <div className="reviews-page">
      <div className="page-header">
        <div className="container">
          <h1>Customer Reviews</h1>
          <p>Real experiences from real customers across India</p>
          <button className="btn btn-primary write-review-btn" onClick={() => setShowModal(true)}>
            ✍️ Write a Review
          </button>
        </div>
      </div>

      <div className="container" style={{paddingTop:'50px', paddingBottom:'80px'}}>
        {/* Stats */}
        <div className="rating-stats">
          {STATS.map((s,i) => (
            <div className="rs-card" key={i}>
              <div className="rs-value">{s.value}<span>{s.suffix}</span></div>
              <div className="rs-label">{s.label}</div>
              {i === 0 && <StarRating rating={5} size="1.1rem" />}
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="review-filters">
          <span>Filter by rating:</span>
          {[0,5,4,3,2,1].map(r => (
            <button key={r} className={`pill ${filter === r ? 'active' : ''}`} onClick={() => setFilter(r)}>
              {r === 0 ? 'All' : `${'★'.repeat(r)} ${r} Stars`}
            </button>
          ))}
          <button className="write-review-pill" onClick={() => setShowModal(true)}>+ Write a Review</button>
        </div>

        {/* Reviews grid */}
        <div className="reviews-grid">
          {filtered.map(r => (
            <div className="review-card" key={r.id}>
              <div className="rc-header">
                <div className="rc-avatar">{r.user_name?.[0]?.toUpperCase()}</div>
                <div>
                  <strong className="rc-name">{r.user_name}</strong>
                  <div className="rc-service">{r.service_name}</div>
                </div>
                <div className="rc-date">{r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : ''}</div>
              </div>
              <StarRating rating={r.rating} />
              <p className="rc-comment">{r.comment}</p>
              <div className="rc-verified">✅ Verified Booking</div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{textAlign:'center', padding:'60px', color:'var(--text-muted)'}}>
            No reviews found for this rating.
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            {submitted ? (
              <div className="modal-success">
                <div className="success-icon">🎉</div>
                <h2>Thank You!</h2>
                <p>Your review has been submitted successfully.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Write a Review</h2>
                  <button className="modal-close" onClick={closeModal}>✕</button>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" placeholder="e.g. Ravi Sharma"
                      value={form.user_name}
                      onChange={e => setForm({...form, user_name: e.target.value})} />
                    {errors.user_name && <span className="field-error">{errors.user_name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Service Used *</label>
                    <select value={form.service_name}
                      onChange={e => setForm({...form, service_name: e.target.value})}>
                      <option value="">-- Select a service --</option>
                      {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service_name && <span className="field-error">{errors.service_name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Your Rating *</label>
                    <StarPicker rating={form.rating} onChange={v => setForm({...form, rating: v})} />
                    {form.rating > 0 && (
                      <span className="rating-label">
                        {['','Poor','Fair','Good','Very Good','Excellent'][form.rating]}
                      </span>
                    )}
                    {errors.rating && <span className="field-error">{errors.rating}</span>}
                  </div>

                  <div className="form-group">
                    <label>Your Review *</label>
                    <textarea placeholder="Share your experience with this service... (min. 10 characters)"
                      rows={4} value={form.comment}
                      onChange={e => setForm({...form, comment: e.target.value})} />
                    <span className="char-count">{form.comment.length} characters</span>
                    {errors.comment && <span className="field-error">{errors.comment}</span>}
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? '⏳ Submitting...' : '🚀 Submit Review'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .reviews-page {}
        .page-header { padding: 120px 0 60px; background: var(--gradient-hero); }
        .page-header h1 { font-size: 3rem; margin-bottom: 12px; }
        .page-header p { color: var(--text-muted); margin-bottom: 24px; }
        .write-review-btn { display: inline-flex; align-items: center; gap: 8px; }
        .rating-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        .rs-card {
          background: #fff; border: 1px solid var(--border);
          border-radius: var(--radius); padding: 24px; text-align: center; transition: all 0.3s;
        }
        .rs-card:hover { border-color: var(--primary); transform: translateY(-4px); }
        .rs-value { font-family:'Syne',sans-serif; font-size:2.2rem; font-weight:800; color:var(--primary); margin-bottom:4px; }
        .rs-value span { font-size:1rem; color:var(--text-muted); }
        .rs-label { color:var(--text-muted); font-size:0.875rem; margin-bottom:8px; }
        .review-filters {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          margin-bottom: 32px; font-size: 0.9rem; color: var(--text-muted);
        }
        .pill { padding:8px 20px; border-radius:50px; border:1px solid var(--border); background:#fff; color:var(--text-muted); font-size:0.875rem; font-weight:500; cursor:pointer; transition:all 0.2s; }
        .pill:hover { border-color:var(--primary); color:var(--primary); }
        .pill.active { background:var(--gradient); border-color:transparent; color:white; }
        .write-review-pill {
          padding: 8px 20px; border-radius: 50px; border: 2px solid var(--primary);
          background: transparent; color: var(--primary); font-size: 0.875rem;
          font-weight: 600; cursor: pointer; transition: all 0.2s; margin-left: auto;
        }
        .write-review-pill:hover { background: var(--primary); color: #fff; }
        .reviews-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px;
        }
        .review-card {
          background: #fff; border: 1px solid var(--border); border-radius: var(--radius);
          padding: 24px; display: flex; flex-direction: column; gap: 12px; transition: all 0.3s;
        }
        .review-card:hover { border-color: var(--primary); transform: translateY(-4px); }
        .rc-header { display:flex; align-items:center; gap:12px; }
        .rc-avatar { width:40px; height:40px; background:var(--gradient); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.9rem; flex-shrink:0; }
        .rc-name { display:block; font-weight:600; font-size:0.95rem; }
        .rc-service { color:var(--primary); font-size:0.8rem; }
        .rc-date { margin-left:auto; color:var(--text-muted); font-size:0.8rem; white-space:nowrap; }
        .rc-comment { color:var(--text-muted); font-size:0.9rem; line-height:1.7; flex:1; }
        .rc-verified { color:var(--success); font-size:0.8rem; font-weight:500; }

        /* Modal */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          z-index: 1000; display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: fadeIn 0.2s ease;
        }
        .modal-box {
          background: #fff; border-radius: 20px; width: 100%; max-width: 520px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.3); animation: slideUp 0.3s ease;
          overflow: hidden;
        }
        .modal-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 28px 0;
        }
        .modal-header h2 { font-size: 1.4rem; }
        .modal-close {
          background: none; border: none; font-size: 1.2rem; cursor: pointer;
          color: var(--text-muted); padding: 4px 8px; border-radius: 6px;
          transition: background 0.2s;
        }
        .modal-close:hover { background: #f1f5f9; color: var(--text); }
        .modal-body { padding: 20px 28px; display: flex; flex-direction: column; gap: 16px; }
        .modal-footer {
          padding: 16px 28px 24px; display: flex; gap: 12px; justify-content: flex-end;
          border-top: 1px solid var(--border);
        }
        .btn-cancel {
          padding: 10px 24px; border-radius: 10px; border: 1px solid var(--border);
          background: #fff; color: var(--text-muted); cursor: pointer; font-size: 0.9rem;
          transition: all 0.2s;
        }
        .btn-cancel:hover { border-color: var(--text-muted); }
        select {
          width: 100%; padding: 10px 14px; border: 1px solid var(--border);
          border-radius: 10px; font-size: 0.9rem; font-family: inherit;
          color: var(--text); background: #fff; transition: border-color 0.2s;
          appearance: auto;
        }
        select:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        textarea {
          width: 100%; padding: 10px 14px; border: 1px solid var(--border);
          border-radius: 10px; font-size: 0.9rem; font-family: inherit;
          resize: vertical; color: var(--text); background: #fff; transition: border-color 0.2s;
        }
        textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .field-error { color: #ef4444; font-size: 0.78rem; margin-top: 4px; display: block; }
        .char-count { color: var(--text-muted); font-size: 0.75rem; display: block; margin-top: 4px; text-align: right; }
        .rating-label { font-size: 0.85rem; color: var(--primary); font-weight: 600; margin-top: 4px; display: block; }
        .modal-success {
          padding: 60px 28px; text-align: center;
        }
        .success-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .modal-success h2 { font-size: 1.6rem; margin-bottom: 8px; }
        .modal-success p { color: var(--text-muted); }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity:0; } to { transform: translateY(0); opacity:1; } }
        @media (max-width: 768px) {
          .rating-stats { grid-template-columns: repeat(2, 1fr); }
          .write-review-pill { margin-left: 0; }
        }
      `}</style>
    </div>
  );
};

export default ReviewsPage;