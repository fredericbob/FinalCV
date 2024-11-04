import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import logo from '../assets/img/logo.jpg';
import { jwtDecode } from 'jwt-decode';

function Header() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [cvId, setCvId] = useState(3); // Remplacez 3 par le cvId correct
  const [isAdmin, setIsAdmin] = useState(false); // État pour vérifier si l'utilisateur est admin
  const [dataLoaded, setDataLoaded] = useState(false); // État pour gérer le chargement des données

  useEffect(() => {
    console.log('Header component mounted');

    const token = localStorage.getItem('token');
    if (token && cvId) {
      // Décoder le token pour obtenir le rôle de l'utilisateur
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role.toLowerCase();
      setIsAdmin(userRole === 'admin'); // Mettre à jour l'état si l'utilisateur est admin

      if (!isAdmin) {
        fetchNotifications(cvId);
        fetchComments(cvId);
      }

      setDataLoaded(true); // Indiquer que les données ont été chargées
    } else {
      console.error('Token or cvId not found.');
    }
  }, [cvId, isAdmin]);

  const fetchNotifications = async (cvId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8080/personnes/unread/${cvId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const jsonResponse = await response.json();
      console.log('API Response:', jsonResponse);

      if (jsonResponse && jsonResponse.data) {
        setNotificationCount(jsonResponse.data);
      } else {
        console.error('Unexpected response structure:', jsonResponse);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchComments = async (cvId) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    console.log('cvId:', cvId);

    if (!token) {
      console.error('Token is missing');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/personnes/comments/${cvId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const errorText = await response.text();
      console.log('Response Body:', errorText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const jsonResponse = JSON.parse(errorText);
      console.log('Comments API Response:', jsonResponse);

      if (jsonResponse && jsonResponse.data) {
        const comments = jsonResponse.data.map(item => item.commentaire);
        setComments(comments);
      } else {
        console.error('Unexpected response structure:', jsonResponse);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLogout = () => {
    console.log('Déconnexion en cours...');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setAuth(false);
    console.log('Utilisateur déconnecté.');
    navigate('/home');
  };

  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  return (
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="logo d-flex align-items-center" to="/">
            <img src={logo} alt="Logo" />
            <span className="d-none d-lg-block" style={{ fontSize: '1.4rem', color: '#808000' }}>Gestion Cv</span>
          </Link>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            {/* Afficher les notifications uniquement si l'utilisateur n'est pas admin */}
            {!isAdmin && (
                <li className="nav-item dropdown pe-3">
                  <a
                      className="nav-link nav-icon"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={handleNotificationClick}
                  >
                    <i className="bi bi-bell"></i>
                    <span className="badge bg-primary badge-number">{notificationCount}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                    <li className="dropdown-header">
                      Vous avez {notificationCount} nouvelles notifications
                      <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">Voir toutes</span></a>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <li key={index} className="dropdown-item">{comment}</li>
                        ))
                    ) : (
                        <li className="dropdown-item">Aucun commentaire.</li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li className="dropdown-footer">
                      <a href="#">Montrer toutes les notifications</a>
                    </li>
                  </ul>
                </li>
            )}

            <li className="nav-item dropdown pe-3">
              <Link className="nav-link nav-profile d-flex align-items-center pe-0" to="#" data-bs-toggle="dropdown">
                <img src="/assets/img/profile-img.png" alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">{localStorage.getItem('email')}</span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{localStorage.getItem('email')}</h6>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item d-flex align-items-center" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Se déconnecter</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
  );
}

export default Header;
