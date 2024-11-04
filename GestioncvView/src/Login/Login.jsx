import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css'; // Assurez-vous d'importer le CSS si vous avez des styles personnalisés

const API_URL = 'http://localhost:8080/authentication/login';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('alexisbroussard@email.com');
  const [password, setPassword] = useState('azerty');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);
    axios.post(API_URL, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response.data)
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      const idutilisateur = decodedToken.id;
      localStorage.setItem('email', email);
      localStorage.setItem('idutilisateur', idutilisateur);
      const userRole = decodedToken.role.toLowerCase();
      if (userRole === 'admin') {
        navigate('/admin/accueil');
      } else if (userRole === 'client') {
        navigate('/client');
      } else {
        navigate('/login');
      }
    }).catch((error) => {
      alert("error" + error);
    });
  };

  return (
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex align-items-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                {/* Colonne pour l'image */}
                <div className="col-lg-6 col-md-6 d-flex justify-content-center">
                  <img src="../assets/img/logo.jpg" alt="Logo Loveni Consulting" className="img-fluid" style={{ maxHeight: '80vh' }} />
                </div>
                {/* Colonne pour le formulaire */}
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">

                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Connecter à votre compte</h5>
                        <p className="text-center small">Entrer votre email & mot de passe </p>
                      </div>
                      <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">Email</label>
                          <div className="input-group has-validation">
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                id="yourUsername"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Veuillez entrer votre email.</div>
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">Mot de passe</label>
                          <input
                              type="password"
                              name="password"
                              className="form-control"
                              id="yourPassword"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                          <div className="invalid-feedback">Veuillez entrer votre mot de passe!</div>
                        </div>
                        {error && <div className="col-12"><p className="text-danger">{error}</p></div>}
                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit">Connecter</button>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
  );
}

export default Login;
