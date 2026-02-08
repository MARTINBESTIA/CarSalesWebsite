package com.martin.autobazar.service;

import com.martin.autobazar.dto.CarListingDto;

public interface CarListingService {
    CarListingDto createListing(CarListingDto carListingDto);
}
