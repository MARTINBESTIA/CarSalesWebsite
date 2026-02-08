package com.martin.autobazar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CarListingDto {
    private Long listingId;
    private Long userId;
    private Long brandId;
    private Long carFuelTypeId;
    private String carFullName;
    private Long price;
    private Long engineKW;
    private LocalDate boughtDate;
    private Long kmDrove;
}
