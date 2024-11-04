import React from 'react';
import './Acceuil.css'; // Fichier CSS pour les styles
import cvImage from '../assets/img/logo.jpg'; // Exemple d'image (remplace par ton propre chemin d'image)
import exportImage from '../assets/img/logo.jpg'; // Exemple d'image pour l'exportation

function Acceuil() {
    return (
        <main id="main" className="main d-flex justify-content-center align-items-center">
            <div className="accueil-container">
                <h1 className="animated-title">Bienvenue sur notre plateforme</h1>
                <p className="animated-text">
                    Notre solution vous permet de créer, personnaliser et gérer votre CV en toute simplicité.
                    Vous pouvez également l'exporter au format PDF ou importer un CV existant pour des modifications rapides et efficaces.
                </p>
                <p className="animated-text delay">
                    Optimisez la gestion de vos informations professionnelles avec notre outil intuitif, conçu pour vous offrir une expérience fluide et performante.
                </p>


            </div>
        </main>
    );
}

export default Acceuil;
