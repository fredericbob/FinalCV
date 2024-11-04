import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from "axios";
import './Import.css';
import {format, parse} from 'date-fns';
import {fr} from 'date-fns/locale';
import {jwtDecode} from "jwt-decode";

const docsaar_api_token = process.env.REACT_APP_DOCSAAR_API_TOKEN;
const token = localStorage.getItem('token');
console.log(token);
const userId = localStorage.getItem('idutilisateur');


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

const Import = () => {
    console.log(userRole)
    let rootRedirect = "/client/";
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
                if (response.data.status === 'success') {
                    console.log(response.data.output);
                    localStorage.setItem("resume_parsed", JSON.stringify(response.data.output));
                    let personne_data = JSON.parse(JSON.stringify(response.data.output));
                    setPersonne({
                        nom: personne_data.name?.value || '',
                        date_naissance: parseDateFrancais(personne_data.date_of_birth?.value) || '',
                        adresse: personne_data.address?.value || '',
                        email: personne_data.email?.value || '',
                        telephone: personne_data.phone?.value || '',
                        genre: '',
                        statutmatrimonial: ''
                    });
                    setCv({
                        titre: personne_data.summary?.display_name || '',
                        typecv: 'Développeur JAVA'
                    });
                    setLanguages(personne_data.skills?.value || []);
                    setExperiences(personne_data.projects?.value || []);
                    setDiplomes(personne_data.education?.value || []);

                    axios.post(`http://localhost:8080/personnes/savePersonne/${userId}`, personne, {
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
                            axios.post(`http://localhost:8080/personnes/saveCv/${personne_id}`, cv, {headers}),
                            axios.post(`http://localhost:8080/personnes/saveExperiences/${personne_id}`, experiences, {headers}),
                            axios.post(`http://localhost:8080/personnes/saveDos/${personne_id}`, diplomes, {headers}),
                            axios.post(`http://localhost:8080/personnes/saveLanguages/${personne_id}`, languages, {headers})
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
        window.location.href = rootRedirect;
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
