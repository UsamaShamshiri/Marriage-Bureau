package com.Mughal.Mughal_Marriage_Bureau.service;

import com.Mughal.Mughal_Marriage_Bureau.model.User;
import com.Mughal.Mughal_Marriage_Bureau.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("User already exists!");
        }



        // First signup becomes admin, others will be users
        if (!userRepository.existsByRolesContaining("ROLE_ADMIN")) {
            user.setRoles(Collections.singletonList("ROLE_ADMIN")); // Assign admin role if none exists
        } else {
            user.setRoles(Collections.singletonList("ROLE_USER")); // Assign user role otherwise
        }
        user.setUsername(user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEmail(user.getEmail());
        return userRepository.save(user);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
