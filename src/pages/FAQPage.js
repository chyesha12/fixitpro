import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    category: 'Booking',
    items: [
      { q: 'How do I book a service on FixItPro?', a: 'Simply browse our services, select one, choose your preferred date & time, fill in your address details, and confirm your booking. You\'ll receive a booking confirmation instantly.' },
      { q: 'Can I reschedule or cancel my booking?', a: 'Yes! You can cancel or reschedule a booking up to 2 hours before the scheduled time at no extra charge. Go to "My Bookings" and select the booking you want to modify.' },
      { q: 'How far in advance can I book a service?', a: 'You can book a service up to 30 days in advance. For urgent requirements, same-day bookings are also available for most services, subject to technician availability.' },
      { q: 'What happens if no technician is available?', a: 'In rare cases where no technician is available for your selected slot, we\'ll notify you immediately and suggest the next available slot or a full refund.' },
    ]
  },
  {
    category: 'Services & Technicians',
    items: [
      { q: 'Are your technicians verified and trained?', a: 'Yes! Every technician on FixItPro goes through a rigorous background verification, skill assessment, and training program before being onboarded. They are also rated by customers continuously.' },
      { q: 'What areas do you serve?', a: 'We currently operate in 50+ cities across Gujarat, Maharashtra, Rajasthan, Delhi NCR, Karnataka, and Tamil Nadu. Enter your pincode at booking to check availability in your area.' },
      { q: 'Do you provide a warranty on services?', a: 'Yes! All services come with a 30-day service warranty. If you face any issues related to the service within 30 days, we\'ll send a technician at no additional cost.' },
      { q: 'Can I request a specific technician?', a: 'Yes, if you\'ve had a satisfactory experience with a technician before, you can request them by name while booking. Subject to their availability.' },
    ]
  },
  {
    category: 'Payments',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept all major payment methods including credit/debit cards, UPI (PhonePe, Google Pay, Paytm), net banking, and cash on service completion.' },
      { q: 'Are there any hidden charges?', a: 'No! Our pricing is completely transparent. The price shown at booking includes labor charges. Any additional parts or materials needed are communicated upfront before work begins.' },
      { q: 'How do I get a refund?', a: 'If you cancel before the cutoff time or if we fail to deliver the service, a full refund is processed within 5-7 business days to your original payment method.' },
      { q: 'Is it safe to pay online?', a: 'Absolutely. We use industry-standard SSL encryption and trusted payment gateways (Razorpay/Stripe) for all online transactions. Your payment information is never stored on our servers.' },
    ]
  },
  {
    category: 'Tracking & Safety',
    items: [
      { q: 'How does real-time tracking work?', a: 'Once your booking is confirmed and a technician is assigned, you\'ll see a live map on your "Track Booking" page. The technician\'s location updates every 30 seconds as they travel to your location.' },
      { q: 'What safety measures are in place?', a: 'All technicians carry a verified ID card. Our platform shares technician details (name, photo, rating, phone) before they arrive. You can call our safety helpline 24/7 if needed.' },
      { q: 'What if I\'m not satisfied with the service?', a: 'Your satisfaction is our priority. If you\'re not happy, contact us within 48 hours and we\'ll arrange a redo or a refund at our discretion. Rate your technician after each service.' },
    ]
  },
];

const FAQPage = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const allItems = FAQS.flatMap((cat, ci) => cat.items.map((item, ii) => ({ ...item, category: cat.category, key: `${ci}-${ii}` })));
  const filtered = activeCategory === 'All' ? allItems : allItems.filter(i => i.category === activeCategory);

  return (
    <div className="faq-page">
      <div className="page-header">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to the most common questions about FixItPro</p>
        </div>
      </div>

      <div className="container faq-container">
        {/* Category filter */}
        <div className="faq-categories">
          {['All', ...FAQS.map(f => f.category)].map(cat => (
            <button key={cat} className={`pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="faq-list">
          {filtered.map((item) => (
            <div key={item.key}
              className={`faq-item ${openIdx === item.key ? 'open' : ''}`}
              onClick={() => setOpenIdx(openIdx === item.key ? null : item.key)}>
              <div className="faq-question">
                <span>{item.q}</span>
                <div className="faq-chevron">{openIdx === item.key ? '−' : '+'}</div>
              </div>
              {openIdx === item.key && (
                <div className="faq-answer animate-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="faq-cta">
          <h3>Still have questions?</h3>
          <p>Our support team is available 7 days a week to help you out.</p>
          <Link to="/contact" className="btn btn-primary">Contact Support</Link>
        </div>
      </div>

      <style>{`
        .faq-page {}
        .page-header { padding: 120px 0 60px; background: var(--gradient-hero); }
        .page-header h1 { font-size: 3rem; margin-bottom: 12px; }
        .page-header p { color: var(--text-muted); }
        .faq-container { padding-top: 50px; padding-bottom: 80px; max-width: 860px; }
        .faq-categories { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 36px; }
        .pill { padding:8px 20px; border-radius:50px; border:1px solid var(--border); background:#fff; color:var(--text-muted); font-size:0.875rem; font-weight:500; cursor:pointer; transition:all 0.2s; }
        .pill:hover { border-color:var(--primary); color:var(--primary); }
        .pill.active { background:var(--gradient); border-color:transparent; color:white; }
        .faq-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 60px; }
        .faq-item {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          overflow: hidden;
        }
        .faq-item:hover { border-color: var(--primary); }
        .faq-item.open { border-color: var(--primary); }
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          font-weight: 600;
          font-size: 0.975rem;
          line-height: 1.5;
        }
        .faq-chevron {
          width: 28px; height: 28px;
          background: #eff6ff;
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 400;
          flex-shrink: 0;
        }
        .faq-answer {
          padding: 0 24px 20px;
          color: var(--text-muted);
          line-height: 1.8;
          font-size: 0.925rem;
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }
        .faq-cta {
          text-align: center;
          background: linear-gradient(135deg, rgba(255,107,53,0.1), rgba(15,52,96,0.2));
          border: 1px solid rgba(255,107,53,0.2);
          border-radius: var(--radius);
          padding: 48px;
        }
        .faq-cta h3 { font-size: 1.5rem; margin-bottom: 8px; }
        .faq-cta p { color: var(--text-muted); margin-bottom: 24px; }
      `}</style>
    </div>
  );
};

export default FAQPage;
