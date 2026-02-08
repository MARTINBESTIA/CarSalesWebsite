package com.martin.autobazar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarListingWithImageDto {
    private Long listingId;
    private Long userId;
    private Long brandId;
    private Long carFuelTypeId;
    private String carFullName;
    private Long price;
    private Long engineKW;
    private LocalDate boughtDate;
    private Long kmDrove;
    private String mainImageUrl; // full URL to the main image (or null)
    private List<Long> featureIds; // list of feature ids associated with this listing
}
