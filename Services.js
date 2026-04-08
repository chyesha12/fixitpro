import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';

const DEMO_SERVICES = [
  { id:1, name:'Plumbing Repair', category:'Plumbing', description:'Fix leaks, pipes, drains and all plumbing issues', base_price:499, duration_minutes:90, icon:'🔧', rating:4.7, total_reviews:234 },
  { id:2, name:'Electrical Wiring', category:'Electrical', description:'Safe electrical installation and repair services', base_price:599, duration_minutes:120, icon:'⚡', rating:4.8, total_reviews:189 },
  { id:3, name:'AC Repair & Service', category:'HVAC', description:'AC repair, cleaning, gas refilling and maintenance', base_price:699, duration_minutes:120, icon:'❄️', rating:4.6, total_reviews:312 },
  { id:4, name:'Appliance Repair', category:'Appliance', description:'Repair of washing machines, refrigerators, microwaves', base_price:449, duration_minutes:90, icon:'🔨', rating:4.5, total_reviews:156 },
  { id:5, name:'Carpentry Work', category:'Carpentry', description:'Furniture assembly, repair, custom woodwork', base_price:549, duration_minutes:180, icon:'🪚', rating:4.7, total_reviews:98 },
  { id:6, name:'Painting Services', category:'Painting', description:'Interior and exterior painting for homes and offices', base_price:799, duration_minutes:240, icon:'🎨', rating:4.8, total_reviews:143 },
  { id:7, name:'Deep Cleaning', category:'Cleaning', description:'Full home deep cleaning with professional equipment', base_price:999, duration_minutes:300, icon:'🧹', rating:4.9, total_reviews:278 },
  { id:8, name:'Pest Control', category:'Pest Control', description:'Effective pest control for home and office spaces', base_price:599, duration_minutes:120, icon:'🐛', rating:4.6, total_reviews:167 },
  { id:9, name:'CCTV Installation', category:'Security', description:'CCTV camera setup, networking and monitoring', base_price:1299, duration_minutes:180, icon:'📹', rating:4.7, total_reviews:89 },
  { id:10, name:'Internet & Networking', category:'IT Services', description:'WiFi setup, network configuration, cable management', base_price:499, duration_minutes:90, icon:'🌐', rating:4.5, total_reviews:112 },
  { id:11, name:'Water Purifier Service', category:'Appliance', description:'RO service, filter change, water purifier repair', base_price:349, duration_minutes:60, icon:'💧', rating:4.6, total_reviews:201 },
  { id:12, name:'Gas Stove Repair', category:'Appliance', description:'Gas stove cleaning, burner repair and servicing', base_price:299, duration_minutes:60, icon:'🔥', rating:4.4, total_reviews:134 },
  { id:13, name:'Bathroom Renovation', category:'Renovation', description:'Complete bathroom renovation and tiling work', base_price:4999, duration_minutes:480, icon:'🚿', rating:4.8, total_reviews:56 },
  { id:14, name:'Solar Panel Service', category:'Electrical', description:'Solar panel installation, cleaning and maintenance', base_price:1999, duration_minutes:240, icon:'☀️', rating:4.7, total_reviews:43 },
  { id:15, name:'Home Shifting', category:'Moving', description:'Safe and reliable home shifting and packing services', base_price:2999, duration_minutes:360, icon:'📦', rating:4.5, total_reviews:78 },
];

const Services = () => {
  const [services, setServices] = useState(DEMO_SERVICES);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/services/').then(res => {
      setServices(res.data);
    }).catch(() => {
      setServices(DEMO_SERVICES);
    }).finally(() => setLoading(false));

    axios.get('/api/services/categories').then(res => {
      setCategories(['All', ...res.data]);
    }).catch(() => {
      const cats = ['All', ...new Set(DEMO_SERVICES.map(s => s.category))];
      setCategories(cats);
    });
  }, []);

  let filtered = services.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === 'price_asc') filtered = [...filtered].sort((a, b) => a.base_price - b.base_price);
  else if (sortBy === 'price_desc') filtered = [...filtered].sort((a, b) => b.base_price - a.base_price);
  else if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <div className="services-page">
      <div className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Professional home services at your fingertips. Choose from 15+ categories.</p>
        </div>
      </div>

      <div className="container" style={{paddingTop:'40px', paddingBottom:'80px'}}>
        {/* Filters */}
        <div className="filters-bar">
          <div className="search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
            <option value="default">Sort: Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {categories.map(cat => (
            <button
              key={cat}
              className={`pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="results-info">
          Showing <strong>{filtered.length}</strong> services
          {activeCategory !== 'All' && <span> in <strong>{activeCategory}</strong></span>}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{fontSize:'4rem', marginBottom:'16px'}}>🔍</div>
            <h3>No services found</h3>
            <p>Try a different search or category</p>
          </div>
        ) : (
          <div className="services-grid">
            {filtered.map(s => <ServiceCard key={s.id} service={s} />)}
          </div>
        )}
      </div>

      <style>{`
        .services-page {}
        .page-header { padding: 120px 0 60px; background: var(--gradient-hero); position: relative; overflow: hidden; }
        .page-header::after {
          content: '';
          position: absolute;
          top: -50%; right: -10%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,107,53,0.15), transparent 70%);
          border-radius: 50%;
        }
        .page-header h1 { font-size: 3rem; margin-bottom: 12px; }
        .page-header p { color: var(--text-muted); font-size: 1.1rem; }
        .filters-bar {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 12px 20px;
          min-width: 240px;
        }
        .search-box input {
          background: none;
          border: none;
          outline: none;
          color: var(--text);
          font-size: 0.95rem;
          width: 100%;
        }
        .search-box input::placeholder { color: var(--text-muted); }
        .sort-select {
          padding: 12px 20px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 50px;
          color: var(--text);
          font-size: 0.9rem;
          cursor: pointer;
          outline: none;
        }
        .sort-select:focus { border-color: var(--primary); }
        .category-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }
        .pill {
          padding: 8px 20px;
          border-radius: 50px;
          border: 1px solid var(--border);
          background: #fff;
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pill:hover { border-color: var(--primary); color: var(--primary); }
        .pill.active {
          background: var(--gradient);
          border-color: transparent;
          color: white;
        }
        .results-info {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 24px;
        }
        .results-info strong { color: var(--text); }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: var(--text-muted);
        }
        .empty-state h3 { font-size: 1.4rem; margin-bottom: 8px; color: var(--text); }
      `}</style>
    </div>
  );
};

export default Services;
