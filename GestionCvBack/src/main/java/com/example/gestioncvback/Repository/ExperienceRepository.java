package com.example.gestioncvback.Repository;

import com.example.gestioncvback.Models.Personne.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Integer> {

    @Query(value = "SELECT e FROM Experience e WHERE e.personne.id = :idpersonne")
    List<Experience> findAllByPersonns_id(@Param("idpersonne") int personne_id);
}