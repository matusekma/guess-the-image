package com.mata.guesstheimagebackend.controller;

import com.mata.guesstheimagebackend.dto.PostResponse;
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
        return new ResponseEntity<>(convertToDto(post), HttpStatus.OK);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return new ResponseEntity<>(convertToDto(post), HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<Page<PostResponse>> getPostsByPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int pageSize) {
        Page<Post> posts = postService.getPostsPage(page, pageSize);
        return new ResponseEntity<>(posts.map(this::convertToDto), HttpStatus.OK);
    }

    private PostResponse convertToDto(Post post) {
        PostResponse postResponse = modelMapper.map(post, PostResponse.class);
        return postResponse;
    }

    /*
    @GetMapping("/")
    public String listUploadedFiles(Model model) throws IOException {

        model.addAttribute("files", storageService.loadAll().map(
                path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                        "serveFile", path.getFileName().toString()).build().toUri().toString())
                .collect(Collectors.toList()));

        return "uploadForm";
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping("/")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        storageService.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

        return "redirect:/";
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
    */

}

