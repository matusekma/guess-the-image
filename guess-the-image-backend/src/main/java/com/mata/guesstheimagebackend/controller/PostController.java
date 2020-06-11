package com.mata.guesstheimagebackend.controller;

import com.mata.guesstheimagebackend.model.Post;
import com.mata.guesstheimagebackend.service.IStorageService;
import com.mata.guesstheimagebackend.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class PostController {

    private final PostService postService;
    private final IStorageService storageService;

    public PostController(PostService postService, IStorageService storageService) {
        this.postService = postService;
        this.storageService = storageService;
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@RequestParam("file") MultipartFile file) throws IOException {
        String url = storageService.store(file);
        Post post = postService.createPost(url);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id){
        Post post = postService.getPostById(id);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }
}

