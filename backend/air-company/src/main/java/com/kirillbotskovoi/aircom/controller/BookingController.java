package com.kirillbotskovoi.aircom.controller;

import com.kirillbotskovoi.aircom.dto.BookingRequestDTO;
import com.kirillbotskovoi.aircom.entity.Booking;
import com.kirillbotskovoi.aircom.service.BookingService;
import com.kirillbotskovoi.aircom.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequestDTO request, HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Токен не предоставлен");
        }

        String email = jwtUtil.getEmailFromJwt(token.substring(7));
        if (email == null) {
            return ResponseEntity.status(403).body("Неверный токен");
        }

        if (request.getSeatId() == null) {
            return ResponseEntity.badRequest().body("Некорректный seatId");
        }

        try {
            Booking booking = bookingService.createBooking(email, request.getSeatId());
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

    @PostMapping("/bulk")
    public ResponseEntity<?> createMultipleBookings(@RequestBody List<BookingRequestDTO> requests, HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Токен не предоставлен");
        }

        String email = jwtUtil.getEmailFromJwt(token.substring(7));
        if (email == null) {
            return ResponseEntity.status(403).body("Неверный токен");
        }

        List<Booking> bookings = new ArrayList<>();
        for (BookingRequestDTO request : requests) {
            if (request.getSeatId() == null) {
                return ResponseEntity.badRequest().body("Некорректный seatId");
            }

            try {
                Booking booking = bookingService.createBooking(email, request.getSeatId());
                bookings.add(booking);
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body("Ошибка при бронировании: " + e.getMessage());
            }
        }

        return ResponseEntity.ok(bookings);
    }
}

