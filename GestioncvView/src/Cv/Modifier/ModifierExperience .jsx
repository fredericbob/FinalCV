import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ModifierExperience() {
  const { id } = useParams(); // Récupère l'ID de l'expérience depuis l'URL
  const navigate = useNavigate();

  const userId = localStorage.getItem('idutilisateur');
  const token = localStorage.getItem('token');

  const [experience, setExperience] = useState({
    poste: '',
    entreprise: '',
    debut: '',
    fin: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExperience();
  }, [id]);

  async function fetchExperience() {
    try {
      const response = await fetch(`http://localhost:8080/experience/${id}?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      setExperience(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/experience/${id}?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(experience)
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }
      navigate('/client/experience'); // Redirige après succès
    } catch (error) {
      setError(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setExperience(prev => ({
      ...prev,
      [name]: value
    }));
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-danger">Erreur: {error.message}</p>;

  return (
    <div className="container mt-5">
      <h2>Modifier l'expérience</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="poste" className="form-label">Poste</label>
          <input
            type="text"
            className="form-control"
            id="poste"
            name="poste"
            value={experience.poste}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="entreprise" className="form-label">Entreprise</label>
          <input
            type="text"
            className="form-control"
            id="entreprise"
            name="entreprise"
            value={experience.entreprise}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="debut" className="form-label">Début</label>
          <input
            type="date"
            className="form-control"
            id="debut"
            name="debut"
            value={experience.debut}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fin" className="form-label">Fin</label>
          <input
            type="date"
            className="form-control"
            id="fin"
            name="fin"
            value={experience.fin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={experience.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Sauvegarder</button>
      </form>
    </div>
  );
}

export default ModifierExperience;
