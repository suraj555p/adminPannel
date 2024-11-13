import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DesignsGallery = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentDesign, setCurrentDesign] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await axios.get('https://mehendi-app.onrender.com/api/designs/');
        setDesigns(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching designs:', err);
        setError('Failed to fetch designs. Please try again later.');
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  // Function to handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mehendi-app.onrender.com/api/designs/${id}`);
      setDesigns((prevDesigns) => prevDesigns.filter((design) => design._id !== id));
      alert('Design deleted successfully!');
    } catch (err) {
      console.error('Error deleting design:', err);
      alert('Failed to delete the design. Please try again.');
    }
  };

  // Function to handle update action
  const handleUpdate = async () => {
    try {
      await axios.put(`https://mehendi-app.onrender.com/api/designs/${currentDesign._id}`, currentDesign);
      setDesigns((prevDesigns) =>
        prevDesigns.map((design) =>
          design._id === currentDesign._id ? currentDesign : design
        )
      );
      setIsEditing(false);
      alert('Design updated successfully!');
    } catch (err) {
      console.error('Error updating design:', err);
      alert('Failed to update the design. Please try again.');
    }
  };

  // Function to open the edit modal and set the current design
  const openEditModal = (design) => {
    setCurrentDesign(design);
    setIsEditing(true);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDesign({ ...currentDesign, [name]: value });
  };

  if (loading) return <div className="text-center py-6">Loading designs...</div>;
  if (error) return <div className="text-red-500 text-center py-6">{error}</div>;
  if (designs.length === 0) return <div className="text-center py-6">No posts are available.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Designs Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <div key={design._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Design Image */}
            {design.designImage1 ? (
              <img
                src={design.designImage1}
                alt={design.designName}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}

            <div className="p-4">
              {/* Design Name */}
              <h3 className="text-xl font-semibold mb-2">{design.designName}</h3>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4">
                {design.description.length > 100
                  ? `${design.description.substring(0, 100)}...`
                  : design.description}
              </p>

              {/* Price & Booking Charge */}
              <div className="text-sm mb-2">
                <span className="font-bold">Price:</span> ${design.price}
              </div>
              <div className="text-sm">
                <span className="font-bold">Booking Charge:</span> ${design.bookingCharge}
              </div>

              {/* Update and Delete Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => openEditModal(design)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(design._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing Design */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Design</h3>
            <form>
              <label className="block mb-2">
                <span className="text-gray-700">Design Name:</span>
                <input
                  type="text"
                  name="designName"
                  value={currentDesign.designName}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Price:</span>
                <input
                  type="number"
                  name="price"
                  value={currentDesign.price}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Description:</span>
                <textarea
                  name="description"
                  value={currentDesign.description}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border rounded"
                ></textarea>
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Cover Image URL:</span>
                <input
                  type="text"
                  name="designImage1"
                  value={currentDesign.designImage1}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border rounded"
                />
              </label>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignsGallery;