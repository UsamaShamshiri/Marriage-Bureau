package com.Mughal.Mughal_Marriage_Bureau.repository;

import com.Mughal.Mughal_Marriage_Bureau.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User findByRolesContaining(String role);
    boolean existsByRolesContaining(String role);
}



