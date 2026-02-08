package com.martin.autobazar.repository;

import com.martin.autobazar.entity.CarListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarListingRepository extends JpaRepository<CarListing, Long> {
    // Find listings by the owning user's id
    List<CarListing> findByUser_UserId(Long userId);
}
