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
@Table(name = "cars_listed_features")

public class CarsListedFeatures {
    @Id
    @ManyToOne
    @JoinColumn(name = "listing_id")
    private CarListing carListing;

    @Id
    @ManyToOne
    @JoinColumn(name = "car_listing_feature")
    private CarListingFeature carListingFeature;
}
