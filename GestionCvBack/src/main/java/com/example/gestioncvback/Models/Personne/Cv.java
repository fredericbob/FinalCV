package com.example.gestioncvback.Models.Personne;

import jakarta.persistence.*;

import java.util.Date;


@Entity
public class Cv {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @ManyToOne
    @JoinColumn(name = "idpersonne",referencedColumnName = "id")
    private Personne personne;
    @Column(name = "titre")
    private String titre;
    @Column(name = "typecv")
    private String typecv;
    @Column(name = "date_reception")
    private Date date_reception;

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

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getTypecv() {
        return typecv;
    }

    public void setTypecv(String typecv) {
        this.typecv = typecv;
    }

    public Date getDate_reception() {
        return date_reception;
    }

    public void setDate_reception(Date date_reception) {
        this.date_reception = date_reception;
    }
}
