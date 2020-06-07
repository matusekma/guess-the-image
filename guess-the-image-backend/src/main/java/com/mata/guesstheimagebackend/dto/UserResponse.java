package com.mata.guesstheimagebackend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UserResponse {
    @NotNull
    private Long id;

    @NotNull
    private String username;

    private String firstName;

    private String lastName;

    @NotNull
    private String email;
}
