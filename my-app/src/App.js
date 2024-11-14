import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookingNotifications from './components/Bookingnotifications'; // Ensure this component exists
import AddDesigns from './components/Adddesigns'; // Ensure this component exists
import DesignsGallery from './components/Designgallery'; // Ensure this component exists
import Login from './Authentication/Login';
import Logout from './Authentication/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/booking-notifications" element={<BookingNotifications />} />
        <Route path="/add-designs" element={<AddDesigns />} />
        <Route path="/design-gallery" element={<DesignsGallery />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;