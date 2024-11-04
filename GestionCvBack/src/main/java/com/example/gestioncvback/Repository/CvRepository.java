package com.example.gestioncvback.Repository;

import com.example.gestioncvback.Models.Personne.Cv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CvRepository extends JpaRepository<Cv, Integer> {


    @Query(value = "SELECT c FROM Cv c WHERE c.personne.id = :idpersonne")
    Optional<Cv> findByPersonns_id(@Param("idpersonne") int personne_id);
}