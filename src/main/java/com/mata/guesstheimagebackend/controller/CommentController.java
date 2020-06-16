package com.mata.guesstheimagebackend.controller;

import com.mata.guesstheimagebackend.dto.AddCommentRequest;
import com.mata.guesstheimagebackend.dto.CommentResponse;
import com.mata.guesstheimagebackend.model.Comment;
import com.mata.guesstheimagebackend.service.CommentService;
import com.mata.guesstheimagebackend.util.DTO;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CommentController {

    private final CommentService commentService;
    private final ModelMapper modelMapper;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
        this.modelMapper = new ModelMapper();
    }

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<CommentResponse> postComment(@PathVariable Long postId, @DTO(AddCommentRequest.class) Comment comment)  {
        Comment createdComment = commentService.addCommentToPost(postId, comment);
        return new ResponseEntity<>(convertToDto(createdComment), HttpStatus.CREATED);
    }

    /*@GetMapping("/posts/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return new ResponseEntity<>(convertToDto(post), HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<Page<PostResponse>> getPostsByPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int pageSize) {
        Page<Post> posts = postService.getPostsPage(page, pageSize);
        return new ResponseEntity<>(posts.map(this::convertToDto), HttpStatus.OK);
    }*/

    private CommentResponse convertToDto(Comment comment) {
        return modelMapper.map(comment, CommentResponse.class);
    }
}


