package com.martin.autobazar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CarFuelTypeDto {
    private Long fuelTypeId;
    private String fuelTypeName;
}
