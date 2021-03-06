package com.mata.guesstheimagebackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String url;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    @OrderBy("createdAt DESC")
    private List<Comment> comments;

    @NotNull
    @Column(columnDefinition = "boolean default false")
    private boolean archived;

    @NotNull
    @ManyToOne
    @JsonManagedReference
    private User user;

    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setPost(this);
    }
}
