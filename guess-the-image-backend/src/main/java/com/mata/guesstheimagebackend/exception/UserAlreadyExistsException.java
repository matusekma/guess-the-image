package com.mata.guesstheimagebackend.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super("There is already an account with that username/email: " + message);
    }
}
