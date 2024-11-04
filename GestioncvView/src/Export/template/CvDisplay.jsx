import React, { forwardRef } from 'react';
import './CvDisplay.css';

const CvDisplay = forwardRef(({ personne, cv, experiences, languages, diplomes,langues }, ref) => {
    return (

            <div ref={ref} className="cv-container">

                <section className="cv-sidebar">
                    <div className="cv-profile">

                        <p>{cv.description}</p>
                    </div>

                    <div className="cv-profile">
                        <h4>Profil</h4>
                        <p>{personne.profil}</p>

                    </div>
                    <div className="cv-contact">
                        <h4>Coordonnées</h4>
                        <p>{personne.adresse}</p>
                        <p>{personne.email}</p>
                        <p>{personne.telephone}</p>
                    </div>
                    <div className="cv-langue">
                        <h4>Langues</h4>
                        {langues.map((langue, index) => (
                            <div key={index}>
                                <p>{langue.langues?.nom  }  - {langue.niveau}</p>
                            </div>
                        ))}
                    </div>


                </section>

                <section className="cv-main">
                    <header className="cv-header">
                        <h1>{personne.nom}</h1>
                        <h3>{cv.titre}</h3>
                    </header>
                    <div className="cv-section">
                        <h4>Formation</h4>
                        {diplomes.map((dip, index) => (
                            <div key={index} className="cv-diplome">
                                <div className="cv-diplome-header">
                                    <h3>{dip.diplome}</h3>
                                    <span>{dip.dateobtention}</span>
                                </div>
                                <li>{dip.etablissement}</li>
                            </div>
                        ))}
                    </div>


                    <div className="cv-section">
                        <h4>Expériences</h4>
                        {experiences.map((exp, index) => (
                            <div key={index} className="cv-experience">
                                <h3>{exp.poste} @ {exp.entreprise}</h3>
                                <span>{exp.debut} - {exp.fin}</span>
                                <p>{exp.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="cv-section">
                        <h4>Domaines</h4>
                        <li>
                            <u>{cv.typecv}</u>
                        </li>
                    </div>


                    <div className="cv-section">
                        <h4>Compétences</h4>
                        <div className="cv-skills">
                            <h5>Langages</h5>
                            <ul>
                                {languages.map((lang, index) => (
                                    <li key={index}>
                                        {lang.language} - {lang.niveau}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

    );
});

export default CvDisplay;
