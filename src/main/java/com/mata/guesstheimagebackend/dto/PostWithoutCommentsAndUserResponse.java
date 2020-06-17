package com.mata.guesstheimagebackend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


// Post without comments and user
@Getter
@Setter
public class PostWithoutCommentsAndUserResponse {
    @NotNull
    private Long id;

    @NotNull
    private String url;

    private LocalDateTime createdAt;
}

