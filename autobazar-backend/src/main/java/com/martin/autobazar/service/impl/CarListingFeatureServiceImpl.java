package com.martin.autobazar.service.impl;

import com.martin.autobazar.repository.CarListingFeatureRepository;
import com.martin.autobazar.service.CarListingFeatureService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarListingFeatureServiceImpl implements CarListingFeatureService {

    private final CarListingFeatureRepository carListingFeatureRepository;

    public CarListingFeatureServiceImpl(CarListingFeatureRepository carListingFeatureRepository) {
        this.carListingFeatureRepository = carListingFeatureRepository;
    }

    @Override
    public List<String> getAllFeatureNames() {
        return carListingFeatureRepository.findAllFeatureNames();
    }

    @Override
    public List<String> findFeatureNamesBySubstring(String substr) {
        if (substr == null) return List.of();
        return carListingFeatureRepository.findFeatureNamesBySubstring(substr);
    }
}
