package com.mata.guesstheimagebackend.service;

import com.mata.guesstheimagebackend.dao.CommentRepository;
import com.mata.guesstheimagebackend.dao.PostRepository;
import com.mata.guesstheimagebackend.exception.UnauthorizedException;
import com.mata.guesstheimagebackend.model.Comment;
import com.mata.guesstheimagebackend.model.CommentStatus;
import com.mata.guesstheimagebackend.model.Post;
import com.mata.guesstheimagebackend.model.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;

@Service
public class CommentService {
    private final UserService userService;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public CommentService(UserService userService, PostRepository postRepository, CommentRepository commentRepository) {
        this.userService = userService;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public Comment addCommentToPost(Long postId, Comment comment) {
        User me = userService.getAuthenticatedUser().orElseThrow(() -> new UsernameNotFoundException("No user data!"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found!"));
        comment.setUser(me);
        post.addComment(comment);
        return commentRepository.save(comment);
    }

    public Comment updateCommentStatus(Long postId, Long commentId, @NotNull CommentStatus status) throws UnauthorizedException {
        User me = userService.getAuthenticatedUser().orElseThrow(() -> new UsernameNotFoundException("No user data!"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found!"));
        if(!post.getUser().getId().equals(me.getId())) {
            throw new UnauthorizedException("Only the post creator can modify this post.");
        }
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new EntityNotFoundException("Comment not found!"));
        comment.setStatus(status);
        return commentRepository.save(comment);
    }
}
