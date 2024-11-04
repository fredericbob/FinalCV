import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

function AjoutLangue() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('idutilisateur'); // ID de l'utilisateur connecté

  const [langues, setLangues] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal
  const [formData, setFormData] = useState(null); // State to hold form data

  const apiUrlLangue = 'http://localhost:8080/cv/language'; // URL pour récupérer les langues disponibles

  // Récupérer les données des langues
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrlLangue, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const result = await response.json();

        if (result.message === 'Ok') {
          setLangues(result.data);
        } else {
          console.error('Erreur lors de la récupération des langues:', result.error);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, [apiUrlLangue, token]);

  const apiUrlLangueAjout = 'http://localhost:8080/cvluangages/add'; // URL pour ajouter une langue
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: { 
      langues: [{ langue: '', pourcentage: '0' }] // Initialisation avec pourcentage à 0
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'langues'
  });

  const onSubmit = (data) => {
    // Show confirmation modal
    setFormData(data); // Store form data in state
    setShowConfirmation(true);
  };

  const confirmAddLangues = async () => {
    try {
      // Assurer que les pourcentages sont toujours positifs et entre 0 et 100
      const sanitizedData = {
        langues: formData.langues.map(langue => ({
          langue: langue.langue,
          pourcentage: Math.max(0, Math.min(100, Number(langue.pourcentage))) // Valeur entre 0 et 100
        }))
      };

      for (const langue of sanitizedData.langues) {
        const response = await fetch(apiUrlLangueAjout, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            utilisateur: { id: userId },
            language: { id: langue.langue },
            pourcentage: langue.pourcentage,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || 'Erreur lors de l\'ajout de la langue');
        }
      }
      setShowConfirmation(false);
      navigate('/client'); // Rediriger après ajout réussi
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la langue:', error.message);
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
                        <h5 className="card-title text-center pb-0 fs-4">Ajouter des Langues</h5>
                      </div>
                      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((item, index) => (
                          <div key={item.id} className="col-md-12 mb-3">
                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <label htmlFor={`langues[${index}].langue`} className="form-label">Langue</label>
                                <select
                                  id={`langues[${index}].langue`}
                                  className={`form-select ${errors.langues?.[index]?.langue ? 'is-invalid' : ''}`}
                                  {...register(`langues[${index}].langue`, { required: 'La langue est requise.' })}
                                >
                                  <option value="">Sélectionner une langue</option>
                                  {langues.map(langue => (
                                    <option key={langue.id} value={langue.id}>{langue.nom}</option>
                                  ))}
                                </select>
                                {errors.langues?.[index]?.langue && <div className="invalid-feedback">{errors.langues[index].langue.message}</div>}
                              </div>
                              
                              <div className="col-md-6">
                                <label htmlFor={`langues[${index}].pourcentage`} className="form-label">Pourcentage</label>
                                <input
                                  id={`langues[${index}].pourcentage`}
                                  type="number"
                                  min="0"
                                  max="100" // Limite à 100
                                  step="1" // Permet uniquement des valeurs entières
                                  className={`form-control ${errors.langues?.[index]?.pourcentage ? 'is-invalid' : ''}`}
                                  {...register(`langues[${index}].pourcentage`, { 
                                    required: 'Le pourcentage est requis.',
                                    min: { value: 0, message: 'Le pourcentage ne peut pas être inférieur à 0.' },
                                    max: { value: 100, message: 'Le pourcentage ne peut pas dépasser 100.' }
                                  })}
                                />
                                {errors.langues?.[index]?.pourcentage && <div className="invalid-feedback">{errors.langues[index].pourcentage.message}</div>}
                              </div>

                              <div className="col-md-5 text-start">
                                <button type="button" className="btn btn-secondary" onClick={() => append({ langue: '', pourcentage: '0' })}>Ajouter une langue</button>
                              </div>
                              
                              <div className="col-md-5 text-end">
                                <button type="button" className="btn btn-danger" onClick={() => {if (index !== 0) { remove(index) }}}>Supprimer</button>
                              </div>
                            
                            </div>
                          </div>
                        ))}
                        <div className="col-md-12 text-center">
                          <button type="submit" className="btn btn-primary">Ajouter toutes les langues</button>
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

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir ajouter ces langues ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={confirmAddLangues}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default AjoutLangue;
