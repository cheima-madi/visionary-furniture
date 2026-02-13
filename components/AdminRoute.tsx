
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute: React.FC = () => {
  const { isAdmin, isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
