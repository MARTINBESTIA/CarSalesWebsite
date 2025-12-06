package com.martin.autobazar.repository;

import com.martin.autobazar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User save(User user);
    public User findByEmail(String email);
    public User findByPhone(String phone);
    public void deleteByEmail(String email);

    @Modifying
    @Query("UPDATE User u SET u.firstName = :firstName, u.lastName = :lastName, u.phone = :phone WHERE u.email = :email")
    void updateUserByEmail(@Param("email") String email, @Param("firstName") String firstName, @Param("lastName") String lastName, @Param("phone") String phone);
}
