package com.martin.autobazar.entity;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_fuel_type_id")
    private Long carFuelTypeId;
    @Column(name = "car_fuel_type_name", nullable = false)
    private String carFuelTypeName;
}
