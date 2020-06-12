package com.mata.guesstheimagebackend.controller;

import com.mata.guesstheimagebackend.dto.UserResponse;
import com.mata.guesstheimagebackend.model.User;
import com.mata.guesstheimagebackend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService userService) {
        this.modelMapper = new ModelMapper();
        this.userService = userService;
    }

    @GetMapping("/users/me")
    public ResponseEntity<UserResponse> me(){
        User me = userService.getAuthenticatedUser().orElseThrow(() -> new UsernameNotFoundException("No user data!"));
        UserResponse userResponse = modelMapper.map(me, UserResponse.class);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }
}
