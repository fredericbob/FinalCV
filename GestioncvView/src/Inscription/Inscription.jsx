import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Inscription.css'; // Assure-toi que le chemin est correct

function Inscription() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    // Vérifie si les mots de passe correspondent
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Les mots de passe ne correspondent pas',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/authentication/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        // Succès de l'inscription
        navigate('/client'); // Redirection vers la page souhaitée après l'inscription
      } else {
        // Erreur lors de l'inscription
        throw new Error(responseData.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error.message);

    }
  };


  return (
      <main className="form-container">
        <div className="container">
          <section className="background">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Inscription</h5>
                        <p className="text-center small">Créer un compte</p>
                      </div>
                      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-12"> {/* Utiliser col-12 pour pleine largeur */}
                          <label htmlFor="email" className="form-label">Email</label>
                          <input
                              type="email"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              id="email"
                              {...register('email', {
                                required: 'Email requis',
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: 'Email invalide',
                                },
                              })}
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>
                        <div className="col-12">
                          <label htmlFor="password" className="form-label">Mot de passe</label>
                          <input
                              type="password"
                              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                              id="password"
                              {...register('password', {
                                required: 'Mot de passe requis',
                                minLength: {
                                  value: 6,
                                  message: 'Le mot de passe doit comporter au moins 6 caractères',
                                },
                              })}
                          />
                          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        </div>
                        <div className="col-12">
                          <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
                          <input
                              type="password"
                              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                              id="confirmPassword"
                              {...register('confirmPassword', {
                                required: 'Confirmer le mot de passe requis',
                                validate: {
                                  matchesPreviousPassword: (value) => {
                                    const { password } = getValues();
                                    return password === value || 'Les mots de passe ne correspondent pas';
                                  },
                                },
                              })}
                          />
                          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
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

export default Inscription;
