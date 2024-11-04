package com.example.gestioncvback.Services.user;

import com.example.gestioncvback.Models.Personne.CvDescription;
import com.example.gestioncvback.Repository.CvDescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private CvDescriptionRepository cvDescriptionRepository;

    public long countUnreadNotificationsByCvId(int cvId) {
        return cvDescriptionRepository.countByCvId_IdAndIsReadFalse(cvId);
    }
    public List<CvDescription> getCommentsByPersonId(int cvid) {
        return cvDescriptionRepository.findUnreadCommentsByPersonId(cvid); // Récupérer les commentaires non lus par idpersonne
    }
}

