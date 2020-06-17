package com.mata.guesstheimagebackend.controller;

import com.mata.guesstheimagebackend.dto.PostResponse;
import com.mata.guesstheimagebackend.dto.PostWithoutCommentsResponse;
import com.mata.guesstheimagebackend.model.Post;
import com.mata.guesstheimagebackend.service.IStorageService;
import com.mata.guesstheimagebackend.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class PostController {

    private final PostService postService;
    private final IStorageService storageService;
    private final ModelMapper modelMapper;

    public PostController(PostService postService, IStorageService storageService) {
        this.postService = postService;
        this.storageService = storageService;
        this.modelMapper = new ModelMapper();
    }

    @PostMapping("/posts")
    public ResponseEntity<PostResponse> createPost(@RequestParam("file") MultipartFile file) throws IOException {
        String url = storageService.store(file);
        Post post = postService.createPost(url);
        return new ResponseEntity<>(convertToPostResponse(post), HttpStatus.CREATED);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return new ResponseEntity<>(convertToPostResponse(post), HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<Page<PostWithoutCommentsResponse>> getPostsByPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int pageSize) {
        Page<Post> posts = postService.getPostsPage(page, pageSize);
        return new ResponseEntity<>(posts.map(this::convertToPostResponseWithoutComments), HttpStatus.OK);
    }

    private PostResponse convertToPostResponse(Post post) {
        return modelMapper.map(post, PostResponse.class);
    }

    private PostWithoutCommentsResponse convertToPostResponseWithoutComments(Post post) {
        return modelMapper.map(post, PostWithoutCommentsResponse.class);
    }

}

