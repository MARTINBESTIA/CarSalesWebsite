package com.martin.autobazar.repository;

import com.martin.autobazar.entity.CarBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CarBrandRepository extends JpaRepository<CarBrand, Long> {

    @Query("SELECT c.brandName FROM CarBrand c")
    List<String> findAllBrandNames();

    @Query("SELECT c.brandName FROM CarBrand c WHERE LOWER(c.brandName) LIKE CONCAT('%', LOWER(:substr), '%')")
    List<String> findBrandNamesBySubstring(@Param("substr") String substr);

    // Find the CarBrand entity by name case-insensitively
    Optional<CarBrand> findByBrandNameIgnoreCase(String brandName);
}
