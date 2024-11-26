import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import Profile from './components/UserProfile';
import About from './components/About';
import Signup from './components/SignUp';
import Home from './components/Home';
import Contact from './components/Contact';
import Why from './components/Why';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
const App = () => {
    const userId=localStorage.getItem('userId')
    return (
        <Router>
            
                <div>
                    <Layout/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/why" element={<Why />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/profile"
                        element={<ProtectedRoute allowedRole="ROLE_USER"  />}
                    >
                        <Route path="" element={<Profile userId={userId}  />} />
                    </Route>

                    {/* Protected route for Admin: Only accessible to users with 'ADMIN' role */}
                    <Route
                        path="/admin"
                        element={<ProtectedRoute allowedRole="ROLE_ADMIN"  />}
                    >
                        <Route path="" element={<AdminPage />} />
                    </Route>
                </Routes>
                </div>
        </Router>
    );
};

export default App;
