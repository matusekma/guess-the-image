package com.mata.guesstheimagebackend.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;

public interface IStorageService {

    void init();

    String store(MultipartFile file) throws IOException;

    Stream<Path> loadAll();

    String load(String filename);
}
