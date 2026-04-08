import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ReviewsPage from './pages/ReviewsPage';
import MyBookings from './pages/MyBookings';
import TrackingPage from './pages/TrackingPage';
import AdminDashboard from './pages/AdminDashboard';
import ProviderProfile from './pages/ProviderProfile';
import './App.css';

const AdminLayout = ({ children }) => <>{children}</>;
const DefaultLayout = ({ children }) => (
  <><Navbar /><main className="main-content">{children}</main><Footer /></>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{
          style: { background:'#fff', color:'#0f172a', border:'1px solid #e2e8f0', boxShadow:'0 8px 24px rgba(0,0,0,0.1)' },
          success: { iconTheme: { primary:'#059669', secondary:'#fff' } },
          error:   { iconTheme: { primary:'#dc2626', secondary:'#fff' } },
        }} />
        <Routes>
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="*" element={
            <DefaultLayout>
              <Routes>
                <Route path="/"                  element={<Home />} />
                <Route path="/services"          element={<Services />} />
                <Route path="/book/:serviceId"   element={<BookingPage />} />
                <Route path="/login"             element={<LoginPage />} />
                <Route path="/signup"            element={<SignupPage />} />
                <Route path="/contact"           element={<ContactPage />} />
                <Route path="/about"             element={<AboutPage />} />
                <Route path="/faq"               element={<FAQPage />} />
                <Route path="/reviews"           element={<ReviewsPage />} />
                <Route path="/my-bookings"       element={<MyBookings />} />
                <Route path="/track/:bookingId"  element={<TrackingPage />} />
                <Route path="/provider-profile"  element={<ProviderProfile />} />
              </Routes>
            </DefaultLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
