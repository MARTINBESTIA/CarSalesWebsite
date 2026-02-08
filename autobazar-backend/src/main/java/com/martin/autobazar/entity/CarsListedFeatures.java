package com.martin.autobazar.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
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
@Table(name = "cars_listed_features")
public class CarsListedFeatures {

    @EmbeddedId
    private CarsListedFeaturesId id;

    // convenience getters
    public Long getListingId() {
        return id != null ? id.getListingId() : null;
    }

    public Long getFeatureId() {
        return id != null ? id.getFeatureId() : null;
    }
}
