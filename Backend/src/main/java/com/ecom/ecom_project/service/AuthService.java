package com.ecom.ecom_project.service;

import com.ecom.ecom_project.model.User;
import com.ecom.ecom_project.repo.UserRepo;
import com.ecom.ecom_project.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    // SIGNUP
    public String signup(User user) {

        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists";
        }

        userRepo.save(user);
        return "Signup successful";
    }

    // LOGIN
    public String login(User user) {

        User existingUser = userRepo.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!existingUser.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(existingUser.getEmail());
    }
}