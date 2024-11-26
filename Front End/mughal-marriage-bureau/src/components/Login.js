
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); 
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:8080/auth/login', data);
      const { token, roles,userId } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', roles[0]);
      localStorage.setItem('userId',userId)

      // Redirect based on the role
      if (roles[0]==='ROLE_ADMIN') {
        navigate('/admin'); 
    } else if (roles[0]==='ROLE_USER') {
        navigate('/profile');
    } else {
        console.error('Unknown role:', roles);
    }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage('Invalid username or password. Please try again.');
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
      console.error('Login failed:', error.response || error);

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="userbname"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-400 transition duration-300"
          >
            Login
          </button>
                   <p>Don't have an account? <Link to="/signup" className="text-green-600">Signup</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
