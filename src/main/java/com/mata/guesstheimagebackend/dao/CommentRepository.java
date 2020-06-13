package com.mata.guesstheimagebackend.dao;

import com.mata.guesstheimagebackend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}
