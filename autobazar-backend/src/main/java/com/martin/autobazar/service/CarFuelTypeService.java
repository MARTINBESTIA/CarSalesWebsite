package com.martin.autobazar.service;

import java.util.List;

public interface CarFuelTypeService {
    List<String> getAllFuelTypeNames();
    List<String> findFuelTypeNamesBySubstring(String substr);

    // Return id (Long) by exact fuel type name (case-insensitive)
    Long getFuelTypeIdByName(String name);
}
