package com.mata.guesstheimagebackend.service;

import com.mata.guesstheimagebackend.dao.UserRepository;
import com.mata.guesstheimagebackend.model.User;
import com.mata.guesstheimagebackend.util.IAuthenticationFacade;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final IAuthenticationFacade authenticationFacade;

    public UserService(UserRepository userRepository, IAuthenticationFacade authenticationFacade) {
        this.userRepository = userRepository;
        this.authenticationFacade = authenticationFacade;
    }

    public Optional<User> getAuthenticatedUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) authenticationFacade.getAuthentication().getPrincipal();
        return userRepository.findByUsername(principal.getUsername());
    }

}
