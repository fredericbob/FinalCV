import React, { useEffect, useState } from 'react';
import { Spinner, Card, Button, Modal, Form } from 'react-bootstrap'; 
import '../assets/css/style.css';

function Profil() {
    const [profil, setProfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editProfil, setEditProfil] = useState({});

    const email = localStorage.getItem('email');
    const apiUrl = `http://localhost:8080/profil/${email}`;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiUrl, token]);

    async function fetchData() {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(apiUrl, requestOptions);
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            const data = await response.json();
            setProfil(data.data);
            setEditProfil(data.data); // Initialize the edit form with the fetched data
        } catch (error) {
            console.error('Erreur lors de la requête à l\'API:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProfil({
            ...editProfil,
            [name]: value,
        });
    };

    const handleSaveChanges = () => {
        // You can add your save logic here
        console.log('Modified data:', editProfil);
        handleCloseModal();
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
        </div>
    );
    if (error) return <p className="text-danger text-center">Erreur: {error.message}</p>;
    if (!profil) return <p className="text-center">Aucune donnée trouvée</p>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h3 className="text-center mb-0">Votre profil</h3>
                        </Card.Header>
                        <Card.Body>
                            <ul className="list-unstyled">
                                <li className="mb-2"><strong>Nom:</strong> {profil.nom}</li>
                                <li className="mb-2"><strong>Prenom:</strong> {profil.prenom}</li>
                                <li className="mb-2"><strong>Date de naissance:</strong> {profil.dateNaissance}</li>
                                <li className="mb-2"><strong>Adresse:</strong> {profil.adresse}</li>
                                <li className="mb-2"><strong>Téléphone:</strong> {profil.telephone}</li>
                                <li className="mb-2"><strong>Email:</strong> {profil.email}</li>
                                <li className="mb-2"><strong>Genre:</strong> {profil.genre}</li>
                                <li className="mb-2"><strong>Statut Matrimonial:</strong> {profil.statutMatrimonial}</li>
                                <li className="mb-2"><strong>CV Noms:</strong> {profil.cvNoms}</li>
                                <li className="mb-2"><strong>Domaines:</strong> {profil.domainesCompetences}</li>
                                <li className="mb-2"><strong>Compétences:</strong> {profil.competences}</li>
                                <li className="mb-2"><strong>Expériences:</strong> {profil.experiences}</li>
                                <li className="mb-2"><strong>Diplômes Obtenus:</strong> {profil.diplomesObtenus}</li>
                                <li className="mb-2"><strong>Langues Plus Maîtrisées:</strong> {profil.languesPlusMaitrisees}</li>
                            </ul>
                            <Button variant="primary" className="mt-3" onClick={handleShowModal}>Modifier</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Modal for editing profile */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier votre profil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={editProfil.nom || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrenom">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text"
                                name="prenom"
                                value={editProfil.prenom || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDateNaissance">
                            <Form.Label>Date de naissance</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateNaissance"
                                value={editProfil.dateNaissance || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAdresse">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                                type="text"
                                name="adresse"
                                value={editProfil.adresse || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTelephone">
                            <Form.Label>Téléphone</Form.Label>
                            <Form.Control
                                type="text"
                                name="telephone"
                                value={editProfil.telephone || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={editProfil.email || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                name="genre"
                                value={editProfil.genre || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatutMatrimonial">
                            <Form.Label>Statut Matrimonial</Form.Label>
                            <Form.Control
                                type="text"
                                name="statutMatrimonial"
                                value={editProfil.statutMatrimonial || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Enregistrer les modifications
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Profil;
