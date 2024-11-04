package com.example.gestioncvback.Repository;

import com.example.gestioncvback.Models.Personne.Experience;
import com.example.gestioncvback.Models.Personne.PersonneLangue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonneLangueRepository extends JpaRepository<PersonneLangue, Integer> {
    @Query(value = "SELECT e FROM PersonneLangue e WHERE e.personne.id = :idpersonne")
    List<PersonneLangue> findAllByPersonns_id(@Param("idpersonne") int personne_id);
}