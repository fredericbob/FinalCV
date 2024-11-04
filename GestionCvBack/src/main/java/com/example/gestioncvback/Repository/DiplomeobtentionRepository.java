package com.example.gestioncvback.Repository;

import com.example.gestioncvback.Models.Personne.Diplomeobtention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiplomeobtentionRepository extends JpaRepository<Diplomeobtention, Integer> {

    @Query(value = "SELECT d FROM Diplomeobtention d WHERE d.personne.id = :idpersonne")
    List<Diplomeobtention> findAllByPersonns_id(@Param("idpersonne") int personne_id);
}