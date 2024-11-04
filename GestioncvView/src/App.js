import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Acceuil from './Accueil/Accueil';
import ListeCandidat from './Personne/ListeCandidat';
import ListCv from './Cv/ListCv';
import Home from './Pages/Home';
import Inscription from './Inscription/Inscription';
import { jwtDecode } from 'jwt-decode';
import Import from './Import/Import.jsx';
import Archives from './Archive/Archives.jsx';
import ProtectedRoute from './ProtectedRoute';
import Deconnexion from './components/Deconnexion.jsx';
import Client from './Personne/Client.jsx';
import ExportPdf from "./Export/ExportPdf";
import { AuthProvider } from './components/AuthContext';

import ExportPdfAdmin from "./Export/ExportAdmin";
import DetailCV from "./DetailCV/DetailCVAdmin";


import Saisie from "./components/saisie/saisie";
import AccueilAdmin from "./Accueil/AccueilAdmin";
import ResetPassword from './Login/ResetPassword';

const Layout = ({ children }) => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role.toLowerCase();

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

function App() {
  return (
      <AuthProvider>
    <Router>
      <Routes>
        {/* Routes non protégées */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Inscription />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/deconnection" element={<Deconnexion />} />

        {/* Routes pour les Administrateurs */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute roleRequired="admin" element={<Layout><Routes>
              <Route path="accueil" element={<AccueilAdmin />} />
              <Route path="listecandidat" element={<ListeCandidat />} />
              <Route path="detailcv/:personne_id/:export" element={<DetailCV />} />
              <Route path="detailcv/:personne_id" element={<DetailCV />} />
              <Route path="import" element={<Import />} />
              <Route path="archives" element={<Archives />} />
              <Route path="/" element={<Navigate to="accueil" />} /> {/* Redirection vers la page d'accueil par défaut */}
            </Routes></Layout>} />
          }
        />

        {/* Routes pour les Clients */}
        <Route
          path="/client/*"
          element={
            <ProtectedRoute roleRequired="client" element={<Layout><Routes>
              <Route path="accueil" element={<Acceuil />} />
              <Route path="saisie" element={<Saisie />} />
              <Route path="import" element={<Import />} />
              <Route path="exportpdf" element={<ExportPdf />} />
              <Route path="/" element={<Navigate to="accueil" />} /> {/* Redirection vers la page d'accueil par défaut */}
            </Routes></Layout>} />
          }
        />
      </Routes>
    </Router>
      </AuthProvider>
  );
}

export default App;
