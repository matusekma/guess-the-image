package com.mata.guesstheimagebackend.controller;

import com.mata.guesstheimagebackend.dao.UserRepository;
import com.mata.guesstheimagebackend.dto.AuthRequest;
import com.mata.guesstheimagebackend.dto.RegisterRequest;
import com.mata.guesstheimagebackend.model.User;
import com.mata.guesstheimagebackend.service.AuthService;
import com.mata.guesstheimagebackend.util.DTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.List;

@RestController
public class AuthController {

    private AuthService authService;
    private UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest) throws Exception {
        String jwtToken = authService.login(authRequest);
        if (jwtToken == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@DTO(RegisterRequest.class) User user) {
        return new ResponseEntity<>(authService.register(user), HttpStatus.OK);
    }
}
