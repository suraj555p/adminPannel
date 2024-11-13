import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import BookingNotifications from './components/Bookingnotifications.js'; // Create this component
import AddDesigns from './components/Adddesigns.js'; // Create this component
import DesignsGallery from './components/Designgallery.js';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/ " element={<BookingNotifications />}/>
        <Route path="/booking-notifications" element={<BookingNotifications />} />
        <Route path="/add-designs" element={<AddDesigns />} />
        <Route path='/design-gallery' element={<DesignsGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
