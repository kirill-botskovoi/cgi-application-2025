package com.kirillbotskovoi.aircom.controller;

import com.kirillbotskovoi.aircom.entity.User;
import com.kirillbotskovoi.aircom.repository.UserRepository;
import com.kirillbotskovoi.aircom.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing user information.
 */
@RestController
@RequestMapping("api/users")
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public UserController(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    /**
     * Retrieves information about the authenticated user.
     *
     * @param request the HTTP request containing the authorization header.
     * @return user information or an error message if the user is not found.
     */
    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("No token provided");
        }
        String token = authHeader.substring(7);
        String email = jwtUtil.getEmailFromJwt(token);
        if (email == null) {
            return ResponseEntity.status(403).body("Invalid token");
        }
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok(user);
    }
}
