package com.mata.guesstheimagebackend.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@Getter
@Setter
@Entity
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

   public User(String username, String firstName, String lastName, String password, String email) {
       this.username = username;
       this.firstName = firstName;
       this.lastName = lastName;
       this.email = email;
       this.password = password;
   }
}
