package com.martin.autobazar.service;

import com.martin.autobazar.dto.UserDto;



public interface UserService {
    UserDto createUser(UserDto userDto);
    boolean emailExists(String email);
    boolean phoneExists(String phone);
    void deleteUser(String email);
    void updateUser(String email, UserDto userDto);
    UserDto getUserByEmail(String email);
    boolean validateLogin(String email, String password);
}
