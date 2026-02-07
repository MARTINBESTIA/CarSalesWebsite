package com.martin.autobazar.controller;

import com.martin.autobazar.service.CarFuelTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fuel-types")
@CrossOrigin(origins = "http://localhost:5173")
public class CarFuelTypeController {

    private final CarFuelTypeService carFuelTypeService;

    public CarFuelTypeController(CarFuelTypeService carFuelTypeService) {
        this.carFuelTypeService = carFuelTypeService;
    }

    @GetMapping
    public ResponseEntity<List<String>> getAllFuelTypes() {
        List<String> names = carFuelTypeService.getAllFuelTypeNames();
        return new ResponseEntity<>(names, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<String>> searchFuelTypes(@RequestParam(required = false, name = "q") String query) {
        if (query == null || query.isEmpty()) {
            return new ResponseEntity<>(List.of(), HttpStatus.OK);
        }
        List<String> names = carFuelTypeService.findFuelTypeNamesBySubstring(query);
        return new ResponseEntity<>(names, HttpStatus.OK);
    }
}
