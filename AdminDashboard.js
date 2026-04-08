import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

// ── Demo data ──────────────────────────────────────────────
const DEMO_STATS = { total_users:1248, total_bookings:3847, total_revenue:1924350, total_services:15, pending_bookings:42, completed_bookings:3521, active_technicians:87, unread_messages:14 };
const DEMO_BOOKINGS = [
  { id:1, booking_code:'BK10023456', user_name:'Ravi Sharma',    service_name:'Plumbing Repair',   technician_name:'Rajesh Kumar', status:'confirmed',   total_amount:499,  scheduled_date:'2024-12-25', city:'Ahmedabad' },
  { id:2, booking_code:'BK10034567', user_name:'Meena Patel',    service_name:'AC Repair',          technician_name:'Suresh Patel', status:'in_progress', total_amount:699,  scheduled_date:'2024-12-24', city:'Surat' },
  { id:3, booking_code:'BK10045678', user_name:'Ankit Verma',    service_name:'Deep Cleaning',      technician_name:'Unassigned',   status:'pending',     total_amount:999,  scheduled_date:'2024-12-26', city:'Vadodara' },
  { id:4, booking_code:'BK10056789', user_name:'Sunita Gupta',   service_name:'Electrical Wiring',  technician_name:'Amit Singh',   status:'completed',   total_amount:599,  scheduled_date:'2024-12-22', city:'Rajkot' },
  { id:5, booking_code:'BK10067890', user_name:'Pradeep Joshi',  service_name:'Pest Control',       technician_name:'Vijay Rao',    status:'cancelled',   total_amount:599,  scheduled_date:'2024-12-20', city:'Ahmedabad' },
  { id:6, booking_code:'BK10078901', user_name:'Kavita Shah',    service_name:'Painting Services',  technician_name:'Dinesh Mehta', status:'confirmed',   total_amount:799,  scheduled_date:'2024-12-27', city:'Surat' },
];
const DEMO_USERS = [
  { id:1, name:'Ravi Sharma',   email:'ravi@gmail.com',   phone:'9876543210', role:'customer',   created_at:'2024-11-01', total_bookings:5 },
  { id:2, name:'Meena Patel',   email:'meena@gmail.com',  phone:'9865432109', role:'customer',   created_at:'2024-11-05', total_bookings:3 },
  { id:3, name:'Rajesh Kumar',  email:'rajesh@gmail.com', phone:'9854321098', role:'technician', created_at:'2024-10-15', total_bookings:45 },
  { id:4, name:'Suresh Patel',  email:'suresh@gmail.com', phone:'9843210987', role:'technician', created_at:'2024-10-20', total_bookings:62 },
  { id:5, name:'Admin User',    email:'admin@fixitpro.in',phone:'9832109876', role:'admin',      created_at:'2024-09-01', total_bookings:0 },
];
const DEMO_SERVICES = [
  { id:1, name:'Plumbing Repair',      category:'Plumbing',   base_price:499,  is_active:true,  total_reviews:234, rating:4.7 },
  { id:2, name:'Electrical Wiring',    category:'Electrical', base_price:599,  is_active:true,  total_reviews:189, rating:4.8 },
  { id:3, name:'AC Repair & Service',  category:'HVAC',       base_price:699,  is_active:true,  total_reviews:312, rating:4.6 },
  { id:4, name:'Deep Cleaning',        category:'Cleaning',   base_price:999,  is_active:true,  total_reviews:278, rating:4.9 },
  { id:5, name:'Pest Control',         category:'Pest Control',base_price:599, is_active:false, total_reviews:167, rating:4.6 },
];
const DEMO_MESSAGES = [
  { id:1, name:'Amit Shah',    email:'amit@gmail.com', subject:'Booking Issue',    message:'My technician did not arrive on time...', status:'unread', created_at:'2024-12-24' },
  { id:2, name:'Priya Nair',   email:'priya@gmail.com',subject:'Payment Problem',  message:'I was charged twice for the service...', status:'unread', created_at:'2024-12-23' },
  { id:3, name:'Rohit Verma',  email:'rohit@gmail.com',subject:'Service Feedback', message:'Excellent work by the plumber!',          status:'read',   created_at:'2024-12-22' },
];

const STAT_CARDS = (s) => [
  { label:'Total Users',      value:s.total_users?.toLocaleString(),       icon:'👥', color:'#6366f1', bg:'rgba(37,99,235,0.07)',  change:'+12%' },
  { label:'Total Bookings',   value:s.total_bookings?.toLocaleString(),    icon:'📋', color:'#06b6d4', bg:'rgba(6,182,212,0.1)',   change:'+8%'  },
  { label:'Revenue (₹)',      value:'₹'+(s.total_revenue/100000).toFixed(1)+'L', icon:'💰', color:'#10b981', bg:'rgba(16,185,129,0.1)', change:'+18%' },
  { label:'Pending Bookings', value:s.pending_bookings,                   icon:'⏳', color:'#f59e0b', bg:'rgba(245,158,11,0.1)',  change:'' },
  { label:'Active Techs',     value:s.active_technicians,                 icon:'👨‍🔧', color:'#8b5cf6', bg:'rgba(139,92,246,0.1)',  change:'+3'   },
  { label:'Unread Messages',  value:s.unread_messages,                    icon:'✉️', color:'#ef4444', bg:'rgba(239,68,68,0.1)',   change:'' },
];

const STATUS_STYLE = {
  pending:    { color:'#f59e0b', bg:'rgba(245,158,11,0.12)'   },
  confirmed:  { color:'#06b6d4', bg:'rgba(6,182,212,0.12)'    },
  in_progress:{ color:'#8b5cf6', bg:'rgba(139,92,246,0.12)'   },
  completed:  { color:'#10b981', bg:'rgba(16,185,129,0.12)'   },
  cancelled:  { color:'#ef4444', bg:'rgba(239,68,68,0.12)'    },
};

// ── Component ──────────────────────────────────────────────
const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(DEMO_STATS);
  const [bookings, setBookings] = useState(DEMO_BOOKINGS);
  const [users, setUsers] = useState(DEMO_USERS);
  const [services, setServices] = useState(DEMO_SERVICES);
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [searchB, setSearchB] = useState('');
  const [searchU, setSearchU] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Fetch real data (falls back to demo)
    axios.get('/api/bookings/all').then(r => setBookings(r.data)).catch(()=>{});
    axios.get('/api/auth/users').then(r => setUsers(r.data)).catch(()=>{});
    axios.get('/api/services/').then(r => setServices(r.data)).catch(()=>{});
  }, []);

  const filteredBookings = bookings.filter(b => {
    const matchSearch = b.booking_code?.includes(searchB) || b.user_name?.toLowerCase().includes(searchB.toLowerCase()) || b.service_name?.toLowerCase().includes(searchB.toLowerCase());
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const TABS = [
    { id:'dashboard', label:'Dashboard',  icon:'📊' },
    { id:'bookings',  label:'Bookings',   icon:'📋' },
    { id:'users',     label:'Users',      icon:'👥' },
    { id:'services',  label:'Services',   icon:'🔧' },
    { id:'messages',  label:'Messages',   icon:'✉️', badge: messages.filter(m=>m.status==='unread').length },
  ];

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">F</div>
          <span>FixIt<span>Pro</span></span>
        </div>
        <nav className="sidebar-nav">
          {TABS.map(t => (
            <button key={t.id} className={`sidebar-item ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
              {t.badge > 0 && <span className="nav-badge">{t.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sb-user">
            <div className="sb-avatar">{(user?.name||'A')[0].toUpperCase()}</div>
            <div><div className="sb-name">{user?.name||'Admin'}</div><div className="sb-role">Administrator</div></div>
          </div>
          <Link to="/" className="btn btn-ghost" style={{width:'100%',justifyContent:'center',marginTop:12,fontSize:'0.82rem'}}>← Back to Site</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>{TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label}</h1>
            <p>Manage your FixItPro platform</p>
          </div>
          <div className="admin-header-right">
            <span className="admin-date">{new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</span>
          </div>
        </div>

        {/* ── DASHBOARD TAB ── */}
        {tab === 'dashboard' && (
          <div className="tab-content">
            <div className="stats-grid">
              {STAT_CARDS(stats).map((s,i)=>(
                <div className="stat-card" key={i} style={{'--c':s.color,'--bg':s.bg}}>
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-body">
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                  {s.change && <div className="stat-change">↑ {s.change}</div>}
                </div>
              ))}
            </div>

            <div className="dash-grid">
              <div className="admin-card">
                <h3>Recent Bookings</h3>
                <div className="mini-table">
                  {bookings.slice(0,5).map(b=>{
                    const st = STATUS_STYLE[b.status]||STATUS_STYLE.pending;
                    return (
                      <div className="mini-row" key={b.id}>
                        <div>
                          <div className="mini-code">{b.booking_code}</div>
                          <div className="mini-sub">{b.service_name}</div>
                        </div>
                        <div className="mini-user">{b.user_name}</div>
                        <span className="status-chip" style={{color:st.color,background:st.bg}}>● {b.status}</span>
                        <span className="mini-price">₹{b.total_amount}</span>
                      </div>
                    );
                  })}
                </div>
                <button className="btn btn-ghost" style={{marginTop:12,fontSize:'0.82rem'}} onClick={()=>setTab('bookings')}>View All Bookings →</button>
              </div>

              <div className="admin-card">
                <h3>Quick Stats</h3>
                <div className="quick-stats">
                  {[
                    ['Total Revenue','₹'+stats.total_revenue?.toLocaleString(),'💰'],
                    ['Avg Booking Value','₹'+(stats.total_revenue/stats.total_bookings||0).toFixed(0),'📈'],
                    ['Completion Rate',Math.round((stats.completed_bookings/stats.total_bookings)*100)+'%','✅'],
                    ['Active Services',stats.total_services,'🔧'],
                  ].map(([l,v,i])=>(
                    <div className="qs-row" key={l}>
                      <span>{i} {l}</span><strong>{v}</strong>
                    </div>
                  ))}
                </div>

                <h3 style={{marginTop:24}}>Messages</h3>
                <div className="quick-stats">
                  {messages.slice(0,3).map(m=>(
                    <div className="qs-row" key={m.id}>
                      <span>{m.status==='unread'?'🔴':'✅'} {m.name} — {m.subject}</span>
                      <span style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{m.created_at}</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-ghost" style={{marginTop:12,fontSize:'0.82rem'}} onClick={()=>setTab('messages')}>View All Messages →</button>
              </div>
            </div>
          </div>
        )}

        {/* ── BOOKINGS TAB ── */}
        {tab === 'bookings' && (
          <div className="tab-content">
            <div className="table-toolbar">
              <input className="table-search" placeholder="Search by code, user, service..." value={searchB} onChange={e=>setSearchB(e.target.value)} />
              <select className="table-filter" value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
                {['all','pending','confirmed','in_progress','completed','cancelled'].map(s=>(
                  <option key={s} value={s}>{s==='all'?'All Status':s.replace('_',' ')}</option>
                ))}
              </select>
              <span className="table-count">{filteredBookings.length} bookings</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr>
                  <th>Code</th><th>Customer</th><th>Service</th><th>Technician</th>
                  <th>Date</th><th>City</th><th>Amount</th><th>Status</th><th>Action</th>
                </tr></thead>
                <tbody>
                  {filteredBookings.map(b=>{
                    const st = STATUS_STYLE[b.status]||STATUS_STYLE.pending;
                    return (
                      <tr key={b.id}>
                        <td><code>{b.booking_code}</code></td>
                        <td>{b.user_name}</td>
                        <td>{b.service_name}</td>
                        <td>{b.technician_name}</td>
                        <td>{b.scheduled_date}</td>
                        <td>{b.city}</td>
                        <td style={{fontWeight:700,color:'var(--primary-light)'}}>₹{b.total_amount}</td>
                        <td><span className="status-chip" style={{color:st.color,background:st.bg}}>● {b.status}</span></td>
                        <td>
                          <select className="action-select"
                            value={b.status}
                            onChange={e=>{
                              setBookings(prev=>prev.map(x=>x.id===b.id?{...x,status:e.target.value}:x));
                              toast.success('Status updated');
                            }}>
                            {['pending','confirmed','in_progress','completed','cancelled'].map(s=><option key={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── USERS TAB ── */}
        {tab === 'users' && (
          <div className="tab-content">
            <div className="table-toolbar">
              <input className="table-search" placeholder="Search users..." value={searchU} onChange={e=>setSearchU(e.target.value)} />
              <span className="table-count">{users.length} users</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Bookings</th><th>Action</th></tr></thead>
                <tbody>
                  {users.filter(u=>u.name?.toLowerCase().includes(searchU.toLowerCase())||u.email?.toLowerCase().includes(searchU.toLowerCase())).map(u=>(
                    <tr key={u.id}>
                      <td>#{u.id}</td>
                      <td>
                        <div style={{display:'flex',alignItems:'center',gap:8}}>
                          <div style={{width:32,height:32,borderRadius:'50%',background:'var(--gradient)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'0.8rem',flexShrink:0}}>{u.name?.[0]}</div>
                          {u.name}
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>
                        <span className="status-chip" style={
                          u.role==='admin'?{color:'#ef4444',background:'rgba(239,68,68,0.1)'}:
                          u.role==='technician'?{color:'#8b5cf6',background:'rgba(139,92,246,0.1)'}:
                          {color:'#06b6d4',background:'rgba(6,182,212,0.1)'}
                        }>{u.role}</span>
                      </td>
                      <td>{u.created_at}</td>
                      <td>{u.total_bookings}</td>
                      <td>
                        <select className="action-select"
                          value={u.role}
                          onChange={e=>{
                            setUsers(prev=>prev.map(x=>x.id===u.id?{...x,role:e.target.value}:x));
                            toast.success('Role updated');
                          }}>
                          <option>customer</option>
                          <option>technician</option>
                          <option>admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── SERVICES TAB ── */}
        {tab === 'services' && (
          <div className="tab-content">
            <div className="table-toolbar">
              <span className="table-count">{services.length} services</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>ID</th><th>Service</th><th>Category</th><th>Price</th><th>Rating</th><th>Reviews</th><th>Status</th><th>Toggle</th></tr></thead>
                <tbody>
                  {services.map(s=>(
                    <tr key={s.id}>
                      <td>#{s.id}</td>
                      <td style={{fontWeight:600}}>{s.name}</td>
                      <td><span className="status-chip" style={{color:'var(--primary-light)',background:'rgba(37,99,235,0.07)'}}>{s.category}</span></td>
                      <td style={{color:'var(--primary-light)',fontWeight:700}}>₹{s.base_price}</td>
                      <td>⭐ {s.rating}</td>
                      <td>{s.total_reviews}</td>
                      <td>
                        <span className="status-chip" style={s.is_active?{color:'#10b981',background:'rgba(16,185,129,0.1)'}:{color:'#ef4444',background:'rgba(239,68,68,0.1)'}}>
                          {s.is_active?'Active':'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button className={`toggle-btn ${s.is_active?'on':'off'}`}
                          onClick={()=>{ setServices(prev=>prev.map(x=>x.id===s.id?{...x,is_active:!x.is_active}:x)); toast.success(`Service ${s.is_active?'disabled':'enabled'}`); }}>
                          {s.is_active?'Disable':'Enable'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {tab === 'messages' && (
          <div className="tab-content">
            <div className="messages-list">
              {messages.map(m=>(
                <div className={`msg-card ${m.status==='unread'?'unread':''}`} key={m.id}>
                  <div className="msg-header">
                    <div className="msg-from">
                      <div className="msg-avatar">{m.name[0]}</div>
                      <div>
                        <strong>{m.name}</strong>
                        <span>{m.email}</span>
                      </div>
                    </div>
                    <div className="msg-meta">
                      <span className="status-chip" style={m.status==='unread'?{color:'#ef4444',background:'rgba(239,68,68,0.1)'}:{color:'#10b981',background:'rgba(16,185,129,0.1)'}}>{m.status}</span>
                      <span style={{color:'var(--text-muted)',fontSize:'0.8rem'}}>{m.created_at}</span>
                    </div>
                  </div>
                  <div className="msg-subject">{m.subject}</div>
                  <p className="msg-body">{m.message}</p>
                  <div className="msg-actions">
                    <button className="btn btn-primary" style={{padding:'7px 16px',fontSize:'0.8rem'}}
                      onClick={()=>{ setMessages(prev=>prev.map(x=>x.id===m.id?{...x,status:'read'}:x)); toast.success('Marked as read'); }}>
                      ✅ Mark Read
                    </button>
                    <button className="btn btn-outline" style={{padding:'7px 16px',fontSize:'0.8rem'}}
                      onClick={()=>{ setMessages(prev=>prev.filter(x=>x.id!==m.id)); toast.success('Message deleted'); }}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
              {messages.length===0 && <div style={{textAlign:'center',padding:'60px',color:'var(--text-muted)'}}>📭 No messages</div>}
            </div>
          </div>
        )}
      </main>

      <style>{`
        .admin-page { display:flex; min-height:100vh; background:#f8fafc; padding-top:0; }

        /* Sidebar */
        .admin-sidebar { width:240px; flex-shrink:0; background:#fff; border-right:1px solid var(--border); display:flex; flex-direction:column; position:sticky; top:0; height:100vh; overflow-y:auto; }
        .sidebar-logo { padding:24px 20px 20px; display:flex; align-items:center; gap:10px; border-bottom:1px solid var(--border); }
        .sidebar-logo span { font-family:'Space Grotesk',sans-serif; font-size:1.2rem; font-weight:700; }
        .sidebar-logo span span { color:var(--primary); }
        .logo-mark { width:32px; height:32px; background:var(--gradient); border-radius:9px; display:flex; align-items:center; justify-content:center; font-weight:800; color:white; font-size:0.9rem; }
        .sidebar-nav { padding:16px 12px; flex:1; display:flex; flex-direction:column; gap:4px; }
        .sidebar-item { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:10px; border:none; background:transparent; color:var(--text-muted); font-size:0.875rem; font-weight:500; cursor:pointer; transition:all .2s; width:100%; text-align:left; position:relative; }
        .sidebar-item:hover { background:rgba(37,99,235,0.06); color:var(--text); }
        .sidebar-item.active { background:var(--primary-pale); color:var(--primary); border:1px solid var(--border); }
        .nav-badge { margin-left:auto; background:#ef4444; color:white; border-radius:50px; font-size:0.68rem; padding:2px 7px; font-weight:700; }
        .sidebar-footer { padding:16px; border-top:1px solid var(--border); }
        .sb-user { display:flex; align-items:center; gap:10px; }
        .sb-avatar { width:36px; height:36px; background:var(--gradient); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.875rem; flex-shrink:0; }
        .sb-name { font-size:0.875rem; font-weight:600; color:var(--text); }
        .sb-role { font-size:0.75rem; color:var(--primary); }

        /* Main */
        .admin-main { flex:1; min-width:0; padding:32px; overflow-x:auto; }
        .admin-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:12px; }
        .admin-header h1 { font-size:1.8rem; margin-bottom:4px; }
        .admin-header p { color:var(--text-muted); font-size:0.875rem; }
        .admin-date { color:var(--text-muted); font-size:0.82rem; }

        /* Stats */
        .stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:24px; }
        .stat-card { background:#fff; border:1px solid var(--border); border-radius:var(--radius); padding:20px; display:flex; align-items:center; gap:14px; transition:all .3s; position:relative; overflow:hidden; }
        .stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--c),transparent); }
        .stat-card:hover { border-color:var(--c); transform:translateY(-3px); }
        .stat-icon { width:48px; height:48px; background:#f8fafc; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; flex-shrink:0; }
        .stat-value { font-family:'Space Grotesk',sans-serif; font-size:1.6rem; font-weight:700; color:var(--text); line-height:1.2; }
        .stat-label { color:var(--text-muted); font-size:0.8rem; margin-top:2px; }
        .stat-change { margin-left:auto; color:var(--success); font-size:0.78rem; font-weight:600; background:rgba(16,185,129,0.1); padding:3px 8px; border-radius:50px; }

        /* Dash Grid */
        .dash-grid { display:grid; grid-template-columns:1.4fr 1fr; gap:20px; }
        .admin-card { background:#fff; border:1px solid var(--border); border-radius:var(--radius); padding:20px; }
        .admin-card h3 { font-size:1rem; margin-bottom:16px; padding-bottom:12px; border-bottom:1px solid var(--border-soft); }
        .mini-table { display:flex; flex-direction:column; gap:10px; }
        .mini-row { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border-soft); }
        .mini-row:last-child { border-bottom:none; }
        .mini-code { font-size:0.82rem; font-weight:600; font-family:monospace; color:var(--primary); }
        .mini-sub { font-size:0.75rem; color:var(--text-muted); }
        .mini-user { flex:1; font-size:0.85rem; color:var(--text-soft); }
        .mini-price { font-weight:700; color:var(--primary); font-size:0.85rem; }
        .quick-stats { display:flex; flex-direction:column; gap:10px; }
        .qs-row { display:flex; justify-content:space-between; align-items:center; padding:9px 12px; background:#f8fafc; border-radius:8px; font-size:0.85rem; }
        .qs-row span { color:var(--text-muted); }
        .qs-row strong { color:var(--text); font-family:'Space Grotesk',sans-serif; }

        /* Table */
        .tab-content { animation: fadeInUp .4s ease; }
        .table-toolbar { display:flex; align-items:center; gap:12px; margin-bottom:16px; flex-wrap:wrap; }
        .table-search { flex:1; min-width:200px; padding:10px 16px; background:#fff; border:1px solid var(--border); border-radius:50px; color:var(--text); font-size:0.875rem; outline:none; }
        .table-search:focus { border-color:var(--primary); }
        .table-filter { padding:10px 16px; background:#fff; border:1px solid var(--border); border-radius:50px; color:var(--text); font-size:0.875rem; cursor:pointer; outline:none; }
        .table-count { color:var(--text-muted); font-size:0.85rem; white-space:nowrap; }
        .admin-table-wrap { overflow-x:auto; border-radius:var(--radius); border:1px solid var(--border); }
        .admin-table { width:100%; border-collapse:collapse; }
        .admin-table th { background:rgba(37,99,235,0.06); padding:12px 16px; text-align:left; font-size:0.78rem; font-weight:600; color:var(--text-muted); text-transform:uppercase; letter-spacing:.05em; border-bottom:1px solid var(--border); white-space:nowrap; }
        .admin-table td { padding:12px 16px; font-size:0.875rem; border-bottom:1px solid var(--border-soft); vertical-align:middle; }
        .admin-table tr:last-child td { border-bottom:none; }
        .admin-table tr:hover td { background:rgba(37,99,235,0.03); }
        .admin-table code { font-size:0.78rem; color:var(--primary); background:rgba(37,99,235,0.07); padding:2px 7px; border-radius:4px; }
        .status-chip { padding:4px 10px; border-radius:50px; font-size:0.75rem; font-weight:600; white-space:nowrap; }
        .action-select { padding:6px 10px; background:#f8fafc; border:1px solid var(--border); border-radius:8px; color:var(--text); font-size:0.78rem; cursor:pointer; outline:none; }
        .toggle-btn { padding:6px 14px; border-radius:8px; border:none; font-size:0.78rem; font-weight:600; cursor:pointer; transition:all .2s; }
        .toggle-btn.on { background:rgba(239,68,68,0.1); color:#ef4444; }
        .toggle-btn.off { background:rgba(16,185,129,0.1); color:#10b981; }
        .toggle-btn:hover { opacity:.8; }

        /* Messages */
        .messages-list { display:flex; flex-direction:column; gap:16px; }
        .msg-card { background:#fff; border:1px solid var(--border); border-radius:var(--radius); padding:20px; transition:all .2s; }
        .msg-card.unread { border-color:rgba(239,68,68,0.25); }
        .msg-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px; }
        .msg-from { display:flex; align-items:center; gap:10px; }
        .msg-avatar { width:36px; height:36px; background:var(--gradient); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.875rem; }
        .msg-from strong { display:block; font-size:0.9rem; }
        .msg-from span { color:var(--text-muted); font-size:0.8rem; }
        .msg-meta { display:flex; align-items:center; gap:10px; }
        .msg-subject { font-weight:600; font-size:0.95rem; margin-bottom:8px; }
        .msg-body { color:var(--text-muted); font-size:0.875rem; line-height:1.6; margin-bottom:14px; }
        .msg-actions { display:flex; gap:10px; }

        @media(max-width:1024px){ .stats-grid{grid-template-columns:repeat(2,1fr);} .dash-grid{grid-template-columns:1fr;} }
        @media(max-width:768px){ .admin-sidebar{display:none;} .admin-main{padding:20px 16px;} .stats-grid{grid-template-columns:1fr 1fr;} }
        @media(max-width:480px){ .stats-grid{grid-template-columns:1fr;} }
      `}</style>
    </div>
  );
};
export default AdminDashboard;
