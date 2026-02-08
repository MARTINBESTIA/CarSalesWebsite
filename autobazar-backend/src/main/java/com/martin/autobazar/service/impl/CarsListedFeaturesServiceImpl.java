package com.martin.autobazar.service.impl;

import com.martin.autobazar.dto.CarsListedFeatureDto;
import com.martin.autobazar.entity.CarsListedFeatures;
import com.martin.autobazar.entity.CarsListedFeaturesId;
import com.martin.autobazar.repository.CarsListedFeaturesRepository;
import com.martin.autobazar.service.CarsListedFeaturesService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarsListedFeaturesServiceImpl implements CarsListedFeaturesService {

    private final CarsListedFeaturesRepository repository;

    public CarsListedFeaturesServiceImpl(CarsListedFeaturesRepository repository) {
        this.repository = repository;
    }

    @Override
    public CarsListedFeatureDto addFeatureToListing(CarsListedFeatureDto dto) {
        if (dto == null || dto.getListingId() == null || dto.getFeatureId() == null) {
            return null;
        }
        CarsListedFeaturesId id = new CarsListedFeaturesId(dto.getListingId(), dto.getFeatureId());
        CarsListedFeatures entity = new CarsListedFeatures(id);
        CarsListedFeatures saved = repository.save(entity);
        return new CarsListedFeatureDto(saved.getId().getListingId(), saved.getId().getFeatureId());
    }

    @Override
    public List<CarsListedFeatureDto> findByListingId(Long listingId) {
        if (listingId == null) return List.of();
        return repository.findByIdListingId(listingId).stream()
                .map(e -> new CarsListedFeatureDto(e.getId().getListingId(), e.getId().getFeatureId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<CarsListedFeatureDto> findByUserId(Long userId) {
        // The table now holds only listingId and featureId; return empty list for compatibility.
        return List.of();
    }

    @Override
    public void deleteByListingId(Long listingId) {
        if (listingId == null) return;
        repository.deleteByIdListingId(listingId);
    }
}
