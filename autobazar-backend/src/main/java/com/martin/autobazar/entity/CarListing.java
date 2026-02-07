package com.martin.autobazar.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "car_listing")


public class CarListing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "listing_id")
    private Long listingId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private CarBrand brand;

    @ManyToOne
    @JoinColumn(name = "car_fuel_type_id")
    private CarFuelType carFuelType;

    @Column(name = "car_full_name", nullable = false)
    private String carFullName;

    @Column(nullable = false)
    private Long price;

    @Column(name = "engine_kW", nullable = false)
    private Long engineKW;

    @Column(name = "bought_date", nullable = false)
    private LocalDate boughtDate;

    @Column(name = "km_drove", nullable = false)
    private Long kmDrove;

    @Column(name = "images_path", nullable = false)
    private String imagesPath;

}
