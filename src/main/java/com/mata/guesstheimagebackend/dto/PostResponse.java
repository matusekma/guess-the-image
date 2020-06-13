package com.mata.guesstheimagebackend.dto;

import com.mata.guesstheimagebackend.model.Comment;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
public class PostResponse {
    @NotNull
    private Long id;

    @NotNull
    private String url;

    private LocalDateTime createdAt;

    private List<Comment> comments;

    @NotNull
    private UserResponse user;
}
