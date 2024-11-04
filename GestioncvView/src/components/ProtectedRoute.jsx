import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Assurez-vous que le chemin est correct

const ProtectedRoute = ({ element }) => {
    const { auth } = useContext(AuthContext);

    if (!auth) {
        console.log('Utilisateur non authentifié, redirection vers /login');
        return <Navigate to="/login" />;
    }

    return element; // Sinon, affichez l'élément demandé
};

export default ProtectedRoute;
