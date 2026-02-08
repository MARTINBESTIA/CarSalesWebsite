package com.martin.autobazar.service.impl;

import com.martin.autobazar.repository.CarFuelTypeRepository;
import com.martin.autobazar.service.CarFuelTypeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarFuelTypeServiceImpl implements CarFuelTypeService {

    private final CarFuelTypeRepository carFuelTypeRepository;

    public CarFuelTypeServiceImpl(CarFuelTypeRepository carFuelTypeRepository) {
        this.carFuelTypeRepository = carFuelTypeRepository;
    }

    @Override
    public List<String> getAllFuelTypeNames() {
        return carFuelTypeRepository.findAllFuelTypeNames();
    }

    @Override
    public List<String> findFuelTypeNamesBySubstring(String substr) {
        if (substr == null) return List.of();
        return carFuelTypeRepository.findFuelTypeNamesBySubstring(substr);
    }

    @Override
    public Long getFuelTypeIdByName(String name) {
        if (name == null || name.isBlank()) return null;
        return carFuelTypeRepository.findFuelTypeIdByName(name);
    }
}
