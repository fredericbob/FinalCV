import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './Import.css';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { jwtDecode } from 'jwt-decode';

const docsaar_api_token = process.env.REACT_APP_DOCSAAR_API_TOKEN;
const token = localStorage.getItem('token');
const userId = localStorage.getItem('idutilisateur');

let userRole = '';

// Vérifier si le token existe avant de le décoder
if (token) {
    try {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.role?.toLowerCase() || '';
    } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
    }
} else {
    console.log('Aucun token trouvé, utilisateur non connecté.');
}

const Import = () => {
    console.log(userRole);
    let rootRedirect = '/client/';
    if (userRole === 'admin') rootRedirect = '/admin/';

    const [file, setFiles] = useState(null);
    const [personne, setPersonne] = useState({});
    const [cv, setCv] = useState({});
    const [languages, setLanguages] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [diplomes, setDiplomes] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles[0]);
            console.log(acceptedFiles);
        },
        maxFiles: 1,
        multiple: false,
    });

    const handleSubmit = () => {
        if (file) {
            const formData = new FormData();
            formData.append('chatgpt_resume', file);

            console.log('Envoi du CV à Docsaar avec le token :', docsaar_api_token);

            axios.post('https://www.docsaar.com/api/chatgpt_resume_parsing', formData, {
                headers: {
                    Authorization: `${docsaar_api_token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                console.log('Réponse de Docsaar :', response);
                if (response && response.data.status === 'success') {
                    console.log(response.data.output);
                    localStorage.setItem('resume_parsed', JSON.stringify(response.data.output));

                    const personne_data = response.data.output;
                    setPersonne({
                        nom: personne_data.name?.value || '',
                        date_naissance: parseDateFrancais(personne_data.date_of_birth?.value) || '',
                        adresse: personne_data.address?.value || '',
                        email: personne_data.email?.value || '',
                        telephone: personne_data.phone?.value || '',
                        genre: '',
                        statutmatrimonial: '',
                    });
                    setCv({
                        titre: personne_data.summary?.display_name || '',
                        typecv: 'Développeur JAVA',
                    });
                    setLanguages(personne_data.skills?.value || []);
                    setExperiences(personne_data.projects?.value || []);
                    setDiplomes(personne_data.education?.value || []);

                    // Enregistrer la personne
                    return axios.post(`http://localhost:8080/personnes/savePersonne/${userId}`, personne, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } else {
                    throw new Error('Erreur lors de l\'importation du CV.');
                }
            }).then((response) => {
                if (response) {
                    console.log('Réponse après l\'enregistrement de la personne :', response);
                    const personne_id = response.data.data;

                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    };

                    return Promise.all([
                        axios.post(`http://localhost:8080/personnes/saveCv/${personne_id}`, cv, { headers }),
                        axios.post(`http://localhost:8080/personnes/saveExperiences/${personne_id}`, experiences, { headers }),
                        axios.post(`http://localhost:8080/personnes/saveDos/${personne_id}`, diplomes, { headers }),
                        axios.post(`http://localhost:8080/personnes/saveLanguages/${personne_id}`, languages, { headers }),
                    ]);
                }
            }).then(() => {
                console.log('Toutes les données enregistrées.');
                window.location.href = rootRedirect; // Redirection après réussite
            }).catch((error) => {
                console.error('Erreur lors de l\'appel API :', error);
                alert('Une erreur est survenue lors du traitement de votre CV. Veuillez réessayer.');
            });
        } else {
            alert('Veuillez sélectionner un fichier avant de valider.');
        }
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
            <h3>Importer votre CV</h3>
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
