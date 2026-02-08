package com.martin.autobazar.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * Composite key for CarsListedFeatures (listingId, featureId).
 */
@Embeddable
public class CarsListedFeaturesId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long listingId;
    private Long featureId;

    public CarsListedFeaturesId() {}

    public CarsListedFeaturesId(Long listingId, Long featureId) {
        this.listingId = listingId;
        this.featureId = featureId;
    }

    public Long getListingId() {
        return listingId;
    }

    public void setListingId(Long listingId) {
        this.listingId = listingId;
    }

    public Long getFeatureId() {
        return featureId;
    }

    public void setFeatureId(Long featureId) {
        this.featureId = featureId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CarsListedFeaturesId that = (CarsListedFeaturesId) o;
        return Objects.equals(listingId, that.listingId) &&
               Objects.equals(featureId, that.featureId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(listingId, featureId);
    }
}

