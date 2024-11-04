package com.example.gestioncvback.Models.Personne;

import jakarta.persistence.*;


@Entity
public class Diplomeobtention {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @ManyToOne
    @JoinColumn(name = "idpersonne",referencedColumnName = "id")
    private Personne personne;
    private String diplome;
    @Column(name = "dateobtention")
    private String dateobtention;
    @Column(name = "etablissement")
    private String etablissement;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Personne getPersonne() {
        return personne;
    }

    public void setPersonne(Personne personne) {
        this.personne = personne;
    }

    public String getDiplome() {
        return diplome;
    }

    public void setDiplome(String diplome) {
        this.diplome = diplome;
    }

    public String getDateobtention() {
        return dateobtention;
    }

    public void setDateobtention(String dateobtention) {
        this.dateobtention = dateobtention;
    }

    public String getEtablissement() {
        return etablissement;
    }

    public void setEtablissement(String etablissement) {
        this.etablissement = etablissement;
    }
}
