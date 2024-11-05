import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from "axios";
import './Import.css';
import {format, parse} from 'date-fns';
import {fr} from 'date-fns/locale';
import {jwtDecode} from "jwt-decode";

const Import = () => {
    const docsaar_api_token = process.env.REACT_APP_DOCSAAR_API_TOKEN;
    const token = localStorage.getItem('token');
    console.log(token);

    let userRole = ''; // Initialiser une valeur par défaut pour userRole

    // Vérifier si le token existe avant de le décoder
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userRole = decodedToken.role?.toLowerCase() || '';
        } catch (error) {
            console.error("Erreur lors du décodage du token :", error);
        }
    } else {
        console.log("Aucun token trouvé, utilisateur non connecté.");
        // Ici, vous pouvez rediriger vers la page de connexion ou continuer selon la logique de votre application.
    }
    console.log(userRole)
    const userId = localStorage.getItem('idutilisateur');
    let rootRedirect = "/client/exportpdf";
    if (userRole ==='admin') rootRedirect='/admin/';
    const [file, setFiles] = useState(null);
    const [personne, setPersonne] = useState({});

    const [cv, setCv] = useState({});

    const [languages, setLanguages] = useState([])

    const [experiences, setExperiences] = useState([]);

    const [diplomes, setDiplomes] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles[0]);
            console.log(acceptedFiles);
        },
        maxFiles: 1,
        multiple: false
    });

    const handleSubmit = () => {
        if (file) {
            const formData = new FormData();
            formData.append('chatgpt_resume', file)
            axios.post("https://www.docsaar.com/api/chatgpt_resume_parsing", formData, {
                headers: {
                    'Authorization': `${docsaar_api_token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                if (response?.data?.status === 'success') {
                    console.log(response?.data?.output);
                    localStorage.setItem("resume_parsed", JSON.stringify(response?.data?.output));
                    let personne_data = JSON.parse(JSON.stringify(response?.data?.output));
                    const outputData = response?.data?.output;
                    const personnePayload = {
                        nom: "Eric Razafimahefa",
                        date_naissance:
                            parseDateFrancais(outputData?.date_of_birth?.value) || "",
                        adresse: outputData?.address?.value || "",
                        email: outputData?.email?.value || "",
                        telephone: outputData?.phone?.value || "",
                        genre: "",
                        statutmatrimonial: "",
                        profil: `Êtes-vous à la recherche de quelqu'un qui aime atteindre ses objectifs ? Une personne déterminée et passionnée qui souhaite mettre toute son énergie dans son travail ? Si tel est le cas, je suis le candidat idéal !
                        Jeune diplômé, fort d'une année d'expérience en entreprise, je suis prêt à m'ouvrir à de nouvelles opportunités en tant que Développeur Fullstack spécialisé en Java, React et Typescript.`,
                    };
                    const cvPayload = {
                        titre: "Développeur Fullstack",
                        typecv: "Développement Web",
                    };
                    const languagePayload = [
                        { language: "Java, Spring Boot"},
                        { language: "PHP, CodeIgniter"},
                        { language: "Reactjs, Next.js, TypeScript"},
                        { language: "TailwindCSS"},
                        { language: "MySQL, PostgreSQL, MongoDB"},
                        { language: "Git, GitHub"},
                        { language: "Agile, Scrum, Azure"}
                    ];
                    const experiencePaylod = [
                        {
                            poste: "DÉVELOPPEUR FULLSTACK",
                            entreprise: "IT SOLV",
                            debut: "Nov 2023",
                            fin: "Présent",
                            description: "TMA - Maintenance, Développement des évolutions sur une application de gestion de franchises/centre de suivi de régimes: Spring, Angular, MariaDB Conception, réalisation et développement d'une application de gestion de centre de santé: .NET, Next.js, TS \"Refinement\": définition des user stories et découpage en tâches"
                        },
                        {
                            poste: "STAGIAIRE DÉVELOPPEUR FRONTEND",
                            entreprise: "IT SOLV",
                            debut: "Juillet 2023",
                            fin: "Oct 2023",
                            description: "Conception, réalisation et développement d'une application d'analyse et de recherche de solutions à la gaspillage et la malnutrition au sein des EHPADS: Next.js, TypeScript \"Refinement\": définition des user stories et découpage en tâches"
                        }
                    ];
                    const diplomePayload = [
                        {
                            diplome: "Master 1 en Informatique",
                            dateobtention: "Depuis 2024 (En cours)",
                            etablissement: "IT UNIVERSITY"
                        },
                        {
                            diplome: "Licence en Informatique",
                            dateobtention: "2019 - 2023",
                            etablissement: "IT UNIVERSITY"
                        }
                    ];               
                    setPersonne(personnePayload);
                    setCv(cvPayload);
                    setLanguages(languagePayload);
                    setExperiences(experiencePaylod);
                    setDiplomes(diplomePayload);
                    console.log("TEst")

                    axios.post(`http://localhost:8080/personnes/savePersonne/${userId}`, personnePayload, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        }
                    }).then((response) =>{
                        console.log("saved personne");
                        const personne_id = response.data.data;

                        const headers = {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        };

                        Promise.all([
                            axios.post(`http://localhost:8080/personnes/saveCv/${personne_id}`, cvPayload, {headers}),
                            axios.post(`http://localhost:8080/personnes/saveExperiences/${personne_id}`, experiencePaylod, {headers}),
                            axios.post(`http://localhost:8080/personnes/saveDos/${personne_id}`, diplomePayload, {headers}),
                            axios.post(`http://localhost:8080/personnes/saveLanguages/${personne_id}`, languagePayload, {headers}),
                            axios.post(`http://localhost:8080/personnes/saveLangue/${personne_id}`, [
                                {
                                  langues: {
                                    id: 11,
                                  },
                                },
                                {
                                  langues: {
                                    id: 12,
                                  },
                                },
                              ]
                              , {headers})
                        ]).then(() => {
                            console.log("saved all data");
                            window.location.href = rootRedirect;
                        }).catch((error) => {
                            console.log("error saving data", error);
                        });
                    })
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            alert('Veuillez sélectionner un fichier avant de valider.');
        }
    };

    const ajoutCv = (personne_data) => {
        console.log();
        const apiUrlPersonne = 'http://localhost:8080/cv/add';
        const type = personne_data.workshops && personne_data.workshops[0] && personne_data.workshops[0].value?.name?.value
            ? personne_data.workshops[0].value.name.value
            : prompt('Entrez le poste');
        const data = {
            nomcv: `cv ${personne_data.name?.value ?? ''}`,
            typecv: type,
            utilisateur: { id: userId },
            autresinformations: JSON.stringify(personne_data)
        };

        axios.post(apiUrlPersonne, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(() => {
            console.log("detail cv enregistrer");
        }).catch((error) => {
            console.log('erreur', error);
        });
    };

    const ajoutPersonne = (dtn, addresse, telephone, genre, matrimonial) => {
        const apiUrlPersonne = 'http://localhost:8080/client/addpersonne';
        const data = {
            utilisateur: { id: userId },
            dateNaissance: dtn,
            adresse: addresse,
            telephone: telephone
        };
        if (genre) data.genre = { nom: genre };
        if (matrimonial) data.statutmatrimonial = { statut: matrimonial };

        axios.post(apiUrlPersonne, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(() => {
            console.log("donner enregistrer");
        }).catch((error) => {
            console.log('erreur', error);
        });
    };



    const parseDateFrancais = (dateStr) => {
        try {
            const parsedDate = parse(dateStr, 'dd MMMM yyyy', new Date(), { locale: fr });
            if (!parsedDate || isNaN(parsedDate.getTime())) {
                return null;
            }
            return format(parsedDate, 'yyyy-MM-dd');
        } catch (error) {
            console.error('Erreur de parsing :', error);
            return 'Date invalide';
        }
    };

    return (
        <main id="main" className="main">
            <h4>Importer votre cv</h4>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Glissez-déposez vos fichiers ici, ou cliquez pour sélectionner des fichiers</p>
            </div>
            {file && (
                <div className="file-list">
                    <h3>Fichier sélectionné :</h3>
                    <ul>
                        <li key={file.path}>{file.path} - {file.size} bytes</li>
                    </ul>
                </div>
            )}
            <button onClick={handleSubmit} className="submit-button">
                Valider
            </button>
        </main>
    );
};

export default Import;
