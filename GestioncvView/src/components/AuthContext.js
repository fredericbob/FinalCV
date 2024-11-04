// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'; // Assurez-vous que le mot-clé est correct ici

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Token trouvé dans AuthContext:', token);
            setAuth(true); // L'utilisateur est authentifié s'il y a un token
        } else {
            console.log('Aucun token trouvé dans AuthContext.');
            setAuth(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
