package com.mata.guesstheimagebackend.dto;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class AuthRequest {

    @NotNull
    private String username;

    @NotNull
    private String password;
}
