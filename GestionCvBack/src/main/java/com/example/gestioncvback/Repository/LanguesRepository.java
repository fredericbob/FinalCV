package com.example.gestioncvback.Repository;

import com.example.gestioncvback.Models.Personne.Langues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguesRepository extends JpaRepository<Langues, Integer> {
}