import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/userAuth';
import Spinner from '../components/common/Spinner';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};