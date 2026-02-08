package com.martin.autobazar.controller;

import com.martin.autobazar.dto.CarListingDto;
import com.martin.autobazar.entity.CarListing;
import com.martin.autobazar.entity.CarBrand;
import com.martin.autobazar.entity.CarFuelType;
import com.martin.autobazar.entity.User;
import com.martin.autobazar.repository.CarBrandRepository;
import com.martin.autobazar.repository.CarFuelTypeRepository;
import com.martin.autobazar.repository.CarListingRepository;
import com.martin.autobazar.repository.UserRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "http://localhost:5173")
public class CarListingController {

    private final CarListingRepository carListingRepository;
    private final UserRepository userRepository;
    private final CarBrandRepository carBrandRepository;
    private final CarFuelTypeRepository carFuelTypeRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    public CarListingController(CarListingRepository carListingRepository, UserRepository userRepository, CarBrandRepository carBrandRepository, CarFuelTypeRepository carFuelTypeRepository) {
        this.carListingRepository = carListingRepository;
        this.userRepository = userRepository;
        this.carBrandRepository = carBrandRepository;
        this.carFuelTypeRepository = carFuelTypeRepository;
    }

    @PostMapping
    public ResponseEntity<CarListingDto> createListing(@RequestBody CarListingDto dto) {
        // Validate required fields minimally
        if (dto.getUserId() == null || dto.getBrandId() == null || dto.getCarFuelTypeId() == null || dto.getCarFullName() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = userRepository.findById(dto.getUserId()).orElse(null);
        CarBrand brand = carBrandRepository.findById(dto.getBrandId()).orElse(null);
        CarFuelType fuelType = carFuelTypeRepository.findById(dto.getCarFuelTypeId()).orElse(null);

        if (user == null || brand == null || fuelType == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        CarListing entity = new CarListing();
        entity.setUser(user);
        entity.setBrand(brand);
        entity.setCarFuelType(fuelType);
        entity.setCarFullName(dto.getCarFullName());
        entity.setPrice(dto.getPrice());
        entity.setEngineKW(dto.getEngineKW());
        entity.setBoughtDate(dto.getBoughtDate());
        entity.setKmDrove(dto.getKmDrove());

        CarListing saved = carListingRepository.save(entity);

        CarListingDto response = new CarListingDto(
                saved.getListingId(),
                saved.getUser() != null ? saved.getUser().getUserId() : null,
                saved.getBrand() != null ? saved.getBrand().getBrand_id() : null,
                saved.getCarFuelType() != null ? saved.getCarFuelType().getCarFuelTypeId() : null,
                saved.getCarFullName(),
                saved.getPrice(),
                saved.getEngineKW(),
                saved.getBoughtDate(),
                saved.getKmDrove());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping(value = "/{listingId}/images", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadCarImages(
            @PathVariable Long listingId,
            @RequestParam("files") MultipartFile[] files
    ) throws IOException {

        if (!carListingRepository.existsById(listingId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Listing not found: " + listingId);
        }

        // uploadDir already points to .../images/listings
        Path listingFolder = Paths.get(uploadDir)
                .toAbsolutePath()
                .normalize()
                .resolve(String.valueOf(listingId));

        Files.createDirectories(listingFolder);

        System.out.println("Upload dir: " + uploadDir);
        System.out.println("Listing folder: " + listingFolder);
        System.out.println("Files received: " + (files == null ? "null" : files.length));

        List<String> savedPaths = new ArrayList<>();
        if (files == null || files.length == 0) return ResponseEntity.ok(savedPaths);

        int index = 1;
        for (MultipartFile file : files) {
            if (file == null || file.isEmpty()) continue;

            String original = Objects.requireNonNull(file.getOriginalFilename());
            String sanitized = original.replaceAll("[^a-zA-Z0-9._-]", "_");

            String ext = "";
            int dot = sanitized.lastIndexOf('.');
            if (dot != -1 && dot < sanitized.length() - 1) {
                ext = sanitized.substring(dot).toLowerCase();
            }

            String finalName = index + ext;
            Path target = listingFolder.resolve(finalName);

            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Saved file: " + target.toAbsolutePath());

            // relative path from /images
            savedPaths.add("listings/" + listingId + "/" + finalName);
            index++;
        }

        return ResponseEntity.ok(savedPaths);
    }
}