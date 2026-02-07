package com.martin.autobazar.service;

import java.util.List;

public interface CarFuelTypeService {
    List<String> getAllFuelTypeNames();
    List<String> findFuelTypeNamesBySubstring(String substr);
}
