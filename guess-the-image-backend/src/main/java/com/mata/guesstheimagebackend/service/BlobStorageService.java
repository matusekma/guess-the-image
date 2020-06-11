package com.mata.guesstheimagebackend.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class BlobStorageService implements IStorageService {

    private final String containerName = "images";

    private String connectionString;

    private BlobContainerClient blobContainerClient;

    public BlobStorageService(@Value("${azure.storage.connectionString}") String connectionString) {
        this.connectionString = connectionString;
        this.init();
    }

    @Override
    public void init() {
        blobContainerClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient().getBlobContainerClient(containerName);
    }

    private Optional<String> getExtensionByStringHandling(String filename) {
        return Optional.ofNullable(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }

    @Override
    public String store(MultipartFile file) throws IOException {
        String extension = getExtensionByStringHandling(file.getOriginalFilename()).orElse("jpeg");
        String fileName = "image_" + java.util.UUID.randomUUID() + "." + extension.toLowerCase();

        BlobClient blobClient = blobContainerClient.getBlobClient(fileName);
        blobClient.upload(file.getInputStream(), file.getSize());

        return blobClient.getBlobUrl();
    }

    @Override
    public Stream<Path> loadAll() {
        return null;
    }

    @Override
    public String load(String filename) {
        return "";
        //blobServiceClient.getb
    }

}
