import React, { useState,useEffect  } from 'react';
import axios from "axios";

const token = localStorage.getItem("token");
const userId = localStorage.getItem('idutilisateur');

const Saisie = () => {
    const [step, setStep] = useState(1);
    const [personne, setPersonne] = useState({});
    const [cv, setCv] = useState({});
    const [languages, setLanguages] = useState([{}])
    const [experiences, setExperiences] = useState([{}]);
    const [langues, setlangues] = useState([{}]);
    const [availableLangues, setAvailableLangues] = useState([]);
    const [diplomes, setDiplomes] = useState([{}]);

    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);
    const resetForm = () => {
        setPersonne({
            nom: '',
            date_naissance: '',
            adresse: '',
            email: '',
            telephone: '',
            genre: '',
            statutmatrimonial: '',
            profil: ''
        });
        setCv({
            titre: '',
            typecv: ''
        });
        setLanguages([{
            language: '',
            niveau: ''
        }]);
        setExperiences([{
            poste: '',
            entreprise: '',
            debut: '',
            fin: '',
            description: ''
        }]);
        setlangues([{
            id_langue: '',
            niveau: ''
        }]);
        setDiplomes([{
            diplome: '',
            dateobtention: '',
            etablissement: ''
        }]);
    };


    useEffect(() => {
        axios.get('http://localhost:8080/personnes/findallLangue', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            console.log("Réponse de l'API:", response.data); // Debug
            if (Array.isArray(response.data.data)) { // Vérifiez ici
                setAvailableLangues(response.data.data); // Mettez à jour avec les données des langues
                console.log("Langues disponibles:", response.data.data); // Affiche les langues disponibles
            } else {
                console.error("La réponse 'data' n'est pas un tableau");
            }
        }).catch(error => {
            console.log("Erreur lors du chargement des langues", error);
        });
    }, []);

    const handleLangueChange = (index, field, value) => {
        console.log(`Changement de la langue à l'index ${index} avec la valeur ${value}`);
        const newLangues = [...langues];
        newLangues[index][field] = value; // Assurez-vous que 'field' est soit 'id_langue' soit 'niveau'
        setlangues(newLangues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ personne, cv, experiences, diplomes, langues });

        axios.post(`http://localhost:8080/personnes/savePersonne/${userId}`, personne, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            console.log("saved personne");
            const personne_id = response.data.data;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            // Préparez les langues ici
            const cleanedLangues = langues
                .filter(langue => langue.id_langue && langue.niveau)
                .map(langue => ({
                    langues: { id: langue.id_langue }, // Mettez ici l'objet avec id
                    niveau: langue.niveau
                }));

            Promise.all([
                axios.post(`http://localhost:8080/personnes/saveCv/${personne_id}`, cv, { headers }),
                axios.post(`http://localhost:8080/personnes/saveExperiences/${personne_id}`, experiences, { headers }),
                axios.post(`http://localhost:8080/personnes/saveLangue/${personne_id}`, cleanedLangues, { headers }), // Utilisez cleanedLangues ici
                axios.post(`http://localhost:8080/personnes/saveDos/${personne_id}`, diplomes, { headers }),
                axios.post(`http://localhost:8080/personnes/saveLanguages/${personne_id}`, languages, { headers })
            ]).then(() => {
                console.log("saved all data");
                resetForm(); // Déplacez-le ici
                window.location.href = "/client/"; // Redirection après la sauvegarde réussie
            }).catch((error) => {
                console.log("error saving data", error);
            });

        }).catch((error) => {
            console.log("error saving personne", error);
        });
    };




    const addExperience = () => {
        setExperiences([...experiences, { poste: '', entreprise: '', debut: '', fin: '', description: '' }]);
    };
    const addLangue = () => {
        setlangues([...langues, { id_langue: '', niveau: '' }]);
    };

    const addDiplome = () => {
        setDiplomes([...diplomes, { diplome: '', dateobtention: '', etablissement: '' }]);
    };

    const addLanguage = () => {
        setLanguages([...languages, { language: '', niveau: '' }]);
    };

    return (
        <main id="main" className="main">
            <form onSubmit={handleSubmit} className="container mt-4">
                {step === 1 && (
                    <div>
                        <h2>Informations Personnelles</h2>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Nom" value={personne.nom} onChange={(e) => setPersonne({ ...personne, nom: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <input type="date" className="form-control" placeholder="Date de Naissance" value={personne.date_naissance} onChange={(e) => setPersonne({ ...personne, date_naissance: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Adresse" value={personne.adresse} onChange={(e) => setPersonne({ ...personne, adresse: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder="Email" value={personne.email} onChange={(e) => setPersonne({ ...personne, email: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Téléphone" value={personne.telephone} onChange={(e) => setPersonne({ ...personne, telephone: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-control"
                                value={personne.genre}
                                onChange={(e) => setPersonne({ ...personne, genre: e.target.value })}
                            >
                                <option value="">Sélectionnez un genre</option>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-control"
                                value={personne.statutmatrimonial}
                                onChange={(e) => setPersonne({ ...personne, statutmatrimonial: e.target.value })}
                            >
                                <option value="">Sélectionnez un statut matrimonial</option>
                                <option value="Célibataire">Célibataire</option>
                                <option value="Marié(e)">Marié(e)</option>
                                <option value="Divorcé(e)">Divorcé(e)</option>
                                <option value="Veuf/Veuve">Veuf/Veuve</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Entrer votre Profil" value={personne.profil} onChange={(e) => setPersonne({ ...personne, profil: e.target.value })} />
                        </div>

                        <button type="button" className="btn btn-primary" onClick={handleNext}>Suivant</button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2>Remplissage du CV</h2>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Titre" value={cv.titre} onChange={(e) => setCv({ ...cv, titre: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Domaine (Développement Web, Développement Mobile)" value={cv.typecv} onChange={(e) => setCv({ ...cv, typecv: e.target.value })} />
                        </div>
                        <button type="button" className="btn btn-secondary me-2" onClick={handlePrevious}>Précédent</button>
                        <button type="button" className="btn btn-primary" onClick={handleNext}>Suivant</button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2>Langages de Programmation</h2>
                        {languages.map((language, index) => (
                            <div key={index} className="mb-3">
                                <input type="text" className="form-control mb-2" placeholder="Langage" value={language.language} onChange={(e) => {
                                    const newLanguages = [...languages];
                                    newLanguages[index].language = e.target.value;
                                    setLanguages(newLanguages);
                                }} />
                                <input type="text" className="form-control mb-2" placeholder="Niveau (Débutant, Intermédiaire, Avancé) (1-10)" value={language.niveau} onChange={(e) => {
                                    const newLanguages = [...languages];
                                    newLanguages[index].niveau = e.target.value;
                                    setLanguages(newLanguages);
                                }} />
                                <hr />
                            </div>
                        ))}
                        <button type="button" className="btn btn-success mb-3" onClick={addLanguage}>Ajouter un langage +</button>
                        <div>
                            <button type="button" className="btn btn-secondary me-2" onClick={handlePrevious}>Précédent</button>
                            <button type="button" className="btn btn-primary" onClick={handleNext}>Suivant</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <h2>Expérience</h2>
                        {experiences.map((experience, index) => (
                            <div key={index} className="mb-3">
                                <input type="text" className="form-control mb-2" placeholder="Poste" value={experience.poste} onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].poste = e.target.value;
                                    setExperiences(newExperiences);
                                }} />
                                <input type="text" className="form-control mb-2" placeholder="Entreprise" value={experience.entreprise} onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].entreprise = e.target.value;
                                    setExperiences(newExperiences);
                                }} />
                                <input type="text" className="form-control mb-2" placeholder="Début" value={experience.debut} onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].debut = e.target.value;
                                    setExperiences(newExperiences);
                                }} />
                                <input type="text" className="form-control mb-2" placeholder="Fin" value={experience.fin} onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].fin = e.target.value;
                                    setExperiences(newExperiences);
                                }} />
                                <input type="text" className="form-control mb-2" placeholder="Description" value={experience.description} onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].description = e.target.value;
                                    setExperiences(newExperiences);
                                }} />
                                <hr />
                            </div>
                        ))}
                        <button type="button" className="btn btn-success mb-3" onClick={addExperience}>Ajouter une expérience +</button>
                        <div>
                            <button type="button" className="btn btn-secondary me-2" onClick={handlePrevious}>Précédent</button>
                            <button type="button" className="btn btn-primary" onClick={handleNext}>Suivant</button>
                        </div>
                    </div>
                )}
                {step === 5 && (
                    <div>
                        <h2>Langue</h2>
                        {langues.map((langue, index) => (
                            <div key={index} className="mb-3">
                                <select
                                    className="form-control"
                                    value={langue.id_langue}
                                    onChange={(e) => handleLangueChange(index, 'id_langue', e.target.value)}
                                >
                                    <option value="">Sélectionnez une langue</option>
                                    {availableLangues && availableLangues.length > 0 ? (
                                        availableLangues.map((availableLangue) => (
                                            <option key={availableLangue.id} value={availableLangue.id}>
                                                {availableLangue.nom}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Aucune langue disponible</option>
                                    )}
                                </select>

                                <select
                                    className="form-control mt-2"
                                    value={langue.niveau}
                                    onChange={(e) => handleLangueChange(index, 'niveau', e.target.value)}
                                >
                                    <option value="">Sélectionnez un niveau</option>
                                    <option value="Avancé">Avancé</option>
                                    <option value="Intermédiaire">Intermédiaire</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                        ))}
                        <button type="button" className="btn btn-success mb-3" onClick={addLangue}>
                            Ajouter une langue +
                        </button>
                        <div>
                            <button type="button" className="btn btn-secondary me-2" onClick={handlePrevious}>
                                Précédent
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleNext}>
                                Suivant
                            </button>
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div>
                        <h2>Diplôme</h2>
                        {diplomes.map((diplome, index) => (
                            <div key={index} className="mb-3">
                                <input type="text" className="form-control mb-2" placeholder="Diplôme" value={diplome.diplome} onChange={(e) => {
                                    const newDiplomes = [...diplomes];
                                    newDiplomes[index].diplome = e.target.value;
                                    setDiplomes(newDiplomes);
                                }} />
                                <input type="text" className="form-control mb-2" placeholder="Date d'Obtention" value={diplome.dateobtention} onChange={(e) => {
                                    const newDiplomes = [...diplomes];
                                    newDiplomes[index].dateobtention = e.target.value;
                                    setDiplomes(newDiplomes);
                                }} />
                                <input type="text" className="form-control mb-2" placeholder="Établissement" value={diplome.etablissement} onChange={(e) => {
                                    const newDiplomes = [...diplomes];
                                    newDiplomes[index].etablissement = e.target.value;
                                    setDiplomes(newDiplomes);
                                }} />
                                <hr />
                            </div>
                        ))}
                        <button type="button" className="btn btn-success mb-3" onClick={addDiplome}>Ajouter un diplôme +</button>
                        <div>
                            <button type="button" className="btn btn-secondary me-2" onClick={handlePrevious}>Précédent</button>
                            <button type="submit" className="btn btn-primary">Soumettre</button>
                        </div>
                    </div>
                )}
            </form>

        </main>
    );
};

export default Saisie;
