import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TrackingPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [techLoc, setTechLoc] = useState(null);
  const [status, setStatus] = useState('in_progress');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Demo coordinates for Ahmedabad
  const DEMO_USER_LOC = { lat: 23.0225, lng: 72.5714 };
  const DEMO_TECH_LOC = { lat: 23.0335, lng: 72.5614 };

  useEffect(() => {
    fetchBooking();
    const interval = setInterval(fetchLocation, 10000);
    return () => clearInterval(interval);
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const res = await axios.get(`/api/bookings/${bookingId}`);
      setBooking(res.data);
    } catch {
      setBooking(DEMO_BOOKING);
    }
  };

  const fetchLocation = async () => {
    try {
      const res = await axios.get(`/api/tracking/${bookingId}`);
      setTechLoc({ lat: res.data.lat, lng: res.data.lng });
    } catch {
      // Simulate movement for demo
      setTechLoc(prev => prev ? {
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      } : DEMO_TECH_LOC);
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize Leaflet map
    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current).setView([DEMO_USER_LOC.lat, DEMO_USER_LOC.lng], 14);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // User marker
    const userIcon = L.divIcon({
      html: '<div style="background:#ff6b35;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>',
      iconSize: [16, 16], iconAnchor: [8, 8], className: ''
    });
    L.marker([DEMO_USER_LOC.lat, DEMO_USER_LOC.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup('📍 Your Location');

    // Technician marker
    const techIcon = L.divIcon({
      html: '<div style="background:#22c55e;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;font-size:10px">👨‍🔧</div>',
      iconSize: [20, 20], iconAnchor: [10, 10], className: ''
    });
    const techMarker = L.marker([DEMO_TECH_LOC.lat, DEMO_TECH_LOC.lng], { icon: techIcon })
      .addTo(map)
      .bindPopup('👨‍🔧 Technician Location');
    markerRef.current = techMarker;

    setTechLoc(DEMO_TECH_LOC);
  }, []);

  useEffect(() => {
    if (!techLoc || !markerRef.current) return;
    markerRef.current.setLatLng([techLoc.lat, techLoc.lng]);
  }, [techLoc]);

  const STEPS = [
    { label: 'Booking Confirmed', done: true, icon: '✅' },
    { label: 'Technician Assigned', done: true, icon: '👨‍🔧' },
    { label: 'On the Way', done: status === 'in_progress' || status === 'completed', icon: '🚗' },
    { label: 'Service in Progress', done: status === 'completed', icon: '🔧' },
    { label: 'Completed', done: status === 'completed', icon: '🎉' },
  ];

  return (
    <div className="tracking-page">
      {/* Leaflet CSS */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

      <div className="page-header">
        <div className="container">
          <Link to="/my-bookings" className="back-link">← Back to Bookings</Link>
          <h1>📍 Live Tracking</h1>
          <p>Booking #{bookingId} · Technician is on the way</p>
        </div>
      </div>

      <div className="container tracking-container">
        <div className="tracking-grid">
          {/* Map */}
          <div className="map-section">
            <div className="map-header">
              <h3>Real-Time Location</h3>
              <span className="live-badge">🔴 LIVE</span>
            </div>
            <div ref={mapRef} className="map-container" id="tracking-map">
              {/* Map renders here */}
              <div className="map-fallback">
                <div style={{textAlign:'center', padding:'60px 20px', color:'var(--text-muted)'}}>
                  <div style={{fontSize:'3rem', marginBottom:'16px'}}>🗺️</div>
                  <p>Map loading... (Leaflet.js required)</p>
                  <p style={{fontSize:'0.8rem', marginTop:'8px'}}>Real-time tracking with OpenStreetMap</p>
                </div>
              </div>
            </div>
            {techLoc && (
              <div className="location-info">
                <span>📍 Technician at: {techLoc.lat?.toFixed(4)}, {techLoc.lng?.toFixed(4)}</span>
                <span>🕐 ETA: ~15 minutes</span>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="tracking-info">
            {/* Status steps */}
            <div className="tracking-card">
              <h3>Order Status</h3>
              <div className="status-steps">
                {STEPS.map((step, i) => (
                  <div key={i} className={`status-step ${step.done ? 'done' : ''}`}>
                    <div className="step-circle">{step.done ? '✓' : step.icon}</div>
                    <div className="step-line"></div>
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technician info */}
            <div className="tracking-card tech-card">
              <h3>Your Technician</h3>
              <div className="tech-profile">
                <div className="tech-avatar">RK</div>
                <div>
                  <strong>Rajesh Kumar</strong>
                  <div style={{color:'var(--text-muted)', fontSize:'0.85rem'}}>Plumbing Expert · ★ 4.8</div>
                  <div style={{color:'var(--text-muted)', fontSize:'0.85rem'}}>📞 +91 98765 43210</div>
                </div>
                <a href="tel:+919876543210" className="btn btn-primary" style={{padding:'8px 16px', fontSize:'0.8rem', marginLeft:'auto'}}>
                  📞 Call
                </a>
              </div>
            </div>

            {/* Booking details */}
            <div className="tracking-card">
              <h3>Booking Details</h3>
              <div className="detail-rows">
                <div className="detail-row"><span>Service</span><span>{booking?.service_name || 'Plumbing Repair'}</span></div>
                <div className="detail-row"><span>Date</span><span>{booking?.scheduled_date || '2024-12-25'}</span></div>
                <div className="detail-row"><span>Time</span><span>{booking?.scheduled_time || '10:00 AM'}</span></div>
                <div className="detail-row"><span>Address</span><span>{booking?.address || '123 Main St, Ahmedabad'}</span></div>
                <div className="detail-row"><span>Amount</span><span style={{color:'var(--primary)', fontWeight:'700'}}>₹{booking?.total_amount || 499}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tracking-page {}
        .page-header { padding: 120px 0 40px; background: var(--gradient-hero); }
        .back-link { color: var(--primary); text-decoration: none; font-size: 0.9rem; display: inline-block; margin-bottom: 12px; }
        .page-header h1 { font-size: 2rem; margin-bottom: 8px; }
        .page-header p { color: var(--text-muted); }
        .tracking-container { padding-top: 40px; padding-bottom: 80px; }
        .tracking-grid { display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start; }
        .map-section {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
        }
        .map-header h3 { font-size: 1rem; }
        .live-badge {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          animation: pulse 1.5s infinite;
        }
        .map-container {
          height: 450px;
          background: #1a1a2e;
          position: relative;
        }
        .map-fallback {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          z-index: 0;
        }
        .location-info {
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          background: rgba(255,107,53,0.03);
        }
        .tracking-info { display: flex; flex-direction: column; gap: 16px; }
        .tracking-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
        }
        .tracking-card h3 { font-size: 1rem; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
        .status-steps { display: flex; flex-direction: column; gap: 0; }
        .status-step {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          padding-bottom: 20px;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .status-step:last-child { padding-bottom: 0; }
        .status-step.done { color: var(--text); }
        .step-circle {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          flex-shrink: 0;
          background: var(--bg);
          z-index: 1;
        }
        .status-step.done .step-circle {
          background: var(--gradient);
          border-color: transparent;
          color: white;
        }
        .step-line {
          position: absolute;
          left: 15px;
          top: 32px;
          width: 2px;
          height: calc(100% - 32px);
          background: var(--border);
        }
        .status-step.done .step-line { background: var(--primary); }
        .status-step:last-child .step-line { display: none; }
        .tech-profile { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .tech-avatar {
          width: 48px; height: 48px;
          background: var(--gradient);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.9rem;
          flex-shrink: 0;
        }
        .detail-rows { display: flex; flex-direction: column; gap: 10px; }
        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }
        .detail-row:last-child { border-bottom: none; padding-bottom: 0; }
        .detail-row span:first-child { color: var(--text-muted); }
        .detail-row span:last-child { font-weight: 500; max-width: 200px; text-align: right; }
        @media (max-width: 900px) {
          .tracking-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

const DEMO_BOOKING = {
  service_name: 'Plumbing Repair', scheduled_date: '2024-12-25',
  scheduled_time: '10:00', address: '123 Main St, Ahmedabad', total_amount: 499
};

export default TrackingPage;
