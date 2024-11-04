import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Detail() {
  const apiUrlGenre = 'http://localhost:8080/genre';
  const apiUrlStatut = 'http://localhost:8080/status'; 
  const token = localStorage.getItem('token');
  const [genres, setGenres] = useState([]);
  const [statuts, setStatuts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        const [genresResponse, statutsResponse] = await Promise.all([
          fetch(apiUrlGenre, requestOptions),
          fetch(apiUrlStatut, requestOptions),
        ]);

        if (!genresResponse.ok || !statutsResponse.ok) {
          throw new Error('La requête a échoué.');
        }

        const genresData = await genresResponse.json();
        console.log('Genres reçus:', genresData.data)
        const statutsData = await statutsResponse.json();

        setGenres(genresData);
        setStatuts(statutsData);
      } catch (error) {
        console.error('Erreur lors de la requête à l\'API:', error);
      }
    };

    fetchData();
  }, [apiUrlGenre, apiUrlStatut, token]);


  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Les mots de passe ne correspondent pas',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/client/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      window.location.href = '/login';
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a href="/" className="logo d-flex align-items-center w-auto">
                    <img src="/assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">Gestion de CV</span>
                  </a>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Inscription</h5>
                      <p className="text-center small">Créer un compte</p>
                    </div>
                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-md-6">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input
                          type="text"
                          className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                          id="nom"
                          {...register('nom', { required: 'Nom requis' })}
                        />
                        {errors.nom && <div className="invalid-feedback">{errors.nom.message}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="prenoms" className="form-label">Prénoms</label>
                        <input
                          type="text"
                          className={`form-control ${errors.prenoms ? 'is-invalid' : ''}`}
                          id="prenoms"
                          {...register('prenoms', { required: 'Prénoms requis' })}
                        />
                        {errors.prenoms && <div className="invalid-feedback">{errors.prenoms.message}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="dateNaissance" className="form-label">Date de Naissance</label>
                        <input
                          type="date"
                          className={`form-control ${errors.dateNaissance ? 'is-invalid' : ''}`}
                          id="dateNaissance"
                          {...register('dateNaissance', { required: 'Date de Naissance requise' })}
                        />
                        {errors.dateNaissance && <div className="invalid-feedback">{errors.dateNaissance.message}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="adresse" className="form-label">Adresse</label>
                        <input
                          type="text"
                          className={`form-control ${errors.adresse ? 'is-invalid' : ''}`}
                          id="adresse"
                          {...register('adresse', { required: 'Adresse requise' })}
                        />
                        {errors.adresse && <div className="invalid-feedback">{errors.adresse.message}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="telephone" className="form-label">Téléphone</label>
                        <input
                          type="tel"
                          className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                          id="telephone"
                          {...register('telephone')}
                        />
                        {errors.telephone && <div className="invalid-feedback">{errors.telephone.message}</div>}
                      </div>
                      <div className="col-md-6">
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
                      <div className="col-md-6">
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
                      <div className="col-md-6">
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
                      <div className="col-md-6">
                        <label htmlFor="genre" className="form-label">Genre</label>
                        <select
                          id="genre"
                          className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
                          {...register('genre', { required: 'Genre requis' })}
                        >
                          {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                              {genre.nom}
                            </option>
                          ))}
                        </select>
                        {errors.genre && <div className="invalid-feedback">{errors.genre.message}</div>}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="statutmatrimonial" className="form-label">Statut Matrimonial</label>
                        <select
                          id="statutmatrimonial"
                          className={`form-control ${errors.statutmatrimonial ? 'is-invalid' : ''}`}
                          {...register('statutmatrimonial', { required: 'Statut matrimonial requis' })}
                        >
                          <option value="">Sélectionnez un statut matrimonial</option>
                          {statuts.map((statut) => (
                            <option key={statut.id} value={statut.id}>
                              {statut.nom}
                            </option>
                          ))}
                        </select>
                        {errors.statutmatrimonial && <div className="invalid-feedback">{errors.statutmatrimonial.message}</div>}
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

export default Detail;
