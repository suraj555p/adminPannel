import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState(''); // Change username to email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://authentication-server-tac1.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Use email instead of username
            });
            if (response.ok) {
                const { token } = await response.json();
                setToken(token); // Store the token using the provided function
                setError(''); // Clear any previous errors
            } else {
                // Handle different response statuses
                if (response.status === 401) {
                    setError('Invalid email or password.'); // Unauthorized error
                } else if (response.status === 400) {
                    setError('Bad request. Please check your input.'); // Bad request error
                } else {
                    const errorMessage = await response.text();
                    setError(errorMessage || 'Login failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email {/* Change label to Email */}
                        </label>
                        <input
                            type="email" // Change input type to email
                            id="email" // Change id to email
                            value={email} // Use email state variable
                            onChange={(e) => setEmail(e.target.value)} // Update state on change
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button 
                        type="submit" 
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default Login;