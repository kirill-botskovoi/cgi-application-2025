package com.kirillbotskovoi.aircom.controller;

import com.kirillbotskovoi.aircom.dto.SigninRequestDTO;
import com.kirillbotskovoi.aircom.dto.SignupRequestDTO;
import com.kirillbotskovoi.aircom.entity.User;
import com.kirillbotskovoi.aircom.repository.UserRepository;
import com.kirillbotskovoi.aircom.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class SecurityController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;

    @Autowired
    public void setUserRepository(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
    }
    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
    }
    @Autowired
    public void setJwtUtil(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }
    @PostMapping("/signup")
    ResponseEntity<?> signup(@RequestBody SignupRequestDTO signupRequestDTO){
        if(userRepository.existsByUsername(signupRequestDTO.getUsername())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Choose different name");
        }
        if(userRepository.existsByEmail(signupRequestDTO.getEmail())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Choose different email");
        }

        userRepository.save(User.builder()
                .username(signupRequestDTO.getUsername())
                .email(signupRequestDTO.getEmail())
                .password(passwordEncoder.encode(signupRequestDTO.getPassword()))
                .build());
        return ResponseEntity.ok("Success, baby");
    }
    @PostMapping("/signin")
    ResponseEntity<?> signin(@RequestBody SigninRequestDTO signinRequestDTO){
        Authentication authentication = null;
        try{
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequestDTO.getUsername(), signinRequestDTO.getPassword()));
        } catch (BadCredentialsException e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateToken(authentication);
        return ResponseEntity.ok(jwt);
    }

}
