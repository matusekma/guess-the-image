package com.mata.guesstheimagebackend.controller;

import com.mata.guesstheimagebackend.dao.UserRepository;
import com.mata.guesstheimagebackend.dto.AuthRequest;
import com.mata.guesstheimagebackend.dto.RegisterRequest;
import com.mata.guesstheimagebackend.dto.UserResponse;
import com.mata.guesstheimagebackend.model.User;
import com.mata.guesstheimagebackend.service.AuthService;
import com.mata.guesstheimagebackend.util.DTO;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.modelMapper = new ModelMapper();
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
    public ResponseEntity<UserResponse> register(@DTO(RegisterRequest.class) User user) {
        return new ResponseEntity<>(modelMapper.map(authService.register(user), UserResponse.class), HttpStatus.CREATED);
    }
}
