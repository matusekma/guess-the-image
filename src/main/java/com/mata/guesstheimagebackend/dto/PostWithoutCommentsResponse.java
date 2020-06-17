package com.mata.guesstheimagebackend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;


// Post without comments
@Getter
@Setter
public class PostWithoutCommentsResponse {
    @NotNull
    private Long id;

    @NotNull
    private String url;

    private LocalDateTime createdAt;

    @NotNull
    private UserResponse user;
}
