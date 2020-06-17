package com.mata.guesstheimagebackend.service;

import com.mata.guesstheimagebackend.dao.CommentRepository;
import com.mata.guesstheimagebackend.dao.PostRepository;
import com.mata.guesstheimagebackend.exception.DataNotFoundException;
import com.mata.guesstheimagebackend.model.Comment;
import com.mata.guesstheimagebackend.model.Post;
import com.mata.guesstheimagebackend.model.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

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
}
