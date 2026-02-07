package com.martin.autobazar.service;

import java.util.List;

public interface CarListingFeatureService {
    List<String> getAllFeatureNames();
    List<String> findFeatureNamesBySubstring(String substr);
}
