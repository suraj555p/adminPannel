import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //         console.log("reached");
            
    //         const response = await fetch('http://localhost:6000/api/auth/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email, password }),
    //         });

    //         console.log(response);
            
            

    //         if (response.ok) {
    //             const { token } = await response.json();
    //             setToken(token); // Store the token using the provided function
    //             setError(''); // Clear any previous errors
                
    //             // Navigate to Booking Notifications after successful login
    //             navigate('/booking-notifications'); // Change this path to your desired route
    //         } else {
    //             if (response.status === 401) {
    //                 setError('Invalid email or password.');
    //             } else if (response.status === 400) {
    //                 setError('Bad request. Please check your input.');
    //             } else {
    //                 const errorMessage = await response.text();
    //                 setError(errorMessage || 'Login failed. Please try again.');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         setError('An unexpected error occurred. Please try again later.');
    //     }
    // };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            let response = await fetch('https://mehendi-app.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            response = await response.json();

            console.log(response);
            
    
            if (response.success) {
                const { token } = response; // Now this will work correctly
                setError(''); // Clear any previous errors
                localStorage.setItem("token", token);
                // Navigate to Booking Notifications after successful login
                navigate('/booking-notifications'); // Change this path to your desired route
            } else {
                const errorMessage = await response.json(); // Get error message from JSON response
                setError(errorMessage.message || 'Login failed. Please try again.');
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
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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