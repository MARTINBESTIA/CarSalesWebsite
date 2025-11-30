package com.martin.autobazar.mapper;

import com.martin.autobazar.dto.UserDto;
import com.martin.autobazar.entity.User;


public class UserMapper {

    public static UserDto toUserDto(User user) {
        return new UserDto(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhone(),
                user.getPassword()
        );
    }

    public static User toUser(UserDto userDto) {
        return new User(
                userDto.getUserId(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getEmail(),
                userDto.getPhone(),
                userDto.getPassword()
        );
    }
}
