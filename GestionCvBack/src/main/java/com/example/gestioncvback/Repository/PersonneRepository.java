package com.example.gestioncvback.Repository;

import com.example.gestioncvback.Models.Personne.Personne;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonneRepository extends JpaRepository<Personne, Integer> {

    @Modifying
    @Transactional
    @Query(value = """
        INSERT INTO cv_archive(cv_id)
        SELECT id FROM cv WHERE idpersonne = ?1;
    """, nativeQuery = true)
    void archiver(int personne_id);

    @Modifying
    @Transactional
    @Query(value = "delete from cv_archive where cv_id = ?1;", nativeQuery = true)
    void desarchiver(int cv_id);

    @Query(value = """
        SELECT p.* FROM Personne p
        INNER JOIN cv ON cv.idpersonne = p.id
        WHERE cv.id IN (SELECT cv_id FROM cv_archive);
    """, nativeQuery = true)
    List<Personne> findAllArchived();

    @Query(value = "select p from Personne  p where p.utilisateur.id = :user_id")
    Optional<Personne> findByUserId(@Param("user_id") int user_id);

    @Modifying
    @Query(value = """
        INSERT INTO cv_description (cv_id, note)
        VALUES (?1, ?2)
        ON CONFLICT (cv_id)
        DO UPDATE SET note = EXCLUDED.note;
    """, nativeQuery = true)
    void addNote(int cv_id, int note);

    @Modifying
    @Query(value = """
        INSERT INTO cv_description (cv_id, commentaire)
        VALUES (?1, ?2)
        ON CONFLICT (cv_id)
        DO UPDATE SET commentaire = EXCLUDED.commentaire;
    """, nativeQuery = true)
    void addComment(int cv_id, String commentaire);

    @Query(value = """
        SELECT Personne.* FROM Personne
        INNER JOIN cv ON cv.idpersonne = Personne.id
        WHERE cv.id NOT IN (SELECT cv_id FROM cv_archive);
    """, nativeQuery = true)
    List<Personne> findAllNonArchived();

    @Query(value = "select note from cv_description where cv_id= ?1", nativeQuery = true)
    int get_resume_note(int cv_id);

    @Query(value = "select commentaire from cv_description where cv_id= ?1", nativeQuery = true)
    String get_resume_comment(int cv_id);

    @Query(value = "select count(id) as new_resume from cv where cv.date_reception = now();", nativeQuery = true)
    int newResume();

    @Query(value = "select count(id) as new_resume from cv;", nativeQuery = true)
    int countAllResume();

    @Query(value = "select count(distinct(language)) from language_de_programmation;", nativeQuery = true)
    int countSkills();
}