package com.mata.guesstheimagebackend;

import com.mata.guesstheimagebackend.dao.UserRepository;
import com.mata.guesstheimagebackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class GuessTheImageBackendApplication {

    @Autowired
    private UserRepository userRepository;

    /*@PostConstruct
    public void initDb() {
        List<User> users = Stream.of(new User("asd","asd", "asd", "asd", "asd")).collect(Collectors.toList());
        userRepository.saveAll(users);
    }*/

    public static void main(String[] args) {
        SpringApplication.run(GuessTheImageBackendApplication.class, args);
    }

}
