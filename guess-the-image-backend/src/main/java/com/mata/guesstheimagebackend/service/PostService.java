package com.mata.guesstheimagebackend.service;

import com.mata.guesstheimagebackend.dao.PostRepository;
import com.mata.guesstheimagebackend.dao.UserRepository;
import com.mata.guesstheimagebackend.dto.AddCommentRequest;
import com.mata.guesstheimagebackend.dto.CreatePostRequest;
import com.mata.guesstheimagebackend.model.Comment;
import com.mata.guesstheimagebackend.model.Post;
import com.mata.guesstheimagebackend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.EntityNotFoundException;

@Service
public class PostService {

    private final UserService userService;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(UserService userService, PostRepository postRepository, UserRepository userRepository) {
        this.userService = userService;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public Post createPost(String url) {
        User me = userService.getAuthenticatedUser().orElseThrow(() -> new UsernameNotFoundException("No user data!"));
        Post post = new Post();
        me.addPost(post);
        post.setUrl(url);
        return postRepository.save(post);
    }

    public Post getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Post with the given id was not found!"));
        return post;
    }

    public Page<Post> getPostsPage(int page, int pageSize) {
        Pageable pagedAndSortedByDate =
                PageRequest.of(page, pageSize, Sort.by("createdAt").descending());
        return postRepository.findAll(pagedAndSortedByDate);
    }

    public void addCommentToPost(Long postId, AddCommentRequest addCommentRequest) {
        User me = userService.getAuthenticatedUser().orElseThrow(() -> new UsernameNotFoundException("No user data!"));
        Comment comment = new Comment();
        me.addComment(comment);
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("No such post!"));
        post.addComment(comment);
        postRepository.save(post);
        userRepository.save(me);
    }
}