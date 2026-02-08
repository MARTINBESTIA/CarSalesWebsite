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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "http://localhost:5173")
public class CarListingController {

    private final CarListingRepository carListingRepository;
    private final UserRepository userRepository;
    private final CarBrandRepository carBrandRepository;
    private final CarFuelTypeRepository carFuelTypeRepository;

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
}
