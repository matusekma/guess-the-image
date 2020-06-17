package com.mata.guesstheimagebackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull(message = "Username can not be null")
    @NotEmpty
    @Size(min = 3, max = 1000)
    @Column(unique=true)
    private String username;

    @Size(min = 3, max = 1000)
    private String firstName;

    @Size(min = 3, max = 1000)
    private String lastName;

    @NotNull(message = "Password can not be null")
    @NotEmpty
    @Size(min = 4, max = 1000)
    private String password;

    @NotNull(message = "E-mail can not be null")
    @NotEmpty
    @Email(message = "Invalid e-mail")
    @Column(unique=true)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Post> posts;

    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setUser(this);
    }

    public void addPost(Post post) {
        posts.add(post);
        post.setUser(this);
    }

   public User(String username, String firstName, String lastName, String password, String email) {
       this.username = username;
       this.firstName = firstName;
       this.lastName = lastName;
       this.email = email;
       this.password = password;
   }
}
