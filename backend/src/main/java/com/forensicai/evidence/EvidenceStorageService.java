package com.forensicai.evidence;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class EvidenceStorageService {

    private final Path rootLocation = Paths.get("uploads").toAbsolutePath().normalize();
    private static final Set<String> ALLOWED_TYPES = Set.of(
        "image/jpeg", "image/png", "image/webp", "image/jpg"
    );
    private static final long MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

    public EvidenceStorageService() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize evidence upload directory", e);
        }
    }

    public StoredFileInfo store(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store empty file.");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds 15MB limit.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Invalid file type. Allowed: JPEG, PNG, WEBP.");
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        } else {
            extension = contentType.contains("png") ? ".png" : ".jpg";
        }

        String storedFilename = UUID.randomUUID().toString() + extension;
        Path destination = this.rootLocation.resolve(storedFilename).normalize();

        int width = 0;
        int height = 0;

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
            
            // Read dimensions
            try {
                BufferedImage image = ImageIO.read(destination.toFile());
                if (image != null) {
                    width = image.getWidth();
                    height = image.getHeight();
                }
            } catch (Exception ignored) {
                // Dimensions optional if header parsing fails
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file " + storedFilename, e);
        }

        return new StoredFileInfo(
            originalFilename != null ? originalFilename : storedFilename,
            destination.toString(),
            storedFilename,
            contentType,
            file.getSize(),
            width,
            height
        );
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = rootLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read file: " + filename);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Could not read file: " + filename, e);
        }
    }

    public record StoredFileInfo(
        String originalName,
        String absolutePath,
        String storedFilename,
        String contentType,
        long size,
        int width,
        int height
    ) {}
}
