package com.mata.guesstheimagebackend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IStorageService {

    void init();

    String store(MultipartFile file) throws IOException;
}
