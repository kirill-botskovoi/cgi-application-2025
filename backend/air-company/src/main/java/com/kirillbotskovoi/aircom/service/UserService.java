package com.kirillbotskovoi.aircom.service;

import com.kirillbotskovoi.aircom.entity.User;
import com.kirillbotskovoi.aircom.entity.UserDetailsImpl;
import com.kirillbotskovoi.aircom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service for managing user-related operations.
 */
@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;

    /**
     * Sets the UserRepository dependency.
     *
     * @param userRepository the UserRepository to set
     */
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Loads a user by username and returns their details.
     *
     * @param username the username of the user
     * @return UserDetails containing the user's information
     * @throws UsernameNotFoundException if the user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                String.format("User '%s' not found", username)
        ));
        return new UserDetailsImpl(user.getId(), user.getUsername(), user.getEmail(), user.getPassword());
    }
}