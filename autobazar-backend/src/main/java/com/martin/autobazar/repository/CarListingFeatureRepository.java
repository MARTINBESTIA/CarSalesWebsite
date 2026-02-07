package com.martin.autobazar.repository;

import com.martin.autobazar.entity.CarListingFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CarListingFeatureRepository extends JpaRepository<CarListingFeature, Long> {

    @Query("SELECT c.featureName FROM CarListingFeature c")
    List<String> findAllFeatureNames();

    @Query("SELECT c.featureName FROM CarListingFeature c WHERE LOWER(c.featureName) LIKE CONCAT('%', LOWER(:substr), '%')")
    List<String> findFeatureNamesBySubstring(@Param("substr") String substr);

}
