package com.mata.guesstheimagebackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "writtenOn")
    private LocalDateTime writtenOn;

    @Size(max = 1000)
    private String text;

    @NotNull
    @Column(columnDefinition = "boolean default false")
    private boolean isCorrect;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private User user;


}
