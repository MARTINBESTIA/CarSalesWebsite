package com.martin.autobazar.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "car_fuel_type")



public class CarFuelType {
    @Id
    @Column(name = "car_fuel_type_id")
    private Long carFuelTypeId;
    @Column(name = "car_fuel_type_name", nullable = false)
    private String carFuelTypeName;
}
