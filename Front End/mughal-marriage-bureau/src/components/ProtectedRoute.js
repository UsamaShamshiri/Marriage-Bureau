import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
const ProtectedRoute = ({ allowedRole }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || !role) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    return role === allowedRole ? <Outlet /> : <Navigate to="/profile" replace />; // Redirect if role is unauthorized
};

export default ProtectedRoute;