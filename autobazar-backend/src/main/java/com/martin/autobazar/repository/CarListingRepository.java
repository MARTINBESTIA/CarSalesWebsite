package com.martin.autobazar.repository;

import com.martin.autobazar.entity.CarListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarListingRepository extends JpaRepository<CarListing, Long> {
}
