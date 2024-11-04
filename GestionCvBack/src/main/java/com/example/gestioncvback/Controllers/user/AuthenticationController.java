package com.example.gestioncvback.Controllers.user;

import com.example.gestioncvback.Configurations.JWTManager;
import com.example.gestioncvback.Models.Users.Authentication;
import com.example.gestioncvback.Models.Users.Utilisateur;
import com.example.gestioncvback.Services.user.UtilisateurService;
import com.example.gestioncvback.result.Result;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/authentication")
public class AuthenticationController {

    private final UtilisateurService utilisateurService;

   private  Map<String, String> tokens = new HashMap<>();
    @Autowired
    private JWTManager jwt;

    @Autowired
    public AuthenticationController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @PostMapping("/signup")
    @Transactional
    public ResponseEntity<Result> signup(@RequestBody Utilisateur utilisateur) {

        try {
            System.out.println("1");
            Utilisateur savedUtilisateur = utilisateurService.save(utilisateur);
            return buildAuthResponse(savedUtilisateur.getEmail(), utilisateur.getPassword());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Result("Error occurred", e.getMessage(), ""));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Result> login(@RequestBody Authentication user) {


        try {
            return buildAuthResponse(user.getEmail(), user.getPassword());
        } catch (Exception e) {
            return ResponseEntity.ok().body(new Result("Authentication failed", e.getMessage(), null));
        }
    }

    private ResponseEntity<Result> buildAuthResponse(String email, String password) {
        Result res;
        try {
            Optional<Utilisateur> utilisateur = utilisateurService.findByEmail(email);
            if (utilisateur.isPresent()) {
                String token = utilisateurService.login(email, password);
                String refreshToken = jwt.generateRefreshToken(utilisateur.get());

                Map<String, String> tokens = new HashMap<>();
                tokens.put("token", token);
                tokens.put("refreshToken", refreshToken);

                res = new Result("OK", null, tokens);
                return ResponseEntity.ok(res);
            }else {
                throw new Exception("No user selected");
            }
        } catch (Exception e) {
            res = new Result("Error occurred", e.getMessage(), "");
            return ResponseEntity.badRequest().body(res);
        }
    }

    @PostMapping("/refresh")
        public ResponseEntity<?> refresh(@RequestBody Map<String, String> tokenRequest) {
            String refreshToken = tokenRequest.get("refreshToken");
            Result res;

            try {
                if (jwt.isTokenExpired(refreshToken)) {
                    res = new Result("Refresh token expired", "Refresh token is expired", null);
                    return new ResponseEntity<>(res, HttpStatus.UNAUTHORIZED);
                }

                String email = jwt.getEmail(refreshToken);
                Optional<Utilisateur> utilisateur = utilisateurService.findByEmail(email);
                if (utilisateur.isPresent()) {
                    String newToken = JWTManager.generateToken(utilisateur.get());
                    String newRefreshToken = jwt.generateRefreshToken(utilisateur.get());

                    tokens.put("token", newToken);
                    tokens.put("refreshToken", newRefreshToken);

                    res = new Result("OK", null, tokens);
                    return new ResponseEntity<>(res, HttpStatus.OK);
                }else {
                    throw new Exception("No user selected");
                }
            } catch (Exception e) {
                res = new Result("Refresh failed", e.getMessage(), null);
                return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
            }

    }


}
