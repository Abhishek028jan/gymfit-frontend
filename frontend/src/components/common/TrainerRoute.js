import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const TrainerRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="trainer-loading"><div className="spinner"></div></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== 'trainer' && user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default TrainerRoute;
