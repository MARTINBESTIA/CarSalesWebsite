package com.martin.autobazar.controller;

import com.martin.autobazar.dto.CarListingDto;
import com.martin.autobazar.dto.CarListingWithImageDto;
import com.martin.autobazar.entity.CarListing;
import com.martin.autobazar.entity.CarBrand;
import com.martin.autobazar.entity.CarFuelType;
import com.martin.autobazar.entity.User;
import com.martin.autobazar.repository.CarBrandRepository;
import com.martin.autobazar.repository.CarFuelTypeRepository;
import com.martin.autobazar.repository.CarListingRepository;
import com.martin.autobazar.repository.UserRepository;
import com.martin.autobazar.service.CarsListedFeaturesService;
import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;


@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "http://localhost:5173")
public class CarListingController {

    private final CarListingRepository carListingRepository;
    private final UserRepository userRepository;
    private final CarBrandRepository carBrandRepository;
    private final CarFuelTypeRepository carFuelTypeRepository;
    private final CarsListedFeaturesService carsListedFeaturesService;

    @Value("${app.upload.dir}")
    private String uploadDir;

    public CarListingController(CarListingRepository carListingRepository, UserRepository userRepository, CarBrandRepository carBrandRepository, CarFuelTypeRepository carFuelTypeRepository, CarsListedFeaturesService carsListedFeaturesService) {
        this.carListingRepository = carListingRepository;
        this.userRepository = userRepository;
        this.carBrandRepository = carBrandRepository;
        this.carFuelTypeRepository = carFuelTypeRepository;
        this.carsListedFeaturesService = carsListedFeaturesService;
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
            Path target = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(String.valueOf(listingId)).resolve(finalName);
            Files.createDirectories(target.getParent());

            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Saved file: " + target.toAbsolutePath());

            // relative path from /images
            savedPaths.add("listings/" + listingId + "/" + finalName);
            index++;
        }

        return ResponseEntity.ok(savedPaths);
    }

    // New endpoint: get all listings for a user with main image path (full URL)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CarListingWithImageDto>> getListingsByUser(@PathVariable Long userId, HttpServletRequest request) {
        List<CarListing> list = carListingRepository.findByUser_UserId(userId);
        List<CarListingWithImageDto> result = new ArrayList<>();

        String base = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();

        for (CarListing l : list) {
            String mainImageRel = findMainImageForListing(l.getListingId());
            String mainImageFull = mainImageRel != null ? base + "/images/" + mainImageRel : null;
            CarListingWithImageDto dto = new CarListingWithImageDto(
                    l.getListingId(),
                    l.getUser() != null ? l.getUser().getUserId() : null,
                    l.getBrand() != null ? l.getBrand().getBrand_id() : null,
                    l.getCarFuelType() != null ? l.getCarFuelType().getCarFuelTypeId() : null,
                    l.getCarFullName(),
                    l.getPrice(),
                    l.getEngineKW(),
                    l.getBoughtDate(),
                    l.getKmDrove(),
                    mainImageFull
            );
            result.add(dto);
        }

        return ResponseEntity.ok(result);
    }

    // New endpoint: single listing by id
    @GetMapping("/{listingId}")
    public ResponseEntity<CarListingWithImageDto> getListingById(@PathVariable Long listingId, HttpServletRequest request) {
        CarListing listing = carListingRepository.findById(listingId).orElse(null);
        if (listing == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        String base = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String mainImageRel = findMainImageForListing(listing.getListingId());
        String mainImageFull = mainImageRel != null ? base + "/images/" + mainImageRel : null;

        CarListingWithImageDto dto = new CarListingWithImageDto(
                listing.getListingId(),
                listing.getUser() != null ? listing.getUser().getUserId() : null,
                listing.getBrand() != null ? listing.getBrand().getBrand_id() : null,
                listing.getCarFuelType() != null ? listing.getCarFuelType().getCarFuelTypeId() : null,
                listing.getCarFullName(),
                listing.getPrice(),
                listing.getEngineKW(),
                listing.getBoughtDate(),
                listing.getKmDrove(),
                mainImageFull
        );

        return ResponseEntity.ok(dto);
    }

    // New endpoint: list image paths for a listing (full URLs)
    @GetMapping("/{listingId}/images")
    public ResponseEntity<List<String>> getImagesForListing(@PathVariable Long listingId, HttpServletRequest request) {
        Path listingFolder = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(String.valueOf(listingId));
        List<String> images = new ArrayList<>();
        if (!Files.exists(listingFolder) || !Files.isDirectory(listingFolder)) {
            return ResponseEntity.ok(images);
        }

        String base = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(listingFolder)) {
            stream.forEach(p -> {
                if (Files.isRegularFile(p)) {
                    images.add(base + "/images/" + "listings/" + listingId + "/" + p.getFileName().toString());
                }
            });
            images.sort(Comparator.naturalOrder());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(images);
    }

    // New: delete listing endpoint — remove features, delete files/folder, then delete listing
    @DeleteMapping("/{listingId}")
    public ResponseEntity<Void> deleteListing(@PathVariable Long listingId) {
        if (!carListingRepository.existsById(listingId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // 1) delete features rows for this listing
        try {
            carsListedFeaturesService.deleteByListingId(listingId);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        // 2) delete files on disk
        try {
            Path listingFolder = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(String.valueOf(listingId));
            if (Files.exists(listingFolder)) {
                Files.walk(listingFolder)
                        .sorted(Comparator.reverseOrder())
                        .map(Path::toFile)
                        .forEach(File::delete);
                // attempt to delete parent folder if empty (handled by above)
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        // 3) delete listing from DB
        carListingRepository.deleteById(listingId);

        return ResponseEntity.noContent().build();
    }

    // New endpoint: update listing
    @PutMapping("/{listingId}")
    @Transactional
    public ResponseEntity<CarListingDto> updateListing(@PathVariable Long listingId, @RequestBody CarListingDto dto) {
        CarListing listing = carListingRepository.findById(listingId).orElse(null);
        if (listing == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        // validate and set fields
        if (dto.getBrandId() != null) {
            CarBrand brand = carBrandRepository.findById(dto.getBrandId()).orElse(null);
            if (brand == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            listing.setBrand(brand);
        }
        if (dto.getCarFuelTypeId() != null) {
            CarFuelType fuel = carFuelTypeRepository.findById(dto.getCarFuelTypeId()).orElse(null);
            if (fuel == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            listing.setCarFuelType(fuel);
        }

        if (dto.getCarFullName() != null) listing.setCarFullName(dto.getCarFullName());
        if (dto.getPrice() != null) listing.setPrice(dto.getPrice());
        if (dto.getEngineKW() != null) listing.setEngineKW(dto.getEngineKW());
        if (dto.getBoughtDate() != null) listing.setBoughtDate(dto.getBoughtDate());
        if (dto.getKmDrove() != null) listing.setKmDrove(dto.getKmDrove());

        CarListing saved = carListingRepository.save(listing);

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

        return ResponseEntity.ok(response);
    }

    private String findMainImageForListing(Long listingId) {
        try {
            Path listingFolder = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(String.valueOf(listingId));
            if (!Files.exists(listingFolder) || !Files.isDirectory(listingFolder)) return null;
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(listingFolder)) {
                // pick the smallest numeric filename (1.jpg, 2.jpg...), so sorting is fine
                List<Path> files = new ArrayList<>();
                stream.forEach(files::add);
                files.sort(Comparator.naturalOrder());
                if (files.size() > 0) {
                    return "listings/" + listingId + "/" + files.get(0).getFileName().toString();
                }
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
