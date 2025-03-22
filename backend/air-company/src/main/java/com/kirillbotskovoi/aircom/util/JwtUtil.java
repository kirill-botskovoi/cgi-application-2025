package com.kirillbotskovoi.aircom.util;

import com.kirillbotskovoi.aircom.entity.UserDetailsImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * Utility class for handling JWT token generation and parsing.
 */
@Component
public class JwtUtil {
    @Value("${aircom.app.secret}")
    private String secret;

    @Value("${aircom.app.lifetime}")
    private int lifetime;

    /**
     * Generates a JWT token for an authenticated user.
     *
     * @param authentication the Authentication object containing user details.
     * @return a generated JWT token.
     */
    public String generateToken(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("email", userDetails.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + lifetime))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the email address from the given JWT token.
     *
     * @param token the JWT token.
     * @return the email address associated with the token.
     */
    public String getEmailFromJwt(String token) {
        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build();

        Claims claims = jwtParser.parseClaimsJws(token).getBody();
        return claims.get("email", String.class);
    }

    /**
     * Extracts the username (subject) from the given JWT token.
     *
     * @param token the JWT token.
     * @return the username (subject) associated with the token.
     */
    public String getNameFromJwt(String token) {
        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build();

        Claims claims = jwtParser.parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    /**
     * Generates a signing key for JWT token signing.
     *
     * @return the signing key.
     */
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }
}
