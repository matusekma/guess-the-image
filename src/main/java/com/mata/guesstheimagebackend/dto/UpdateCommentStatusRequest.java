package com.mata.guesstheimagebackend.dto;

import com.mata.guesstheimagebackend.model.CommentStatus;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UpdateCommentStatusRequest {
    @NotNull
    CommentStatus status;
}
