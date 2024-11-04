import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element, roleRequired }) => {
  const token = localStorage.getItem('token');

  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role.toLowerCase();
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return <Navigate to="/login" />;
    }
  }

  if (!token || userRole !== roleRequired) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;

