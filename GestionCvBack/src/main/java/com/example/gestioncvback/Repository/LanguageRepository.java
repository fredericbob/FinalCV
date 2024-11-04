package com.example.gestioncvback.Repository;

import com.example.gestioncvback.Models.Personne.Experience;
import com.example.gestioncvback.Models.Personne.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LanguageRepository extends JpaRepository<Language, Integer> {

    @Query(value = "SELECT l FROM Language l WHERE l.personne.id = :idpersonne")
    List<Language> findAllByPersonns_id(@Param("idpersonne") int personne_id);
}