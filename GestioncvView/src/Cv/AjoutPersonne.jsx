import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AjoutPersonne() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('idutilisateur'); // ID de l'utilisateur connecté

  const [genres, setGenres] = useState([]);
  const [statuts, setStatuts] = useState([]);
  const [personneExists, setPersonneExists] = useState(false);

  const apiUrlGenre = 'http://localhost:8080/client/genre'; // URL pour récupérer les genres
  const apiUrlStatut = 'http://localhost:8080/client/statutmatrimonial'; // URL pour récupérer les statuts matrimoniaux
  const apiUrlPersonneExists = `http://localhost:8080/client/exists/${userId}`; // URL pour vérifier l'existence

  // Récupérer les données des genres et statuts matrimoniaux
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGenres = await fetch(apiUrlGenre, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const resultGenres = await responseGenres.json();

        if (resultGenres.message === 'Ok') {
          setGenres(resultGenres.data);
        } else {
          console.error('Erreur lors de la récupération des genres:', resultGenres.error);
        }

        const responseStatuts = await fetch(apiUrlStatut, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const resultStatuts = await responseStatuts.json();
        console.log(resultStatuts.data)

        if (resultStatuts.message === 'Ok') {
          setStatuts(resultStatuts.data);
        } else {
          console.error('Erreur lors de la récupération des statuts matrimoniaux:', resultStatuts.error);
        }

        // Vérifier si les détails de la personne existent déjà
        const responsePersonneExists = await fetch(apiUrlPersonneExists, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const resultPersonneExists = await responsePersonneExists.json();
        setPersonneExists(resultPersonneExists);

      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, [apiUrlGenre, apiUrlStatut, apiUrlPersonneExists, token]);

  const apiUrlPersonne = 'http://localhost:8080/client/addpersonne'; // URL pour ajouter une personne
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { 
      dateNaissance: '',
      adresse: '',
      telephone: '',
      genre: '',
      statutmatrimonial: ''
    }
  });

  const onSubmit = async (data) => {
    if (personneExists) {
      alert('Les détails de la personne existent déjà.');
      return;
    }

    try {
      const response = await fetch(apiUrlPersonne, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          utilisateur: { id: userId },
          dateNaissance: data.dateNaissance,
          adresse: data.adresse,
          telephone: data.telephone,
          genre: { id: data.genre },
          statutmatrimonial: { id: data.statutmatrimonial }
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        navigate('/client'); // Rediriger après ajout réussi
      } else {
        throw new Error(responseData.message || 'Erreur lors de l\'ajout de la personne');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la personne:', error.message);
    }
  };

  return (
    <main>
      <div className="container" style={{ marginLeft: "20%", width: "80%" }}>
        <div className="d-flex flex-row justify-content-center">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4 mx-2">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12 d-flex flex-column align-items-center justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Détail</h5>
                      </div>
                      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" value={userId} {...register('idutilisateur')} />
                        
                        <div className="col-md-6">
                          <label htmlFor="dateNaissance" className="form-label">Date de Naissance</label>
                          <input
                            id="dateNaissance"
                            type="date"
                            className={`form-control ${errors.dateNaissance ? 'is-invalid' : ''}`}
                            {...register('dateNaissance', { required: 'La date de naissance est requise.' })}
                          />
                          {errors.dateNaissance && <div className="invalid-feedback">{errors.dateNaissance.message}</div>}
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="adresse" className="form-label">Adresse</label>
                          <input
                            id="adresse"
                            type="text"
                            className={`form-control ${errors.adresse ? 'is-invalid' : ''}`}
                            {...register('adresse', { required: 'L\'adresse est requise.' })}
                          />
                          {errors.adresse && <div className="invalid-feedback">{errors.adresse.message}</div>}
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="telephone" className="form-label">Téléphone</label>
                          <input
                            id="telephone"
                            type="text"
                            className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                            {...register('telephone', { required: 'Le téléphone est requis.' })}
                          />
                          {errors.telephone && <div className="invalid-feedback">{errors.telephone.message}</div>}
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="genre" className="form-label">Genre</label>
                          <select
                            id="genre"
                            className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
                            {...register('genre', { required: 'Le genre est requis.' })}
                          >
                            <option value="">Sélectionner un genre</option>
                            {genres.map(genre => (
                              <option key={genre.id} value={genre.id}>{genre.nom}</option>
                            ))}
                          </select>
                          {errors.genre && <div className="invalid-feedback">{errors.genre.message}</div>}
                        </div>
                        
                        <div className="col-md-6">
                          <label htmlFor="statutmatrimonial" className="form-label">Statut Matrimonial</label>
                          <select
                            id="statutmatrimonial"
                            className={`form-control ${errors.statutmatrimonial ? 'is-invalid' : ''}`}
                            {...register('statutmatrimonial', { required: 'Le statut matrimonial est requis.' })}
                          >
                            <option value="">Sélectionner un statut</option>
                            {statuts.map(statut => (
                              <option key={statut.id} value={statut.id}>{statut.statut}</option>
                            ))}
                          </select>
                          {errors.statutmatrimonial && <div className="invalid-feedback">{errors.statutmatrimonial.message}</div>}
                        </div>
                        
                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit" disabled={personneExists}>
                            Ajouter la Personne
                          </button>
                          {personneExists && <div className="text-danger mt-2">Ce champ a déjà été rempli. Veuillez le modifier si vous souhaitez apporter des changements.</div>}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default AjoutPersonne;
