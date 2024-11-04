import React, { forwardRef } from 'react';
import './CvDisplayAdmin.css'

const CvDisplayAdmin =forwardRef(({ personne, cv, experiences, languages, diplomes,langues }, ref) => {
    // Vérifie si les coordonnées sont présentes
    const hasCoordonnees = personne.adresse || personne.email || personne.telephone;

    console.log("Langues:", langues);

    return (
        <div ref={ref} className="cv-container">
            <section className="cv-sidebar">
                <div className="cv-profile">
                    <img src="../../assets/img/logo.jpg" className="cv-image-small" alt="Profile logo" />
                    <p>{cv.description}</p>
                </div>
                <div className="cv-profile">
                    <h4>Profil</h4>
                    <p>{personne.profil}</p>

                </div>

                <div className="cv-contactAdmin">
                    <h4>Contact</h4>
                    <p>loveniconsulting@gmail.com</p>
                    <p>034.09.410.08</p>
                </div>

                {/* N'affiche que si des coordonnées existent */}
                {hasCoordonnees && (
                    <div className="cv-contact">
                        <h4>Coordonnées</h4>
                        {personne.adresse && <p>{personne.adresse}</p>}
                        {personne.email && <p>{personne.email}</p>}
                        {personne.telephone && <p>{personne.telephone}</p>}
                    </div>
                )}

                < div className="cv-langue">
                    <h4>Langues</h4>

                        <p> Anglais  - Intermediaire</p>
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

export default CvDisplayAdmin;
