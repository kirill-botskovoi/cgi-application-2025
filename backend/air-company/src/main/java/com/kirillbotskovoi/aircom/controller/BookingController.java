package com.kirillbotskovoi.aircom.controller;

import com.kirillbotskovoi.aircom.entity.Booking;
import com.kirillbotskovoi.aircom.service.BookingService;
import com.kirillbotskovoi.aircom.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Long seatId, HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Token not provided");
        }

        String email = jwtUtil.getEmailFromJwt(token.substring(7));
        if (email == null) {
            return ResponseEntity.status(403).body("Wrong token");
        } else{
            System.out.println("EMAIL from jwt: " + email);
        }

        try {
            Booking booking = bookingService.createBooking(email, seatId);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getUserBookings(HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(null);
        }

        String email = jwtUtil.getEmailFromJwt(token.substring(7));
        if (email == null) {
            return ResponseEntity.status(403).body(null);
        }

        List<Booking> bookings = bookingService.getUserBookings(email);
        return ResponseEntity.ok(bookings);
    }
}

