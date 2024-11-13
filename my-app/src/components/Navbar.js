import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4 flex-grow">
            <Link to="/" className="flex items-center py-5 text-gray-700 hover:text-gray-900">
              <img
                src="https://thumbs.dreamstime.com/b/admin-icon-trendy-design-style-isolated-white-background-vector-simple-modern-flat-symbol-web-site-mobile-logo-app-135742404.jpg"
                alt="Logo"
                className="h-6 w-6 mr-2"
              />
              <span className="font-bold">Admin</span>
            </Link>
          </div>

          {/* Primary Nav Links - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-1">
            <Link to="/booking-notifications" className="py-5 px-3 text-gray-700 hover:text-gray-900">Booking notifications</Link>
            <Link to="/add-designs" className="py-5 px-3 text-gray-700 hover:text-gray-900">Add designs</Link>
            <Link to="/design-gallery" className="py-5 px-3 text-gray-700 hover:text-gray-900">Designs status</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-6 h-6 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <Link to="/booking-notifications" className="block py-2 px-4 text-sm hover:bg-gray-200">Booking notifications</Link>
          <Link to="/add-designs" className="block py-2 px-4 text-sm hover:bg-gray-200">Add designs</Link>
          <Link to="/design-gallery" className="block py-2 px-4 text-sm hover:bg-gray-200">Designs status</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
