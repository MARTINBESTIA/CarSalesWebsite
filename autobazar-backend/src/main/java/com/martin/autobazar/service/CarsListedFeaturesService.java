package com.martin.autobazar.service;

import com.martin.autobazar.dto.CarsListedFeatureDto;

import java.util.List;

public interface CarsListedFeaturesService {

    CarsListedFeatureDto addFeatureToListing(CarsListedFeatureDto dto);

    List<CarsListedFeatureDto> findByListingId(Long listingId);

    List<CarsListedFeatureDto> findByUserId(Long userId);

    void deleteByListingId(Long listingId);
}
