package com.example.gestioncvback.Models.Personne;

import jakarta.persistence.*;



@Entity
@Table(name = "personne_langue")
public class PersonneLangue {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    public Langues getLangues() {
        return langues;
    }

    public void setLangues(Langues langues) {
        this.langues = langues;
    }

    @ManyToOne
    @JoinColumn(name = "id_personne",referencedColumnName = "id")
    private Personne personne;

    @ManyToOne
    @JoinColumn(name = "id_langue",referencedColumnName = "id")
    private Langues langues;

    @Column(name = "niveau")
    private String niveau;

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

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }


}
