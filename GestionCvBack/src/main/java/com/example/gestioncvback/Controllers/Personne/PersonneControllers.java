package com.example.gestioncvback.Controllers.Personne;

import com.example.gestioncvback.Models.Personne.*;
import com.example.gestioncvback.Models.Users.Utilisateur;
import com.example.gestioncvback.Repository.*;
import com.example.gestioncvback.Services.user.NotificationService;
import com.example.gestioncvback.result.Result;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/personnes")
public class PersonneControllers {
    @Autowired
    PersonneRepository personneRepository;
    @Autowired
    CvRepository cvRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    LanguesRepository languesRepository;
    @Autowired
    PersonneLangueRepository personneLangueRepository;
    @Autowired
    DiplomeobtentionRepository diplomeobtentionRepository;


    @Autowired
    LanguageRepository languageRepository;
    @Autowired
    ExperienceRepository experienceRepository;

    @GetMapping()
    public ResponseEntity<Result> Listpersonne(){
        List<HashMap<String, Object>> result = new ArrayList<>();
        HashMap<String, Object> data_temp;
        try{
            List<Personne> personnes = this.personneRepository.findAllNonArchived();
            for (Personne p : personnes) {
                data_temp = new HashMap<>();
                data_temp.put("personne", p);
                data_temp.put("cv", cvRepository.findByPersonns_id(p.getId()).get());
                data_temp.put("diplome", diplomeobtentionRepository.findAllByPersonns_id(p.getId()));
                data_temp.put("experience", experienceRepository.findAllByPersonns_id(p.getId()));
                data_temp.put("language", languageRepository.findAllByPersonns_id(p.getId()));

                result.add(data_temp);
            }

            return new ResponseEntity<>(new Result("Ok","",result), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new Result("An Error Occured",e.getMessage(),""),HttpStatus.BAD_REQUEST);
        }
    }


    @Transactional
    @GetMapping("/unread/{cvId}")
    public ResponseEntity<Result> getUnreadNotifications(@PathVariable int cvId) {
        try {
            long unreadCount = notificationService.countUnreadNotificationsByCvId(cvId);
            return new ResponseEntity<>(new Result("Ok", "", String.valueOf(unreadCount)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new Result("An Error Occurred", e.getMessage(), ""), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @GetMapping("/comments/{cvid}")
    public ResponseEntity<Result> getComments(@PathVariable int cvid) {
        try {
            List<CvDescription> comments = notificationService.getCommentsByPersonId(cvid);
            return new ResponseEntity<>(new Result("Ok", "", comments), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new Result("An Error Occurred", e.getMessage(), ""), HttpStatus.BAD_REQUEST);
        }
    }
    @Transactional
    @GetMapping("/archiver/{personne_id}")
    public ResponseEntity<Result> archiver(@PathVariable("personne_id") int personne_id){
        try{
            this.personneRepository.archiver(personne_id);
            return new ResponseEntity<>(new Result("Ok","",""), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new Result("An Error Occured",e.getMessage(),""),HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @GetMapping("/desarchiver/{cv_id}")
    public ResponseEntity<Result> desarchiver(@PathVariable("cv_id") int cv_id){
        try{
            this.personneRepository.desarchiver(cv_id);
            return new ResponseEntity<>(new Result("Ok","",""), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new Result("An Error Occured",e.getMessage(),""),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/archiveds")
    public ResponseEntity<Result> Listpersonne_archiver(){
        List<HashMap<String, Object>> result = new ArrayList<>();
        HashMap<String, Object> data_temp;
        try{
            List<Personne> personnes = this.personneRepository.findAllArchived();
            for (Personne p : personnes) {
                data_temp = new HashMap<>();
                data_temp.put("personne", p);
                data_temp.put("cv", cvRepository.findByPersonns_id(p.getId()).get());
                data_temp.put("diplome", diplomeobtentionRepository.findAllByPersonns_id(p.getId()));
                data_temp.put("experience", experienceRepository.findAllByPersonns_id(p.getId()));
                data_temp.put("language", languageRepository.findAllByPersonns_id(p.getId()));

                result.add(data_temp);
            }

            return new ResponseEntity<>(new Result("Ok","",result), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new Result("An Error Occured",e.getMessage(),""),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<Result> findByUserID(@PathVariable int user_id) {
        HashMap<String, Object> data_temp = new HashMap<>();
        try {
            Optional<Personne> personnes = this.personneRepository.findByUserId(user_id);
            if (personnes.isPresent()) {
                Personne p = personnes.get();
                System.out.println(p.getNom());
                data_temp.put("personne", p);
                // Récupération du CV, en utilisant Optional pour éviter des erreurs si absent
                cvRepository.findByPersonns_id(p.getId()).ifPresentOrElse(
                        cv -> data_temp.put("cv", cv),
                        () -> data_temp.put("cv", null) // Ou gérez comme vous le souhaitez
                );

                data_temp.put("diplome", diplomeobtentionRepository.findAllByPersonns_id(p.getId()));
                data_temp.put("experience", experienceRepository.findAllByPersonns_id(p.getId()));
                // Récupération des langues de manière sécurisée
                List<PersonneLangue> languesList = personneLangueRepository.findAllByPersonns_id(p.getId());
                data_temp.put("langues", languesList.isEmpty() ? null : languesList);
                // Récupération des languages
                data_temp.put("language", languageRepository.findAllByPersonns_id(p.getId()));

                return new ResponseEntity<>(new Result("Ok", "", data_temp), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new Result("User not found", "", null), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Pour voir la trace de l'erreur
            return new ResponseEntity<>(new Result("An Error Occured", e.getMessage(), null), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/details/{id}")
    public ResponseEntity<Result> findByID(@PathVariable int id){
        HashMap<String, Object> data_temp = null;
        try{
            Optional<Personne> personnes = this.personneRepository.findById(id);
            if (personnes.isPresent()) {
                Personne p = personnes.get();

                data_temp = new HashMap<>();
                data_temp.put("personne", p);
                data_temp.put("cv", cvRepository.findByPersonns_id(p.getId()).get());
                data_temp.put("diplome", diplomeobtentionRepository.findAllByPersonns_id(p.getId()));
                data_temp.put("experience", experienceRepository.findAllByPersonns_id(p.getId()));
                data_temp.put("language", languageRepository.findAllByPersonns_id(p.getId()));
            }

            return new ResponseEntity<>(new Result("Ok","",data_temp), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new Result("An Error Occured",e.getMessage(),""),HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @GetMapping("/addnote/{cv_id}/{note}")
    public ResponseEntity<Result> addNote(@PathVariable("cv_id")int cv_id,
                                          @PathVariable("note")int note) {
        try {
            personneRepository.addNote(cv_id, note);
            return new ResponseEntity<>(new Result("Ok","", ""), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new Result("An Error Occured",e.getMessage(),""),HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @GetMapping("/addcomment/{cv_id}/{comment}")
    public ResponseEntity<Result> addNote(@PathVariable("cv_id")int cv_id,
                                          @PathVariable("comment") String comment) {
        try {
            personneRepository.addComment(cv_id, comment);
            return new ResponseEntity<>(new Result("Ok","", ""), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new Result("An Error Occured",e.getMessage(),""),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/savePersonne/{user_id}")
    public ResponseEntity<Result> savePersonne(@PathVariable int user_id, @RequestBody Personne p) {
        try{
            p.setUtilisateur(new Utilisateur(user_id));
            Personne saved = personneRepository.save(p);
            return ResponseEntity.ok(new Result("Success", "", saved.getId()));
        }catch (Exception e) {
            return ResponseEntity.ok(new Result("", e.getMessage(), p.getId()));
        }
    }

    @PostMapping("/saveCv/{personne_id}")
    public ResponseEntity<Result> saveCv(@PathVariable int personne_id, @RequestBody Cv c) {
        try{
            c.setPersonne(new Personne(personne_id));
            c.setDate_reception(new Date());
            cvRepository.save(c);
            return ResponseEntity.ok(new Result("Success", "", ""));
        }catch (Exception e) {
            return ResponseEntity.ok(new Result("", e.getMessage(), ""));
        }
    }

    @PostMapping("/saveExperiences/{personne_id}")
    public ResponseEntity<Result> saveCv(@PathVariable int personne_id, @RequestBody List<Experience> experiences) {
        try{
            for (Experience e : experiences) {
                e.setPersonne(new Personne(personne_id));
                experienceRepository.save(e);
            }
            return ResponseEntity.ok(new Result("Success", "", ""));
        }catch (Exception e) {
            return ResponseEntity.ok(new Result("", e.getMessage(), ""));
        }
    }

    @PostMapping("/saveLangue/{personne_id}")
    public ResponseEntity<Result> saveLangue(@PathVariable int personne_id, @RequestBody List<PersonneLangue> langues) {
        try {
            for (PersonneLangue e : langues) {
                // Assurez-vous que l'id_langue est bien défini dans l'objet `e`
                if (e.getLangues() == null) {
                    return ResponseEntity.badRequest().body(new Result("Erreur", "L'id_langue doit être fourni.", ""));
                }

                e.setPersonne(new Personne(personne_id));
                personneLangueRepository.save(e);
            }
            return ResponseEntity.ok(new Result("Success", "", ""));
        } catch (Exception e) {
            // Renvoie une erreur 500 avec le message d'erreur
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Result("", e.getMessage(), ""));
        }
    }



    @GetMapping("/findallLangue")
    public ResponseEntity<Result> findAllLangue() {
        try {
            List<Langues> languesList = languesRepository.findAll(); // Supposons que vous ayez un repository pour Langues
            return new ResponseEntity<>(new Result("Ok", "", languesList), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Result("An Error Occured", e.getMessage(), ""), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/saveDos/{personne_id}")
    public ResponseEntity<Result> saveDos(@PathVariable int personne_id, @RequestBody List<Diplomeobtention> diplomes) {
        try{
            for (Diplomeobtention d : diplomes) {
                d.setPersonne(new Personne(personne_id));
                diplomeobtentionRepository.save(d);
            }
            return ResponseEntity.ok(new Result("Success", "", ""));
        }catch (Exception e) {
            return ResponseEntity.ok(new Result("", e.getMessage(), ""));
        }
    }

    @PostMapping("/saveLanguages/{personne_id}")
    public ResponseEntity<Result> saveLanguages(@PathVariable int personne_id, @RequestBody List<Language> languages) {
        try{
            for (Language l : languages) {
                l.setPersonne(new Personne(personne_id));
                languageRepository.save(l);
            }
            return ResponseEntity.ok(new Result("Success", "", ""));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new Result("", e.getMessage(), ""));
        }
    }

    @GetMapping("/stat/new_resume")
    public ResponseEntity<Result> nouveau_cv(){
        try {
            return new ResponseEntity<>(new Result("Ok", "", this.personneRepository.newResume()), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new Result("", "Error", e.getMessage()), HttpStatus.OK);
        }
    }

    @GetMapping("/stat/resume/count_all_resume")
    public ResponseEntity<Result> count_cv(){
        try {
            return new ResponseEntity<>(new Result("Ok", "", this.personneRepository.countAllResume()), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new Result("", "Error", e.getMessage()), HttpStatus.OK);
        }
    }

    @GetMapping("/stat/skills/count_all_Skills")
    public ResponseEntity<Result> count_skills(){
        try {
            return new ResponseEntity<>(new Result("Ok", "", this.personneRepository.countSkills()), HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(new Result("", "Error", e.getMessage()), HttpStatus.OK);
        }
    }

    @GetMapping("/get/Note/{cv_id}")
    public ResponseEntity<Result> get_note_resume(@PathVariable int cv_id){
        try {
            return new ResponseEntity<>(new Result("Ok", "", this.personneRepository.get_resume_note(cv_id)), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new Result("", "Error", e.getMessage()), HttpStatus.OK);
        }
    }

    @GetMapping("/get/Comment/{cv_id}")
    public ResponseEntity<Result> get_comment_resume(@PathVariable int cv_id){
        try {
            return new ResponseEntity<>(new Result("Ok", "", this.personneRepository.get_resume_comment(cv_id)), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new Result("", "Error", e.getMessage()), HttpStatus.OK);
        }
    }
}

