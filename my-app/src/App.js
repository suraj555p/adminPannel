import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookingNotifications from './components/Bookingnotifications'; // Create this component
import AddDesigns from './components/Adddesigns'; // Create this component
import DesignsGallery from './components/Designgallery';
import Login from './Authentication/Login';

function App() {
  const [token, setToken] = useState(null); // State to manage authentication

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<Navigate to="/booking-notifications" />} />
          <Route path="/booking-notifications" element={<PrivateRoute><BookingNotifications /></PrivateRoute>} />
          <Route path="/add-designs" element={<PrivateRoute><AddDesigns /></PrivateRoute>} />
          <Route path="/design-gallery" element={<PrivateRoute><DesignsGallery /></PrivateRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;