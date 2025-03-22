package com.kirillbotskovoi.aircom.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * REST controller for handling secured access endpoints.
 */
@RestController
@RequestMapping("/secured")
public class MainController {

    /**
     * Retrieves the username of the authenticated user.
     *
     * @param principal the authenticated user's principal.
     * @return the username of the authenticated user, or null if not authenticated.
     */
    @GetMapping("/user")
    public String userAccess(Principal principal){
        if (principal == null){
            return null;
        }
        return principal.getName();
    }
}
