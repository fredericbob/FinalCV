import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AjoutCv() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('idutilisateur') || ''; // Récupérer l'ID de l'utilisateur ou chaîne vide
  
  const apiUrlDiplome = 'http://localhost:8080/cv/diplome';
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      autresinformations: '',
      nomcv: '', 
      typecv: '',
      dateObtention: '',
      etablissement: ''
    }
  });

  const [diplomes, setDiplomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDiplomes = await fetch(apiUrlDiplome, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const resultDiplomes = await responseDiplomes.json();

        if (resultDiplomes.message === 'Ok') {
          setDiplomes(resultDiplomes.data);
        } else {
          console.error('Erreur lors de la récupération des diplômes:', resultDiplomes.error);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, [apiUrlDiplome, token]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/cv/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nomcv: data.nomcv,
          typecv: data.typecv,
          utilisateur: { id: userId },
          diplomeobtention: {
            id : data.iddiplome,
            diplome: { id: data.iddiplome }, // Incluez l'ID du diplôme ici
            dateobtention: data.dateObtention,
            etablissement: data.etablissement
          },
          autresinformations: data.autresinformations
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log(responseData);
        navigate('/client');
      } else {
        throw new Error(responseData.message || 'Erreur lors de l\'ajout du CV');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du CV:', error.message);
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
                        <h5 className="card-title text-center pb-0 fs-4">Ajouter un CV</h5>
                      </div>
                      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" value={userId} {...register('idpersonne')} />
                        
                        <div className="col-md-6">
                          <label htmlFor="nomcv" className="form-label">Nom du CV</label>
                          <input
                            type="text"
                            id="nomcv"
                            className={`form-control ${errors.nomcv ? 'is-invalid' : ''}`}
                            placeholder="Nom du CV"
                            {...register('nomcv', { required: 'Nom du CV requis' })}
                          />
                          {errors.nomcv && <div className="invalid-feedback">{errors.nomcv.message}</div>}
                        </div>
                        
                        <div className="col-md-6">
                          <label htmlFor="typecv" className="form-label">Type de CV</label>
                          <input
                            type="text"
                            id="typecv"
                            className={`form-control ${errors.typecv ? 'is-invalid' : ''}`}
                            placeholder="Type de CV"
                            {...register('typecv', { required: 'Type de CV requis' })}
                          />
                          {errors.typecv && <div className="invalid-feedback">{errors.typecv.message}</div>}
                        </div>
                         <div className="col-md-6">
                                <label htmlFor="iddiplome" className="form-label">Diplôme</label>
                                <select
                                  id="iddiplome"
                                  className={`form-select ${errors.iddiplome ? 'is-invalid' : ''}`}
                                  {...register('iddiplome', { required: 'Diplôme requis' })}
                                >
                                  <option value="">Sélectionner un diplôme</option>
                                  {diplomes.map(diplome => (
                                    <option key={diplome.id} value={diplome.id}>{diplome.nom}</option>
                                  ))}
                                </select>
                                {errors.iddiplome && <div className="invalid-feedback">{errors.iddiplome.message}</div>}
                              </div>

                        <div className="col-md-6">
                          <label htmlFor="dateObtention" className="form-label">Date d'obtention du diplôme</label>
                          <input
                            type="date"
                            id="dateObtention"
                            className={`form-control ${errors.dateObtention ? 'is-invalid' : ''}`}
                            placeholder="Date d'obtention"
                            {...register('dateObtention', { required: 'Date d\'obtention requise' })}
                          />
                          {errors.dateObtention && <div className="invalid-feedback">{errors.dateObtention.message}</div>}
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="etablissement" className="form-label">Établissement</label>
                          <input
                            type="text"
                            id="etablissement"
                            className={`form-control ${errors.etablissement ? 'is-invalid' : ''}`}
                            placeholder="Établissement"
                            {...register('etablissement', { required: 'Établissement requis' })}
                          />
                          {errors.etablissement && <div className="invalid-feedback">{errors.etablissement.message}</div>}
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="autresinformations" className="form-label">Autres Informations</label>
                          <textarea
                            id="autresinformations"
                            className={`form-control ${errors.autresinformations ? 'is-invalid' : ''}`}
                            placeholder="Autres informations"
                            {...register('autresinformations')}
                          ></textarea>
                          {errors.autresinformations && <div className="invalid-feedback">{errors.autresinformations.message}</div>}
                        </div>

                        <div className="col-md-12 text-center">
                          <button type="submit" className="btn btn-primary">Ajouter</button>
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

export default AjoutCv;
