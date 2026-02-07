package com.martin.autobazar.service.impl;

import com.martin.autobazar.repository.CarBrandRepository;
import com.martin.autobazar.service.CarBrandService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarBrandServiceImpl implements CarBrandService {

    private final CarBrandRepository carBrandRepository;

    public CarBrandServiceImpl(CarBrandRepository carBrandRepository) {
        this.carBrandRepository = carBrandRepository;
    }

    @Override
    public List<String> getAllBrandNames() {
        return carBrandRepository.findAllBrandNames();
    }

    @Override
    public List<String> findBrandNamesBySubstring(String substr) {
        if (substr == null) return List.of();
        return carBrandRepository.findBrandNamesBySubstring(substr);
    }
}
