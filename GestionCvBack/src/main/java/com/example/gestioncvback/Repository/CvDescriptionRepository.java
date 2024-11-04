package com.example.gestioncvback.Repository;

import com.example.gestioncvback.Models.Personne.CvDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CvDescriptionRepository extends JpaRepository<CvDescription, Integer> {

    @Query("SELECT cd FROM CvDescription cd WHERE cd.cvId.id = :idcv AND cd.isRead = false")
    List<CvDescription> findUnreadCommentsByPersonId(@Param("idcv") int idcv);

    // Optionnel : Vous pouvez garder cette méthode si nécessaire

    long countByCvId_IdAndIsReadFalse(int cvId);
}