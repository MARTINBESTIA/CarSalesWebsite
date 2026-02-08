package com.martin.autobazar.controller;

import com.martin.autobazar.service.CarBrandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin(origins = "http://localhost:5173")
public class CarBrandController {

    private final CarBrandService carBrandService;

    public CarBrandController(CarBrandService carBrandService) {
        this.carBrandService = carBrandService;
    }

    @GetMapping
    public ResponseEntity<List<String>> getAllBrands() {
        List<String> names = carBrandService.getAllBrandNames();
        return new ResponseEntity<>(names, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<String>> searchBrands(@RequestParam(required = false, name = "q") String query) {
        if (query == null || query.isEmpty()) {
            return new ResponseEntity<>(List.of(), HttpStatus.OK);
        }
        List<String> names = carBrandService.findBrandNamesBySubstring(query);
        return new ResponseEntity<>(names, HttpStatus.OK);
    }

    @GetMapping("/id")
    public ResponseEntity<Long> getBrandIdByName(@RequestParam(name = "name") String name) {
        if (name == null || name.isBlank()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Long id = carBrandService.getBrandIdByName(name);
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
