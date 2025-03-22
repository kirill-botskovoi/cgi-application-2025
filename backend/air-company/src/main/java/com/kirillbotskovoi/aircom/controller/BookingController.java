package com.kirillbotskovoi.aircom.controller;

import com.kirillbotskovoi.aircom.dto.BookingResponseDTO;
import com.kirillbotskovoi.aircom.entity.Booking;
import com.kirillbotskovoi.aircom.service.BookingService;
import com.kirillbotskovoi.aircom.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing bookings.
 */
@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final JwtUtil jwtUtil;

    /**
     * Creates a new booking for a user based on the provided seat ID.
     *
     * @param seatId the ID of the seat to be booked.
     * @param httpRequest the HTTP request containing the authorization header.
     * @return the created Booking or an error message if the booking fails.
     */
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Long seatId, HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Token not provided");
        }
        String email = jwtUtil.getEmailFromJwt(token.substring(7));
        if (email == null) {
            return ResponseEntity.status(403).body("Wrong token");
        }
        try {
            Booking booking = bookingService.createBooking(email, seatId);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Retrieves all bookings for the authenticated user.
     *
     * @param httpRequest the HTTP request containing the authorization header.
     * @return a list of BookingResponseDTO for the user.
     */
    @GetMapping
    public ResponseEntity<List<BookingResponseDTO>> getUserBookings(HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(null);
        }
        String email = jwtUtil.getEmailFromJwt(token.substring(7));
        if (email == null) {
            return ResponseEntity.status(403).body(null);
        }
        List<BookingResponseDTO> bookings = bookingService.getUserBookings(email);
        return ResponseEntity.ok(bookings);
    }
}

