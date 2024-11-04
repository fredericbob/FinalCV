import React, {useEffect, useRef, useState} from 'react';

import '../Export/Export.css';
import html2pdf from 'html2pdf.js';
import CvDisplay from "../Export/template/CvDisplay";
import axios from "axios";
import {useParams} from "react-router-dom";

const token = localStorage.getItem('token');

function ExportPdf() {
    const cvDisplayRef = useRef(null);
    const param = useParams();


    const handleExport = () => {
        if (cvDisplayRef.current) {
            const element = cvDisplayRef.current;
            html2pdf().from(element).save('cv.pdf');
        }
    };
    const [personne, setPersonne] = useState({});
    const [cv, setCv] = useState({});
    const [languages, setLanguages] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [diplomes, setDiplomes] = useState([]);

    useEffect(() => {
        console.log(param.personne_id)
        axios.get(`http://localhost:8080/personnes/details/${param.personne_id}`, {
            headers : {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }).then((response)=>{
            const data = response.data.data;
            setCv(data.cv);
            setPersonne(data.personne);
            setLanguages(data.language);
            setExperiences(data.experience);
            setDiplomes(data.diplome);

            axios.get(`http://localhost:8080/personnes/get/Note/${data.cv.id}`,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }).then((response) =>{
                setNumberInput(response.data.data);
            }).catch((error) => {
                console.log('error: ', error);
            });

            axios.get(`http://localhost:8080/personnes/get/Comment/${data.cv.id}`,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setTextInput(response.data.data);
            }).catch((error) => {
                console.log('error: ', error);
            });

        }).catch((errot) => {
            console.log("error ", errot);
        })
    }, []);

    const [numberInput, setNumberInput] = useState(0);
    const [textInput, setTextInput] = useState('');

    const handleNumberChange = (event) => {
        setNumberInput(event.target.value);
    };

    const handleTextChange = (event) => {
        setTextInput(event.target.value);
    };

    const [includeNom, setIncludeNom] = useState(false);
    const [includeEmail, setIncludeEmail] = useState(false);
    const [includeTelephone, setIncludeTelephone] = useState(false);
    const [includeAdresse, setIncludeAdresse] = useState(false);
    const [includeExperiences, setIncludeExperiences] = useState(false);
    const [includeLanguages, setIncludeLanguages] = useState(false);
    const [includeDiplomes, setIncludeDiplomes] = useState(false);
    const [includeTitre, setIncludeTitre] = useState(false);
    const [includeTypecv, setIncludeTypecv] = useState(false);

    const saveNote = (note) => {
        axios.get(`http://localhost:8080/personnes/addnote/${cv.id}/${note}`, {
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setNumberInput(note);
        }).catch((error) => {
            console.log('error: ', error)
        })
    };

    const saveComment = (comment) => {
        axios.get(`http://localhost:8080/personnes/addcomment/${cv.id}/${comment}`, {
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setTextInput(comment);
        }).catch((error) => {
            console.log('error: ', error)
        })
    };

    const handleSubmit = () => {
        if (numberInput) saveNote(numberInput);
        if (textInput) saveComment(textInput)
    };

    return (
        <main id="main" className="main">
            <div className="container">
                <div className="d-flex" style={{ marginLeft: '14%' }}>
                    <div className="row d-flex justify-content-center align-items-center">
                        {!param.export && (
                            <div className="col-12 mb-3">
                                <div className="form-row row g-3 align-items-center">
                                    <div className="col-md-2">
                                        <label htmlFor="numberInput" className="form-label">
                                            Note
                                        </label>
                                        <input
                                            id="numberInput"
                                            type="number"
                                            className="form-control"
                                            min="0"
                                            max="10"
                                            step="1"
                                            value={numberInput}
                                            onChange={handleNumberChange}
                                            placeholder="ex:5"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="textInput" className="form-label">
                                            Commentaire
                                        </label>
                                        <input
                                            id="textInput"
                                            type="text"
                                            className="form-control"
                                            value={textInput}
                                            onChange={handleTextChange}
                                            placeholder="Commentaire"
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <button
                                            className="btn btn-primary w-100"
                                            type="button"
                                            onClick={handleSubmit}
                                        >
                                            Commenter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="col-12 mb-3">
                            <div className="form-row row g-3">
                                <div className="col-md-6">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            checked={includeNom}
                                            onChange={() => setIncludeNom(!includeNom)}
                                            className="form-check-input"
                                        />
                                        Nom
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            checked={includeEmail}
                                            onChange={() => setIncludeEmail(!includeEmail)}
                                            className="form-check-input"
                                        />
                                        Email
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            checked={includeTelephone}
                                            onChange={() => setIncludeTelephone(!includeTelephone)}
                                            className="form-check-input"
                                        />
                                        Téléphone
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            checked={includeAdresse}
                                            onChange={() => setIncludeAdresse(!includeAdresse)}
                                            className="form-check-input"
                                        />
                                        Adresse
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            checked={includeTitre}
                                            onChange={() => setIncludeTitre(!includeTitre)}
                                            className="form-check-input"
                                        />
                                        Titre
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            checked={includeTypecv}
                                            onChange={() => setIncludeTypecv(!includeTypecv)}
                                            className="form-check-input"
                                        />
                                        Type de CV
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            checked={includeExperiences}
                                            onChange={() => setIncludeExperiences(!includeExperiences)}
                                            className="form-check-input"
                                        />
                                        Expériences
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            checked={includeLanguages}
                                            onChange={() => setIncludeLanguages(!includeLanguages)}
                                            className="form-check-input"
                                        />
                                        Langages
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            checked={includeDiplomes}
                                            onChange={() => setIncludeDiplomes(!includeDiplomes)}
                                            className="form-check-input"
                                        />
                                        Diplômes
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <button
                                className="btn btn-success mt-3"
                                onClick={handleExport}
                                style={{marginLeft:'-180px'}}
                            >
                                Exporter
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <CvDisplay
                    personne={{
                        ...personne,
                        nom: includeNom ? '' : personne.nom,
                        email: includeEmail ? '' : personne.email,
                        adresse: includeAdresse ? '' : personne.adresse,
                        telephone: includeTelephone ? '' : personne.telephone,
                    }}
                    cv={{
                        titre: includeTitre ? '' : cv.titre,
                        typecv: includeTypecv ? '' : cv.typecv,
                    }}
                    experiences={includeExperiences ? [] : experiences}
                    languages={includeLanguages ? [] : languages}
                    diplomes={includeDiplomes ? [] : diplomes}
                    ref={cvDisplayRef}
                />
            </div>
        </main>

    );
}

export default ExportPdf;
