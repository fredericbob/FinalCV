import React, { useState, useEffect } from 'react';
import axios from "axios";
import { DataTable } from 'simple-datatables';

const PAGE_SIZE = 8;

function ListeCandidat() {
  const apiUrl = 'http://localhost:8080/personnes';
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [dataOrigin, setDataOrigin] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputPoste, setInputPoste] = useState('');
  const [inputKeyword, setInputKeyword] = useState(''); // Recherche par mot-clé
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch_data();
  }, []);

  const fetch_data = () => {
    axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setData(response.data.data);
      setDataOrigin(response.data.data);
    }).catch((error) => {
      console.log("error ", error);
    });
  };

  const archiver = (personne_id) => {
    axios.get(`http://localhost:8080/personnes/archiver/${personne_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      fetch_data();
    }).catch((error) => {
      console.log('error ', error);
    });
  };

  const voirCv = (personne_id) => {
    window.location.href = `/admin/detailcv/${personne_id}`;
  };

  const exporter = (personne_id) => {
    window.location.href = `/admin/detailcv/${personne_id}/${true}`;
  };

  const languages = ['Java', 'JavaScript', 'Python', 'Ruby', 'PHP', 'C++', 'C#', 'Go', 'Swift', 'Ionic'];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterData(value);
    if (value.length > 0) {
      const filteredSuggestions = languages.filter((language) =>
          language.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    filterData(suggestion);
  };

  const handleChangePoste = (e) => {
    const data_input = e.target.value;
    setInputPoste(data_input);

    const lowercasedInputVal = data_input.toLowerCase();
    const new_data = dataOrigin.filter(d =>
        d.experience.some(e =>
            e?.poste.toLowerCase().includes(lowercasedInputVal)
        )
    );
    setData(new_data);
  };

  const handleChangeKeyword = (e) => { // Fonction de recherche par mot-clé
    const data_input = e.target.value;
    setInputKeyword(data_input);

    const lowercasedInputVal = data_input.toLowerCase();
    const new_data = dataOrigin.filter(d =>
        d.personne.nom.toLowerCase().includes(lowercasedInputVal) ||
        d.personne.email.toLowerCase().includes(lowercasedInputVal) ||
        d.personne.telephone.toLowerCase().includes(lowercasedInputVal) ||
        d.experience.some(e =>
            e?.poste.toLowerCase().includes(lowercasedInputVal) || // Recherche par poste
            e?.entreprise.toLowerCase().includes(lowercasedInputVal) // Recherche par entreprise
        )
    );
    setData(new_data);
  };

  const filterData = (inputval) => {
    const lowercasedInputVal = inputval.toLowerCase();
    const new_data = dataOrigin.filter(d =>
        d.language.some(l =>
            l.language.toLowerCase().includes(lowercasedInputVal)
        )
    );
    setData(new_data);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return data.slice(start, end);
  };

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  return (
      <main id="main" className="main">
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-start align-items-center">
                    <h5 className="card-title">Liste des candidats</h5>
                    <div className="d-flex flex-column position-relative" style={{ maxWidth: '200px', marginLeft: '12px' }}>
                      <input
                          type="text"
                          className="form-control"
                          placeholder="Rechercher par compétence"
                          value={inputValue}
                          onChange={handleInputChange}
                          style={{ width: '100%' }}
                      />
                      {suggestions.length > 0 && (
                          <ul className="list-group position-absolute w-100 mt-1" style={{ top: '100%', zIndex: '1000' }}>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="list-group-item"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </li>
                            ))}
                          </ul>
                      )}
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        value={inputPoste}
                        onChange={handleChangePoste}
                        placeholder="Rechercher par poste"
                        style={{ maxWidth: '200px', marginLeft: '20px' }}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={inputKeyword}
                        onChange={handleChangeKeyword}
                        placeholder="Rechercher par mot-clé"
                        style={{ maxWidth: '200px', marginLeft: '20px' }}
                    />
                  </div>
                  <table className="table">
                    <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Dernier poste</th>
                      <th>Expérience(s)</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {getPaginatedData().map((d, index) => {
                      const lastExperience = d.experience.slice(-1)[0];
                      const personne_id = d.personne.id;
                      return (
                          <tr key={index}>
                            <td>{d.personne.nom}</td>
                            <td>{lastExperience ? lastExperience.poste + ' à ' + lastExperience.entreprise : 'N/A'}</td><td>
                            <ul>
                              {d.experience.map((exp, expIndex) => {
                                const debut = new Date(exp.debut); // Convertir en objet Date
                                const fin = new Date(exp.fin); // Convertir en objet Date

                                // Calculer la différence en années
                                let years = fin.getFullYear() - debut.getFullYear();
                                const m = fin.getMonth() - debut.getMonth();
                                if (m < 0 || (m === 0 && fin.getDate() < debut.getDate())) {
                                  years--; // Ajuster si la date de fin est avant l'anniversaire de début
                                }

                                return (
                                    <li key={expIndex}>
                                      {exp.poste}{`${Boolean(years) ? `:(${years} ans)`: ''}`}
                                    </li>
                                );
                              })}
                            </ul>
                          </td>

                            <td>{d.personne.telephone}</td>
                            <td>{d.personne.email}</td>
                            <td>
                            <span onClick={() => voirCv(personne_id)} style={{ color: 'darkgoldenrod' }}>
                              <i className="bx bx-edit"></i>Voir
                            </span>
                            </td>
                            <td>
                            <span onClick={() => archiver(personne_id) } style={{ color: 'darkred' }}>
                              <i className="bi-archive"></i>Archiver
                            </span>
                            </td>
                            <td>
                            <span onClick={() => exporter(personne_id)} style={{ color: 'blue' }}>
                              <i className="bx bx-edit"></i>Exporter
                            </span>
                            </td>
                          </tr>
                      );
                    })}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-center mt-3">
                    <nav>
                      <ul className="pagination">
                        <li className="page-item">
                          <button
                              className="page-link"
                              style={{ backgroundColor: 'white', color: 'red' }}
                              disabled={currentPage === 1}
                              onClick={() => goToPage(currentPage - 1)}
                          >
                            Précédent
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                key={index}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                              <button
                                  className="page-link"
                                  style={{ backgroundColor: 'darkblue', color: 'white' }}
                                  onClick={() => goToPage(index + 1)}
                              >
                                {index + 1}
                              </button>
                            </li>
                        ))}
                        <li className="page-item">
                          <button
                              className="page-link"
                              style={{ backgroundColor: 'white', color: 'green' }}
                              disabled={currentPage === totalPages}
                              onClick={() => goToPage(currentPage + 1)}
                          >
                            Suivant
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}

export default ListeCandidat;
