import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AjoutExperience() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
    // Récupérer l'ID de l'utilisateur depuis le localStorage
  const userId = localStorage.getItem('idutilisateur');   

  const apiUrlExperience = 'http://localhost:8080/experience/add'; // Remplace avec l'URL correcte pour ajouter une expérience
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      poste: '',
      entreprise: '',
      debut: '',
      fin: '',
      description: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(apiUrlExperience, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          utilisateur: {id: userId } // Inclure l'ID de l'utilisateur dans les données envoyées
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.data);
        navigate('/client'); // Rediriger après ajout réussi
      } else {
        throw new Error(responseData.message || 'Erreur lors de l\'ajout de l\'expérience');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'expérience:', error.message);
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
                        <h5 className="card-title text-center pb-0 fs-4">Ajouter une Expérience</h5>
                      </div>
                      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-6">
                          <label htmlFor="poste" className="form-label">Poste</label>
                          <input
                            type="text"
                            id="poste"
                            className={`form-control ${errors.poste ? 'is-invalid' : ''}`}
                            placeholder="Dérnier poste"
                            {...register('poste', { required: 'Poste requis' })}
                          />
                          {errors.poste && <div className="invalid-feedback">{errors.poste.message}</div>}
                        </div>
                        
                        <div className="col-md-6">
                          <label htmlFor="entreprise" className="form-label">Entreprise</label>
                          <input
                            type="text"
                            id="entreprise"
                            className={`form-control ${errors.entreprise ? 'is-invalid' : ''}`}
                            placeholder="Entreprise"
                            {...register('entreprise', { required: 'Entreprise requise' })}
                          />
                          {errors.entreprise && <div className="invalid-feedback">{errors.entreprise.message}</div>}
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="debut" className="form-label">Date de début</label>
                          <input
                            type="date"
                            id="debut"
                            className={`form-control ${errors.debut ? 'is-invalid' : ''}`}
                            placeholder="Date de début"
                            {...register('debut', { required: 'Date de début requise' })}
                          />
                          {errors.debut && <div className="invalid-feedback">{errors.debut.message}</div>}
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="fin" className="form-label">Date de fin</label>
                          <input
                            type="date"
                            id="fin"
                            className={`form-control ${errors.fin ? 'is-invalid' : ''}`}
                            placeholder="Date de fin"
                            {...register('fin')}
                          />
                          {errors.fin && <div className="invalid-feedback">{errors.fin.message}</div>}
                        </div>

                        <div className="col-md-12">
                          <label htmlFor="description" className="form-label">Description</label>
                          <textarea
                            id="description"
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            placeholder="Autre poste et descrpition"
                            {...register('description')}
                          ></textarea>
                          {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
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

export default AjoutExperience;
