# ⚡ FixItPro — Local Service Marketplace

A full-stack Local Service Marketplace with **real-time technician tracking**, built with:
- **Frontend**: React.js
- **Backend**: Python (Flask)
- **Database**: Microsoft SQL Server (SSMS)

---

## 📁 Project Structure

```
localservice/
├── frontend/                   # React.js Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── ServiceCard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js              ← Landing page
│   │   │   ├── Services.js          ← All 15 services
│   │   │   ├── BookingPage.js       ← 3-step booking flow
│   │   │   ├── LoginPage.js         ← Login
│   │   │   ├── SignupPage.js        ← Registration
│   │   │   ├── MyBookings.js        ← User's bookings
│   │   │   ├── TrackingPage.js      ← Real-time map tracking
│   │   │   ├── AboutPage.js         ← About Us
│   │   │   ├── ContactPage.js       ← Contact form
│   │   │   ├── FAQPage.js           ← FAQ accordion
│   │   │   └── ReviewsPage.js       ← Customer reviews
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── backend/                    # Python (Flask) Backend
│   ├── config/
│   │   └── db.py                ← SQL Server connection + DB init
│   ├── routes/
│   │   ├── auth.py              ← Login, Signup, Profile
│   │   ├── services.py          ← Get services, categories
│   │   ├── bookings.py          ← Create, view, cancel bookings
│   │   ├── reviews.py           ← Get and post reviews
│   │   ├── contact.py           ← Contact form submission
│   │   └── tracking.py          ← Location update & fetch
│   ├── app.py                   ← Main Flask app + SocketIO
│   └── requirements.txt
│
└── database/
    └── setup.sql                ← Full SQL Server setup script
```

---

## 🚀 Setup Instructions

### Step 1: Database Setup (SQL Server)

1. Open **Microsoft SQL Server Management Studio (SSMS)**
2. Connect to your SQL Server instance
3. Open `database/setup.sql`
4. Click **Execute (F5)**

This will:
- Create `LocalServiceDB` database
- Create all 7 tables (users, services, technicians, bookings, reviews, contact_messages, technician_locations)
- Seed all **15 services** automatically

---

### Step 2: Backend Setup (Python/Flask)

**Requirements:** Python 3.8+, ODBC Driver 17 for SQL Server

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configure DB connection in `config/db.py`:**
```python
DB_CONFIG = {
    'server': 'localhost',         # Your SQL Server instance
    'database': 'LocalServiceDB',
    'username': 'sa',              # Your SA username
    'password': 'YourPassword',    # Your SA password
    'driver': 'ODBC Driver 17 for SQL Server'
}
```

**Start the backend:**
```bash
python app.py
```
Backend runs on: `http://localhost:5000`

---

### Step 3: Frontend Setup (React.js)

**Requirements:** Node.js 16+

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```
Frontend runs on: `http://localhost:3000`

---

## 📦 15 Services Available

| # | Service | Category | Price |
|---|---------|----------|-------|
| 1 | Plumbing Repair | Plumbing | ₹499 |
| 2 | Electrical Wiring | Electrical | ₹599 |
| 3 | AC Repair & Service | HVAC | ₹699 |
| 4 | Appliance Repair | Appliance | ₹449 |
| 5 | Carpentry Work | Carpentry | ₹549 |
| 6 | Painting Services | Painting | ₹799 |
| 7 | Deep Cleaning | Cleaning | ₹999 |
| 8 | Pest Control | Pest Control | ₹599 |
| 9 | CCTV Installation | Security | ₹1299 |
| 10 | Internet & Networking | IT Services | ₹499 |
| 11 | Water Purifier Service | Appliance | ₹349 |
| 12 | Gas Stove Repair | Appliance | ₹299 |
| 13 | Bathroom Renovation | Renovation | ₹4999 |
| 14 | Solar Panel Service | Electrical | ₹1999 |
| 15 | Home Shifting | Moving | ₹2999 |

---

## 🌐 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, service preview, how it works |
| Services | `/services` | All 15 services with filters |
| Booking | `/book/:serviceId` | 3-step booking flow |
| Login | `/login` | User login |
| Signup | `/signup` | User registration |
| My Bookings | `/my-bookings` | View & manage bookings |
| Live Tracking | `/track/:bookingId` | Real-time map tracking |
| About | `/about` | About us, team, values |
| Contact | `/contact` | Contact form |
| FAQ | `/faq` | Accordion FAQ |
| Reviews | `/reviews` | Customer reviews & ratings |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Get user profile |

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services/` | All services |
| GET | `/api/services/:id` | Single service |
| GET | `/api/services/categories` | All categories |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings/` | Create booking |
| GET | `/api/bookings/my` | User's bookings |
| GET | `/api/bookings/:id` | Single booking |
| PUT | `/api/bookings/:id/cancel` | Cancel booking |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/` | All reviews |
| POST | `/api/reviews/` | Post review |

### Tracking
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tracking/update` | Update technician location |
| GET | `/api/tracking/:bookingId` | Get latest location |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact/` | Submit contact form |

---

## ⚡ Real-Time Tracking

The app uses **Socket.IO** for real-time location updates:

```javascript
// Technician sends location
socket.emit('technician_location', {
  booking_id: 'BK12345678',
  lat: 23.0225,
  lng: 72.5714
});

// Customer receives update
socket.on('location_update', (data) => {
  updateMapMarker(data.lat, data.lng);
});
```

Map powered by **Leaflet.js + OpenStreetMap** (free, no API key needed).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, React Router v6 |
| Styling | Custom CSS with CSS Variables |
| Map | Leaflet.js + OpenStreetMap |
| Real-Time | Socket.IO (WebSockets) |
| HTTP | Axios |
| Notifications | React Hot Toast |
| Backend | Python 3, Flask 3 |
| Auth | JWT (PyJWT) + bcrypt |
| WebSockets | Flask-SocketIO + eventlet |
| Database | Microsoft SQL Server |
| DB Driver | pyodbc |

---

## 🔐 Security Features

- JWT-based authentication
- bcrypt password hashing
- CORS protection
- Input validation on all endpoints
- SQL injection prevention via parameterized queries

---

## 📞 Support

- Email: support@fixitpro.in
- Phone: +91 98765 43210
