package com.martin.autobazar.service;

import java.util.List;

public interface CarBrandService {
    List<String> getAllBrandNames();
    List<String> findBrandNamesBySubstring(String substr);
    Long getBrandIdByName(String name);
}
