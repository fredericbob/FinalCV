package com.example.gestioncvback.Models.Personne;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Langues {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    public Langues(int id) {
        this.id = id;
    }

    public Langues() {

    }

    @Column(name = "nom")
    private String nom;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


}
