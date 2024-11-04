package com.example.gestioncvback.Services.user;

import com.example.gestioncvback.Configurations.JWTManager;
import com.example.gestioncvback.Models.Users.Role;
import com.example.gestioncvback.Models.Users.Utilisateur;
import com.example.gestioncvback.Repository.UtilisateurRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public Optional<Utilisateur> findByEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }


    public String login(String email, String password) throws Exception {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("Identifiants invalides"));

        if (passwordEncoder.matches(password, utilisateur.getPassword()) == false) {
            throw new Exception("Identifiants invalides");
        }
        return JWTManager.generateToken(utilisateur);
    }

    public Utilisateur save(Utilisateur utilisateur){


            try {
                // Vérification des valeurs reçues
                if (utilisateur.getEmail() == null || utilisateur.getPassword() == null) {
                    throw new IllegalArgumentException("Tous les champs doivent être remplis.");
                }

                Utilisateur utilisateur1 = new Utilisateur();

                utilisateur1.setEmail(utilisateur.getEmail());

                // Encoder le mot de passe
                utilisateur1.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
                utilisateur1.setRole(new Role(2)); // Assurez-vous que le rôle est valide

                // Enregistrer l'utilisateur
                Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur1);

                return savedUtilisateur;
        }catch (Exception e){
            throw new RuntimeException("Erreur lors de l'ajout de l'utilisateur : " + e.getMessage());
        }
    }

}

