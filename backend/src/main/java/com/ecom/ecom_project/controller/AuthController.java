package com.ecom.ecom_project.controller;

import com.ecom.ecom_project.model.User;
import com.ecom.ecom_project.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    // SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        String response = authService.signup(user);
        return ResponseEntity.ok(response);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        String token = authService.login(user);
        return ResponseEntity.ok(token);
    }
//
//    // LOGOUT (frontend handles it)
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout() {
//        return ResponseEntity.ok("Logged out successfully");
//    }
}