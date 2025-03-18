package com.kirillbotskovoi.aircom.service;

import com.kirillbotskovoi.aircom.entity.*;
import com.kirillbotskovoi.aircom.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final SeatRepository seatRepository;
    private final FlightRepository flightRepository;

    @Transactional
    public Booking createBooking(String email, Long seatId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        Seat seat = seatRepository.findById(seatId)
                .orElseThrow(() -> new RuntimeException("Место не найдено"));

        Optional<Booking> existingBooking = bookingRepository.findBySeat(seat);
        if (existingBooking.isPresent()) {
            throw new RuntimeException("Место уже забронировано");
        }

        Booking booking = Booking.builder()
                .user(user)
                .seat(seat)
                .flight(seat.getFlight())
                .build();

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        return bookingRepository.findByUser(user);
    }
}
