package com.martin.autobazar.repository;

import com.martin.autobazar.entity.CarsListedFeatures;
import com.martin.autobazar.entity.CarsListedFeaturesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarsListedFeaturesRepository extends JpaRepository<CarsListedFeatures, CarsListedFeaturesId> {

    // find all feature relations for a given listing id
    List<CarsListedFeatures> findByIdListingId(Long listingId);

    // delete all feature relations for a given listing id
    void deleteByIdListingId(Long listingId);
}
