import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="admin-loading"><div className="spinner"></div></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default AdminRoute;
