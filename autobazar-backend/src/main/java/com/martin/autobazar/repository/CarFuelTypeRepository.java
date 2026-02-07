package com.martin.autobazar.repository;

import com.martin.autobazar.entity.CarFuelType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CarFuelTypeRepository extends JpaRepository<CarFuelType, Long> {

    @Query("SELECT c.carFuelTypeName FROM CarFuelType c")
    List<String> findAllFuelTypeNames();

    @Query("SELECT c.carFuelTypeName FROM CarFuelType c WHERE LOWER(c.carFuelTypeName) LIKE CONCAT('%', LOWER(:substr), '%')")
    List<String> findFuelTypeNamesBySubstring(@Param("substr") String substr);

}
