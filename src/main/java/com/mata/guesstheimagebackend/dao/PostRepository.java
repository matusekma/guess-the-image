package com.mata.guesstheimagebackend.dao;

import com.mata.guesstheimagebackend.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.user.id = :id")
    Page<Post> findAllByUserId(Pageable pagedAndSortedByDate, @Param("id") Long userId);
}
