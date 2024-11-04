import React, { useState, useEffect } from 'react';
import axios from "axios";

const PAGE_SIZE = 8;

function ListeCandidat() {
    const apiUrl = 'http://localhost:8080/personnes/archiveds';
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
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
            console.log(response.data.data);
            setData(response.data.data);
        }).catch((error) => {
            console.log("error ", error);
        });
    }

    const desarchiver = (cv_id) => {
        axios.get(`http://localhost:8080/personnes/desarchiver/${cv_id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            fetch_data();
        }).catch((error) => {
            console.log('error ', error);
        });
    }

    const totalPages = Math.ceil(data.length / PAGE_SIZE);

    const getPaginatedData = () => {
        const start = (currentPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return data.slice(start, end);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <main id="main" className="main">
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Liste des candidats archivés</h5>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Dernier poste</th>
                                        <th>Expérience(s)</th>
                                        <th>Téléphone</th>
                                        <th>Email</th>
                                        <th>Supprimer </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {getPaginatedData().map((d, index) => {
                                        const lastExperience = d.experience.slice(-1)[0];
                                        const cv_id = d.cv.id;
                                        return (
                                            <tr key={index}>
                                                <td>{d.personne.nom}</td>
                                                <td>{lastExperience ? lastExperience.poste + ' à ' + lastExperience.entreprise : 'N/A'}</td>
                                                <td>
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
                                                                    {exp.poste}:({years} ans)
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </td>
                                                <td>{d.personne.telephone}</td>
                                                <td>{d.personne.email}</td>
                                                <td>
                                                        <span onClick={() => desarchiver(cv_id)} style={{ color: 'darkred' }}>
                                                            <i className="bi-trash"></i>Supprimer
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
