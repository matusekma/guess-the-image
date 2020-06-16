package com.mata.guesstheimagebackend.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponse {
    @NotNull
    private Long id;

    @NotNull
    private String text;

    @NotNull
    private boolean isCorrect;

    private LocalDateTime createdAt;

    @NotNull
    private CommentUserResponse user;
}
