import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin = false }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const admin = JSON.parse(localStorage.getItem('adminInfo'));

  if (isAdmin) {
    return admin ? <Outlet /> : <Navigate to="/admin-login" replace />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
