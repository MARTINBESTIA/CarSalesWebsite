package com.martin.autobazar.controller;

import com.martin.autobazar.dto.CarListingFeatureDto;
import com.martin.autobazar.service.CarListingFeatureService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/features")
@CrossOrigin(origins = "http://localhost:5173")
public class CarListingFeatureController {

    private final CarListingFeatureService carListingFeatureService;

    public CarListingFeatureController(CarListingFeatureService carListingFeatureService) {
        this.carListingFeatureService = carListingFeatureService;
    }

    @GetMapping
    public ResponseEntity<List<String>> getAllFeatures() {
        List<String> names = carListingFeatureService.getAllFeatureNames();
        return new ResponseEntity<>(names, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<String>> searchFeatures(@RequestParam(required = false, name = "q") String query) {
        if (query == null || query.isEmpty()) {
            return new ResponseEntity<>(List.of(), HttpStatus.OK);
        }
        List<String> names = carListingFeatureService.findFeatureNamesBySubstring(query);
        return new ResponseEntity<>(names, HttpStatus.OK);
    }

    @GetMapping("/pairs")
    public ResponseEntity<List<CarListingFeatureDto>> getAllFeaturePairs() {
        List<CarListingFeatureDto> dtos = carListingFeatureService.getAllFeatureDtos();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
