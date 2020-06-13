package com.mata.guesstheimagebackend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class RegisterRequest {

    @NotNull
    private String username;

    private String firstName;

    private String lastName;

    @NotNull
    private String password;

    @NotNull
    private String email;
}
