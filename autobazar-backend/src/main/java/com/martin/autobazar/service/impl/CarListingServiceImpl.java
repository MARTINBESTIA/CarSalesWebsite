package com.martin.autobazar.service.impl;

import com.martin.autobazar.dto.CarListingDto;
import com.martin.autobazar.entity.CarListing;
import com.martin.autobazar.entity.CarBrand;
import com.martin.autobazar.entity.CarFuelType;
import com.martin.autobazar.entity.User;
import com.martin.autobazar.mapper.UserMapper;
import com.martin.autobazar.repository.CarBrandRepository;
import com.martin.autobazar.repository.CarFuelTypeRepository;
import com.martin.autobazar.repository.CarListingRepository;
import com.martin.autobazar.repository.UserRepository;
import com.martin.autobazar.service.CarListingService;
import org.springframework.stereotype.Service;

@Service
public class CarListingServiceImpl implements CarListingService {

    private final CarListingRepository carListingRepository;
    private final UserRepository userRepository;
    private final CarBrandRepository carBrandRepository;
    private final CarFuelTypeRepository carFuelTypeRepository;

    public CarListingServiceImpl(CarListingRepository carListingRepository, UserRepository userRepository, CarBrandRepository carBrandRepository, CarFuelTypeRepository carFuelTypeRepository) {
        this.carListingRepository = carListingRepository;
        this.userRepository = userRepository;
        this.carBrandRepository = carBrandRepository;
        this.carFuelTypeRepository = carFuelTypeRepository;
    }

    @Override
    public CarListingDto createListing(CarListingDto carListingDto) {
        User user = userRepository.findById(carListingDto.getUserId()).orElse(null);
        CarBrand brand = carBrandRepository.findById(carListingDto.getBrandId()).orElse(null);
        CarFuelType fuelType = carFuelTypeRepository.findById(carListingDto.getCarFuelTypeId()).orElse(null);

        if (user == null || brand == null || fuelType == null) return null;

        CarListing entity = new CarListing();
        entity.setUser(user);
        entity.setBrand(brand);
        entity.setCarFuelType(fuelType);
        entity.setCarFullName(carListingDto.getCarFullName());
        entity.setPrice(carListingDto.getPrice());
        entity.setEngineKW(carListingDto.getEngineKW());
        entity.setBoughtDate(carListingDto.getBoughtDate());
        entity.setKmDrove(carListingDto.getKmDrove());

        CarListing saved = carListingRepository.save(entity);

        return new CarListingDto(
                saved.getListingId(),
                saved.getUser() != null ? saved.getUser().getUserId() : null,
                saved.getBrand() != null ? saved.getBrand().getBrand_id() : null,
                saved.getCarFuelType() != null ? saved.getCarFuelType().getCarFuelTypeId() : null,
                saved.getCarFullName(),
                saved.getPrice(),
                saved.getEngineKW(),
                saved.getBoughtDate(),
                saved.getKmDrove());
    }
}
