import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const BookingNotifications = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(!token) {
      navigate("/");
    }
  },[])
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [previousStatus, setPreviousStatus] = useState('');

  // Fetch bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://mehendi-app.onrender.com/api/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data.bookings); // Assuming the response structure contains bookings
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle status change
  const handleStatusChange = (id, status) => {
    const bookingToChange = bookings.find(booking => booking._id === id);
    if (bookingToChange) {
      setSelectedBookingId(id);
      setNewStatus(status);
      setPreviousStatus(bookingToChange.status); // Store the previous status
      setShowModal(true);
    }
  };

  // Confirm status change
  const confirmStatusChange = async () => {
    try {
      const response = await fetch(`https://mehendi-app.onrender.com/api/bookings/${selectedBookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Reload the page to fetch updated data
      window.location.reload();
    } catch (err) {
      alert(err.message);
    } finally {
      setShowModal(false); // Close modal after operation
    }
  };

  // Handle delete booking
  const handleDeleteBooking = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://mehendi-app.onrender.com/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      // Remove deleted booking from local state
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(booking =>
    booking.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render loading state or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-bold text-center text-black mb-4">Booking Notifications</h2>
        
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by client name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-black text-white">
              <th className="py-2 px-4 border">Design</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Client Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone Number</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Order Booking Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{booking.Design}</td>
                <td className="py-2 px-4 border">${booking.price}</td>
                <td className="py-2 px-4 border">{booking.clientName}</td>
                <td className="py-2 px-4 border">{booking.email}</td>
                <td className="py-2 px-4 border">{booking.phoneNumber}</td>
                <td className="py-2 px-4 border">{booking.address}</td>
                <td className="py-2 px-4 border">{new Date(booking.orderBookingDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">
                  {/* Status Selector */}
                  <select
                    defaultValue={booking.status}
                    disabled={booking.status === 'accepted' || booking.status === 'rejected'}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    className="mt-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDeleteBooking(booking._id)} 
                    className="ml-3 bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Confirm Status Change</h3>
              <p>Are you sure you want to change the status to "{newStatus}"?</p>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => {
                    setShowModal(false); 
                    // Restore previous status if canceled
                    const updatedBookings = bookings.map(booking =>
                      booking._id === selectedBookingId ? { ...booking, status: previousStatus } : booking
                    );
                    setBookings(updatedBookings);
                  }} 
                  className="mr-3 bg-gray-300 text-black py-1 px-3 rounded"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmStatusChange} 
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingNotifications;