import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/authentication/resetpassword', { email });
            setMessage(response.data.message); // Message de succès ou d'erreur
        } catch (error) {
            setMessage('Erreur lors de la réinitialisation du mot de passe.');
        }
    };

    return (
        <main className="form-container">
        <div className="container">
            <section className="section register min-vh-100 d-flex align-items-center py-4">
                <div className="container">
                    <div className="row justify-content-center">

                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Réinitialiser le mot de passe</h5>
                                        <p className="text-center small">Entrez votre e-mail</p>
                                    </div>
                            <form className="row g-3 needs-validation" onSubmit={handleReset}>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Envoyer</button>
                            </form>
                            {message && <p className="mt-3">{message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </main>
    );
};

export default ResetPassword;
