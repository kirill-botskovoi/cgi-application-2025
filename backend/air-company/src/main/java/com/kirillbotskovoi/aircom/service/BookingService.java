package com.kirillbotskovoi.aircom.service;

import com.kirillbotskovoi.aircom.dto.BookingResponseDTO;
import com.kirillbotskovoi.aircom.entity.Booking;
import com.kirillbotskovoi.aircom.entity.Seat;
import com.kirillbotskovoi.aircom.entity.User;
import com.kirillbotskovoi.aircom.repository.BookingRepository;
import com.kirillbotskovoi.aircom.repository.FlightRepository;
import com.kirillbotskovoi.aircom.repository.SeatRepository;
import com.kirillbotskovoi.aircom.repository.UserRepository;
import com.kirillbotskovoi.aircom.util.BookingConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final SeatRepository seatRepository;
    private final FlightRepository flightRepository;
    private final BookingConverter bookingConverter;

    public Booking createBooking(String email, Long seatId) {
        User user = userRepository.findByEmail(email)
              .orElseThrow(() -> new RuntimeException("User not found"));

        Seat seat = seatRepository.findById(seatId)
              .orElseThrow(() -> new RuntimeException("Seat not found"));

        Optional<Booking> existingBooking = bookingRepository.findBySeat(seat);
        if (existingBooking.isPresent()) {
            throw new RuntimeException("Seat already booked");
        }

        seat.setOccupied(true);

        return bookingRepository.save(
              Booking.builder()
                    .user(user)
                    .seat(seat)
                    .flight(seat.getFlight())
                    .build()
        );
    }

    public List<BookingResponseDTO> getUserBookings(String email) {
        User user = userRepository.findByEmail(email)
              .orElseThrow(() -> new RuntimeException("User not found"));

        List<Booking> bookings = bookingRepository.findByUser(user);

        return bookings.stream()
              .map(bookingConverter::convertToDto)
              .toList();
    }
}

