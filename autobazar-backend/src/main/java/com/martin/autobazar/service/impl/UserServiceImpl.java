package com.martin.autobazar.service.impl;

import com.martin.autobazar.dto.UserDto;
import com.martin.autobazar.entity.User;
import com.martin.autobazar.mapper.UserMapper;
import com.martin.autobazar.repository.UserRepository;
import com.martin.autobazar.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
}
