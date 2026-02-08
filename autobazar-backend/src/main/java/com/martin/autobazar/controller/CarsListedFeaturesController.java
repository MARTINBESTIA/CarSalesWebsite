package com.martin.autobazar.controller;

import com.martin.autobazar.dto.CarsListedFeatureDto;
import com.martin.autobazar.service.CarsListedFeaturesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars-listed-features")
@CrossOrigin(origins = "http://localhost:5173")
public class CarsListedFeaturesController {

    private final CarsListedFeaturesService service;

    public CarsListedFeaturesController(CarsListedFeaturesService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CarsListedFeatureDto> addFeatureToListing(@RequestBody CarsListedFeatureDto dto) {
        CarsListedFeatureDto created = service.addFeatureToListing(dto);
        if (created == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<List<CarsListedFeatureDto>> getByListingId(@PathVariable Long listingId) {
        List<CarsListedFeatureDto> list = service.findByListingId(listingId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @DeleteMapping("/listing/{listingId}")
    public ResponseEntity<Void> deleteByListingId(@PathVariable Long listingId) {
        service.deleteByListingId(listingId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
