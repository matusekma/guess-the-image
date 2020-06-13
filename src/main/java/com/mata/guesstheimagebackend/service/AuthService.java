package com.mata.guesstheimagebackend.service;

import com.mata.guesstheimagebackend.dao.UserRepository;
import com.mata.guesstheimagebackend.dto.AuthRequest;
import com.mata.guesstheimagebackend.exception.UserAlreadyExistsException;
import com.mata.guesstheimagebackend.model.User;
import com.mata.guesstheimagebackend.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, AuthenticationManager authenticationManager, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (BadCredentialsException exception) {
            return null;
        }

        return jwtUtil.generateToken(authRequest.getUsername());
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
