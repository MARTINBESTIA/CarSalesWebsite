package com.martin.autobazar.service.impl;

import com.martin.autobazar.dto.UserDto;
import com.martin.autobazar.entity.CarListing;
import com.martin.autobazar.entity.User;
import com.martin.autobazar.mapper.UserMapper;
import com.martin.autobazar.repository.CarListingRepository;
import com.martin.autobazar.repository.UserRepository;
import com.martin.autobazar.service.UserService;
import com.martin.autobazar.service.CarsListedFeaturesService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final CarListingRepository carListingRepository;
    private final CarsListedFeaturesService carsListedFeaturesService;

    @Value("${app.upload.dir}")
    private String uploadDir;

    public UserServiceImpl(UserRepository userRepository, CarListingRepository carListingRepository, CarsListedFeaturesService carsListedFeaturesService) {
        this.userRepository = userRepository;
        this.carListingRepository = carListingRepository;
        this.carsListedFeaturesService = carsListedFeaturesService;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.toUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.toUserDto(savedUser);
    }

    @Override
    public boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    @Override
    public boolean phoneExists(String phone) {
        return userRepository.findByPhone(phone) != null;
    }

    @Override
    @Transactional
    public void deleteUser(String email) {
        // find user
        User user = userRepository.findByEmail(email);
        if (user == null) return;

        // 1) find listings for this user
        List<CarListing> listings = carListingRepository.findByUser_UserId(user.getUserId());

        // 2) for each listing delete features and files, then delete listing
        for (CarListing l : listings) {
            Long listingId = l.getListingId();
            try {
                carsListedFeaturesService.deleteByListingId(listingId);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            try {
                Path listingFolder = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(String.valueOf(listingId));
                if (Files.exists(listingFolder)) {
                    Files.walk(listingFolder)
                            .sorted((a, b) -> b.compareTo(a))
                            .map(Path::toFile)
                            .forEach(File::delete);
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            // delete listing entity
            try {
                carListingRepository.deleteById(listingId);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // 3) delete user
        userRepository.deleteByEmail(email);
    }

    @Override
    @Transactional
    public void updateUser(String email, UserDto userDto) {
        userRepository.updateUserByEmail(email, userDto.getFirstName(), userDto.getLastName(), userDto.getPhone());
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return null;
        }
        return UserMapper.toUserDto(user);
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return null;
        return UserMapper.toUserDto(user);
    }

    @Override
    public boolean validateLogin(String email, String password) {
        return userRepository.existsByEmailAndPassword(email, password);
    }
}
