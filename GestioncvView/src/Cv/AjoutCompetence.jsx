import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AjoutCompetence() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('idutilisateur'); // ID de l'utilisateur connecté

  const [domaines, setDomaines] = useState([]);
  const [niveaux, setNiveaux] = useState([]);

  const apiUrlDomaine = 'http://localhost:8080/competences/domaine'; // URL pour récupérer les domaines
  const apiUrlNiveau = 'http://localhost:8080/competences/niveau'; // URL pour récupérer les niveaux

  // Récupérer les données des domaines et niveaux de compétence
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDomaines = await fetch(apiUrlDomaine, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const resultDomaines = await responseDomaines.json();

        if (resultDomaines.message === 'Ok') {
          setDomaines(resultDomaines.data);
        } else {
          console.error('Erreur lors de la récupération des domaines:', resultDomaines.error);
        }

        const responseNiveaux = await fetch(apiUrlNiveau, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const resultNiveaux = await responseNiveaux.json();

        if (resultNiveaux.message === 'Ok') {
          setNiveaux(resultNiveaux.data);
        } else {
          console.error('Erreur lors de la récupération des niveaux:', resultNiveaux.error);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, [apiUrlDomaine, apiUrlNiveau, token]);

  const apiUrlCompetence = 'http://localhost:8080/competences/add'; // URL pour ajouter une compétence
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: { 
      competences: [{ domaine: '', niveaucompetence: '', description: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'competences'
  });

  const onSubmit = async (data) => {
    try {
      for (const competence of data.competences) {
        const response = await fetch(apiUrlCompetence, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            utilisateur: { id: userId },
            domaine: { id: competence.domaine },
            niveaucompetence: { id: competence.niveaucompetence },
            description: competence.description,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || 'Erreur lors de l\'ajout de la compétence');
        }
      }
      navigate('/client'); // Rediriger après ajout réussi
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la compétence:', error.message);
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
                        <h5 className="card-title text-center pb-0 fs-4">Ajouter des Compétences</h5>
                      </div>
                      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((item, index) => (
                          <div key={item.id} className="col-md-12 mb-3">
                            <div className="row">
                              <div className="col-md-4 mb-3">
                                <label htmlFor={`competences[${index}].domaine`} className="form-label">Domaine</label>
                                <select
                                  id={`competences[${index}].domaine`}
                                  className={`form-select ${errors.competences?.[index]?.domaine ? 'is-invalid' : ''}`}
                                  {...register(`competences[${index}].domaine`, { required: 'Le domaine est requis.' })}
                                >
                                  <option value="">Sélectionner un domaine</option>
                                  {domaines.map(domaine => (
                                    <option key={domaine.id} value={domaine.id}>{domaine.nomdomaine}</option>
                                  ))}
                                </select>
                                {errors.competences?.[index]?.domaine && <div className="invalid-feedback">{errors.competences[index].domaine.message}</div>}
                              </div>
                              
                              <div className="col-md-4">
                                <label htmlFor={`competences[${index}].niveaucompetence`} className="form-label">Niveau de Compétence</label>
                                <select
                                  id={`competences[${index}].niveaucompetence`}
                                  className={`form-select ${errors.competences?.[index]?.niveaucompetence ? 'is-invalid' : ''}`}
                                  {...register(`competences[${index}].niveaucompetence`, { required: 'Le niveau de compétence est requis.' })}
                                >
                                  <option value="">Sélectionner un niveau</option>
                                  {niveaux.map(niveau => (
                                    <option key={niveau.id} value={niveau.id}>{niveau.nom}</option>
                                  ))}
                                </select>
                                {errors.competences?.[index]?.niveaucompetence && <div className="invalid-feedback">{errors.competences[index].niveaucompetence.message}</div>}
                              </div>

                              <div className="col-md-12 mb-3" >
                                <label htmlFor={`competences[${index}].description`} className="form-label">Description</label>
                                <textarea
                                  id={`competences[${index}].description`}
                                  className={`form-control ${errors.competences?.[index]?.description ? 'is-invalid' : ''}`}
                                  placeholder="Exemple : Compétence en développement de logiciels"
                                  {...register(`competences[${index}].description`)}
                                ></textarea>
                                {errors.competences?.[index]?.description && <div className="invalid-feedback">{errors.competences[index].description.message}</div>}
                              </div>
                              <div className="col-md-5 text-start">
                                <button type="button" className="btn btn-secondary" onClick={() => append({ domaine: '', niveaucompetence: '', description: '' })}>Ajouter une compétence</button>
                              </div>
                              
                              <div className="col-md-5 text-end">
                                <button type="button" className="btn btn-danger" onClick={() =>{if (index !== 0) { remove(index)}}}>Supprimer</button>
                              </div>
                            
                            </div>
                          </div>
                        ))}
                        <div className="col-md-12 text-center">
                          <button type="submit" className="btn btn-primary">Ajouter toutes les compétences</button>
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

export default AjoutCompetence;
