package com.martin.autobazar.service;

import com.martin.autobazar.dto.CarListingFeatureDto;

import java.util.List;

public interface CarListingFeatureService {
    List<String> getAllFeatureNames();
    List<String> findFeatureNamesBySubstring(String substr);

    // Return list of DTOs containing both id and name
    List<CarListingFeatureDto> getAllFeatureDtos();
}
