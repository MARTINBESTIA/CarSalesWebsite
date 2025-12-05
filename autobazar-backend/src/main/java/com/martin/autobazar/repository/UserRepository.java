package com.martin.autobazar.repository;

import com.martin.autobazar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User save(User user);
    public User findByEmail(String email);
    public User findByUsername(String username);
}
