package com.martin.autobazar.service.impl;

import com.martin.autobazar.dto.CarListingFeatureDto;
import com.martin.autobazar.repository.CarListingFeatureRepository;
import com.martin.autobazar.service.CarListingFeatureService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<CarListingFeatureDto> getAllFeatureDtos() {
        return carListingFeatureRepository.findAll().stream()
                .map(e -> new CarListingFeatureDto(e.getIdCarListingFeature(), e.getFeatureName()))
                .collect(Collectors.toList());
    }
}
