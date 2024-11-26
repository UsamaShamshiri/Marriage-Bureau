package com.Mughal.Mughal_Marriage_Bureau.controller;

import com.Mughal.Mughal_Marriage_Bureau.model.User;
import com.Mughal.Mughal_Marriage_Bureau.security.JwtUtil;
import com.Mughal.Mughal_Marriage_Bureau.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("auth/signup")

    public ResponseEntity<String> signup(@RequestBody User user) {
        userService.registerUser(user);
        return ResponseEntity.ok("User created successfully");
    }
    @PostMapping("auth/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> loginDto) {
        String username = loginDto.get("username");
        String password = loginDto.get("password");

        Optional<User> userOptional = userService.getUserByUsername(username);

        if (userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword())) {
            User user = userOptional.get();
            List<String> roles = user.getRoles();
            String id = user.getId();
            String token = jwtUtil.generateToken(username, roles);


            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("roles", roles);
            response.put("userId",id);
            return ResponseEntity.ok(response);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }


}





