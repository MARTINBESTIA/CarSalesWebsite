package com.martin.autobazar.controller;

import com.martin.autobazar.dto.UserDto;
import com.martin.autobazar.entity.User;
import com.martin.autobazar.mapper.UserMapper;
import com.martin.autobazar.repository.UserRepository;
import com.martin.autobazar.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto savedUserDto = userService.createUser(userDto);
        return new ResponseEntity<>(savedUserDto, HttpStatus.CREATED);
    }
    @GetMapping("/email-exists")
    public boolean emailExists(@RequestParam String email) {
        return userService.emailExists(email);
    }
    @GetMapping("/phone-exists")
    public boolean phoneExists(@RequestParam String phone) {
        return userService.phoneExists(phone);
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        UserDto userDto = userService.getUserByEmail(email);
        if (userDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userDto.setPassword("");
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        userService.deleteUser(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{email}")
    public ResponseEntity<Void> updateUser(@PathVariable String email, @RequestBody UserDto userDto) {
        userService.updateUser(email, userDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody UserDto userDto) {
        boolean valid = userService.validateLogin(userDto.getEmail(), userDto.getPassword());
        if (valid) {
            return ResponseEntity.ok(true);
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        // Use repository + mapper to retrieve user by id
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        UserDto dto = UserMapper.toUserDto(user);
        dto.setPassword("");
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
