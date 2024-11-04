package com.example.gestioncvback.Models.Personne;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "cv_description")
public class CvDescription {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "cv_id",referencedColumnName = "id")
    private Cv cvId;

    @Column(name = "note")
    private Integer note;
    @Basic
    @Column(name = "commentaire")
    private String commentaire;

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    @Column(name = "is_read")
    private boolean isRead;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Cv getCvId() {
        return cvId;
    }

    public void setCvId(Cv cvId) {
        this.cvId = cvId;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CvDescription that = (CvDescription) o;
        return id == that.id && cvId == that.cvId && Objects.equals(note, that.note) && Objects.equals(commentaire, that.commentaire);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cvId, note, commentaire);
    }
}
