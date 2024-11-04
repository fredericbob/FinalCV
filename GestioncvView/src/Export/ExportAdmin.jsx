import React, { useEffect, useRef, useState } from 'react';
import './Export.css';
import html2pdf from 'html2pdf.js';
import CvDisplay from "./template/CvDisplay";
import axios from "axios";
import CvDisplayAdmin from "./template/CvDisplayAdmin";

const token = localStorage.getItem('token');
const userId = localStorage.getItem('idutilisateur');

function ExportPdf() {
    const cvDisplayRef = useRef(null);

    const handleExport = () => {
        if (cvDisplayRef.current) {
            const element = cvDisplayRef.current;
            const opt = {
                margin: 0,
                filename: 'cv.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: {
                    scale: 2.5,
                    backgroundColor: 'rgba(255, 255, 255, 1)', // Utilise un fond entièrement transparent avec rgba
                    logging: true,  // Active les logs pour voir les détails
                    useCORS: true,  // Utilise CORS pour les images
                },
                jsPDF: {
                    unit: 'pt',
                    format: 'a4', // Format A4
                    orientation: 'portrait',

                }
            };

            html2pdf().from(element).set(opt).save();
        }
    };
    const [step, setStep] = useState(1);
    const [personne, setPersonne] = useState({});
    const [cv, setCv] = useState({});
    const [languages, setLanguages] = useState([]);
    const [langues, setLangues] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [diplomes, setDiplomes] = useState([]);

    useEffect(() => {
        console.log(userId);
        axios.get(`http://localhost:8080/personnes/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            const data = response.data.data;
            console.log(data);

            if (data) {
                setCv(data.cv || {});
                setPersonne(data.personne || {});
                setLanguages(data.language || []);
                setExperiences(data.experience || []);
                setLangues(data.langues || []);
                setDiplomes(data.diplome || []);
            } else {
                console.log("Aucune donnée reçue");
            }
        }).catch((error) => {
            console.log("Erreur lors de la récupération des données : ", error);
        });
    }, []);


    const modif = () => { setStep(1) };
    const view = () => { setStep(2) };

    const h4Style = {
        color: '#800000' // Remplacez par la couleur désirée
    };


    return (
        <main id="main" className="main">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-2">
                    <button className="button-9" role="button" onClick={modif}>Modifier</button>
                </div>
                <div className="col-2">
                    <button className="button-9" role="button" onClick={view}>Voir</button>
                </div>
                <div className="col-2">
                    <button className="button-9" role="button" onClick={handleExport}>Exporter</button>
                </div>
            </div>
            {step === 1 && (
                <div className="container my-4">
                    {/* Section Personne */}
                    <div className="mb-4">
                        <h4 style={h4Style}>Nom</h4>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={personne.nom}
                            onChange={(e) => setPersonne(prevState => ({ ...prevState, nom: e.target.value }))}
                        />
                        <h4 style={h4Style}>Date de naissance</h4>
                        <input
                            type="date"
                            className="form-control mb-2"
                            value={personne.date_naissance}
                            onChange={(e) => setPersonne(prevState => ({ ...prevState, date_naissance: e.target.value }))}
                        />
                        <h4 style={h4Style}>Adresse</h4>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={personne.adresse}
                            onChange={(e) => setPersonne(prevState => ({ ...prevState, adresse: e.target.value }))}
                        />
                        <h4 style={h4Style}>Email</h4>
                        <input
                            type="email"
                            className="form-control mb-2"
                            value={personne.email}
                            onChange={(e) => setPersonne(prevState => ({ ...prevState, email: e.target.value }))}
                        />
                        <h4 style={h4Style}>Téléphone</h4>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={personne.telephone}
                            onChange={(e) => setPersonne(prevState => ({ ...prevState, telephone: e.target.value }))}
                        />
                        <h4 style={h4Style}>Genre</h4>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={personne.genre}
                            onChange={(e) => setPersonne(prevState => ({ ...prevState, genre: e.target.value }))}
                        />
                        <h4 style={h4Style}>Statut matrimonial</h4>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={personne.statutmatrimonial}
                            onChange={(e) => setPersonne(prevState => ({ ...prevState, statutmatrimonial: e.target.value }))}
                        />
                        <h4 style={h4Style}>Profil</h4>
                        <textarea
                            type="text"
                            className="form-control mb-2"
                            value={personne.profil}
                            onChange={(e) => setPersonne(prevState => ({ ...prevState, profil: e.target.value }))}
                        />
                    </div>

                    {/* Section CV */}
                    <div className="mb-4">
                        <h4 style={h4Style}>Titre</h4>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={cv.titre}
                            onChange={(e) => setCv(prevState => ({ ...prevState, titre: e.target.value }))}
                        />
                        <h4 style={h4Style}>Domaine</h4>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={cv.typecv}
                            onChange={(e) => setCv(prevState => ({ ...prevState, typecv: e.target.value }))}
                        />
                    </div>

                    {/* Section Languages */}
                    {languages.map((lang, index) => (
                        <div key={index} className="mb-4">
                            <h4 style={h4Style}>Language {index + 1}</h4>
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={lang.language}
                                onChange={(e) => {
                                    const newLanguages = [...languages];
                                    newLanguages[index].language = e.target.value;
                                    setLanguages(newLanguages);
                                }}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={lang.niveau}
                                onChange={(e) => {
                                    const newLanguages = [...languages];
                                    newLanguages[index].niveau = e.target.value;
                                    setLanguages(newLanguages);
                                }}
                            />
                        </div>
                    ))}

                    {/* Section Experiences */}
                    {experiences.map((exp, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-primary">Experience {index + 1}</h3>
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={exp.poste || ''} // Ajoutez une valeur par défaut pour éviter les erreurs
                                onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].poste = e.target.value;
                                    setExperiences(newExperiences);
                                }}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={exp.entreprise || ''} // Idem
                                onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].entreprise = e.target.value;
                                    setExperiences(newExperiences);
                                }}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={exp.debut || ''} // Idem
                                onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].debut = e.target.value;
                                    setExperiences(newExperiences);
                                }}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={exp.fin || ''} // Idem
                                onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].fin = e.target.value;
                                    setExperiences(newExperiences);
                                }}
                            />
                            <textarea
                                className="form-control mb-2"
                                value={exp.description || ''} // Idem
                                onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].description = e.target.value;
                                    setExperiences(newExperiences);
                                }}
                                rows="3"
                            />
                        </div>
                    ))}

                    {langues.map((langue, index) => {
                        return (
                            <div key={index} className="mb-4">
                                <h4 style={h4Style}>Langue {index + 1}</h4>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={langue.langues?.nom || ''}
                                    onChange={(e) => {
                                        const nouvellesLangues = [...langues];
                                        nouvellesLangues[index].langues.nom = e.target.value;
                                        setLangues(nouvellesLangues);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={langue.niveau || ''}
                                    onChange={(e) => {
                                        const nouvellesLangues = [...langues];
                                        nouvellesLangues[index].niveau = e.target.value;
                                        setLangues(nouvellesLangues);
                                    }}
                                />
                            </div>
                        );
                    })}



                    {/* Section Diplômes */}
                    {diplomes.map((diplome, index) => (
                        <div key={index} className="mb-4">
                            <h4 style={h4Style}>Diplôme {index + 1}</h4>
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={diplome.diplome}
                                onChange={(e) => {
                                    const newDiplomes = [...diplomes];
                                    newDiplomes[index].diplome = e.target.value;
                                    setDiplomes(newDiplomes);
                                }}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={diplome.etablissement}
                                onChange={(e) => {
                                    const newDiplomes = [...diplomes];
                                    newDiplomes[index].etablissement = e.target.value;
                                    setDiplomes(newDiplomes);
                                }}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={diplome.dateobtention}
                                onChange={(e) => {
                                    const newDiplomes = [...diplomes];
                                    newDiplomes[index].dateobtention = e.target.value;
                                    setDiplomes(newDiplomes);
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {step === 2 && (


                <div ref={cvDisplayRef} className="cv-display">
                    {/* Affichage du CV */}
                    <CvDisplayAdmin
                        personne={personne}
                        cv={cv}
                        languages={languages}
                        langues={langues}
                        experiences={experiences}
                        diplomes={diplomes}
                    />
                </div>


            )}
        </main>
    );

}

export default ExportPdf;
