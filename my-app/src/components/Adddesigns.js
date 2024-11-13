import React, { useState } from 'react';
import axios from 'axios';

const AddDesign = () => {
  const [formData, setFormData] = useState({
    designName: '',
    description: '',
    price: '',
    bookingCharge: '',
    coverImage: null,
    designImage1: null,
    designImage2: null,
    designImage3: null,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [newDesign, setNewDesign] = useState(null); // State to hold the newly created design

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('designImage')) {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let errors = {};
  
    // Validate required fields
    if (!formData.designName) errors.designName = 'Design name is required.';
    if (!formData.description) errors.description = 'Description is required.';
  
    // Validate price and booking charge
    if (!formData.price) {
      errors.price = 'Price is required.';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      errors.price = 'Price must be a positive number.';
    }
  
    if (!formData.bookingCharge) {
      errors.bookingCharge = 'Booking charge is required.';
    } else if (isNaN(formData.bookingCharge) || Number(formData.bookingCharge) <= 0) {
      errors.bookingCharge = 'Booking charge must be a positive number.';
    }
  
    setError(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!validateForm()) return;

    const data = new FormData();
    data.append('designName', formData.designName);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('bookingCharge', formData.bookingCharge);
    
    // Append images to FormData
    data.append('coverImage', formData.coverImage);
    
    data.append('designImage1', formData.designImage1);
    
    data.append('designImage2', formData.designImage2);
    
    data.append('designImage3', formData.designImage3);

    try {
      const response = await axios.post('https://mehendi-app.onrender.com/api/designs/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      setNewDesign(response.data.design);

      alert('Design added successfully!');

      setMessage('Design added successfully!');
      setError('');
      
      // Clear form fields after successful submission
      setFormData({
        designName: '',
        description: '',
        price: '',
        bookingCharge: '',
        coverImage: null,
        designImage1: null,
        designImage2: null,
        designImage3: null,
      });

    } catch (err) {
      console.error('Error adding design:', err);
      setError('Failed to add design. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-11/12 md:w-3/5 lg:w-2/5 p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Add New Design</h2>
        
        {message && <div className="text-green-500">{message}</div>}
        {Object.keys(error).map((key) => (
          <div key={key} className="text-red-500">{error[key]}</div>
        ))}

        <form onSubmit={handleSubmit}>
          {/* Design Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="designName">Design Name:</label>
            <input
              type="text"
              id="designName"
              name="designName"
              value={formData.designName}
              onChange={handleChange}
              className={`w-full p-2 border ${error.designName ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-2 border ${error.description ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full p-2 border ${error.price ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
            />
          </div>

          {/* Booking Charge */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="bookingCharge">Booking Charge:</label>
            <input
              type="number"
              id="bookingCharge"
              name="bookingCharge"
              value={formData.bookingCharge}
              onChange={handleChange}
              className={`w-full p-2 border ${error.bookingCharge ? 'border-red-500' : 'border-gray-300'} rounded`}
              required
            />
          </div>

          {/* Cover Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="coverImage">Cover Image:</label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept=".jpg,.jpeg,.png" // Optional restrict file types
              onChange={handleChange}
              className={`w-full p-2 border ${error.coverImage ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {error.coverImage && <p className="text-red-500 text-sm">{error.coverImage}</p>}
          </div>

          {/* Design Image Uploads */}
          {[1, 2, 3].map((num) => (
            <div key={num} className="mb-4">
              <label className={`block text-sm font-medium mb-1`} htmlFor={`designImage${num}`}>Design Image {num}:</label>
              <input
                type="file"
                id={`designImage${num}`}
                name={`designImage${num}`}
                accept=".jpg,.jpeg,.png" // Optional restrict file types
                onChange={handleChange}
                className={`w-full p-2 border ${error[`designImage${num}`] ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {error[`designImage${num}`] && <p className="text-red-500 text-sm">{error[`designImage${num}`]}</p>}
            </div>
          ))}

          {/* Submit Button */}
          <button 
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 mx-auto block text-center"
          >
            Add Design
          </button>
        </form>

        {/* Display the newly created design details */}
        {newDesign && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-bold">New Design Created:</h3>
            <p><strong>Name:</strong> {newDesign.designName}</p>
            <p><strong>Description:</strong> {newDesign.description}</p>
            <p><strong>Price:</strong> ${newDesign.price}</p>
            <p><strong>Booking Charge:</strong> ${newDesign.bookingCharge}</p>
            {newDesign.coverImage && (
              <img src={newDesign.coverImage} alt={newDesign.designName} className="mt-2 w-full h-auto object-cover" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDesign;