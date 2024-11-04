
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext'; // Assurez-vous que le chemin est correct
import { jwtDecode } from 'jwt-decode';
import Header from './Header'; // Assurez-vous que le chemin est correct
import Sidebar from './Sidebar'; // Assurez-vous que le chemin est correct
import Client from '../Personne/Client'; // Assurez-vous que le chemin est correct
import { Navigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const userRole = decodedToken ? decodedToken.role.toLowerCase() : null;

    // Vérifiez si l'utilisateur est authentifié
    if (!token) {
        return <Navigate to="/login" />; // Rediriger vers la page de connexion si non authentifié
    }

    return (
        <>
            <Header />
            {userRole === "admin" ? <Sidebar /> : <Client />}
            {children}
        </>
    );
};

// Ajouter la validation des props
Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
