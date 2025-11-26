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
@Table(name = "car_listing_feature")


public class CarListingFeature {

    @Id
    @Column(name = "car_listing_feature")
    private Long idCarListingFeature;
    @Column(name = "feature_name", nullable = false)
    private String featureName;

}

