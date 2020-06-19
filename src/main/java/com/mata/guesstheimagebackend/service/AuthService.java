package com.mata.guesstheimagebackend.service;

import com.mata.guesstheimagebackend.dao.UserRepository;
import com.mata.guesstheimagebackend.dto.AuthRequest;
import com.mata.guesstheimagebackend.dto.LoginResponse;
import com.mata.guesstheimagebackend.dto.UserResponse;
import com.mata.guesstheimagebackend.exception.UnauthorizedException;
import com.mata.guesstheimagebackend.exception.UserAlreadyExistsException;
import com.mata.guesstheimagebackend.model.User;
import com.mata.guesstheimagebackend.util.JwtUtil;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public AuthService(UserRepository userRepository, AuthenticationManager authenticationManager, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = new ModelMapper();
    }

    public LoginResponse login(AuthRequest authRequest) {
        Authentication auth;
        try {
            auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (BadCredentialsException exception) {
            return null;
        }
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) auth.getPrincipal();
        User user = userRepository.findByUsername(principal.getUsername()).orElseThrow(() -> new UnauthorizedException("Login failed."));
        String token = jwtUtil.generateToken(authRequest.getUsername());

        return new LoginResponse(token, modelMapper.map(user, UserResponse.class));
    }

    private void checkEmailExists(String email) {
        userRepository.findByEmail(email).ifPresent(u -> {
            throw new UserAlreadyExistsException(email);
        });
    }

    private void checkUsernameExists(String username) {
        userRepository.findByUsername(username).ifPresent(u -> {
            throw new UserAlreadyExistsException(username);
        });
    }

    public User register(User user) {
        checkEmailExists(user.getEmail());
        checkUsernameExists(user.getUsername());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}
