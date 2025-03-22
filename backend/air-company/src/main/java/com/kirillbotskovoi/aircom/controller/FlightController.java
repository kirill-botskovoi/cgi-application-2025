package com.kirillbotskovoi.aircom.controller;

import com.kirillbotskovoi.aircom.dto.FlightResponseDTO;
import com.kirillbotskovoi.aircom.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller for managing flights.
 */
@RestController
@RequestMapping("/api/flights")
@RequiredArgsConstructor
public class FlightController {
    private final FlightService flightService;

    /**
     * Retrieves all available flights.
     *
     * @return a list of FlightResponseDTO.
     */
    @GetMapping
    public ResponseEntity<List<FlightResponseDTO>> getFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    /**
     * Fetches and saves flights from an external source.
     *
     * @return a success message.
     */
    @PostMapping("/fetch")
    public ResponseEntity<String> fetchFlights() {
        flightService.fetchAndSaveFlights();
        return ResponseEntity.ok("Flights successfully fetched!");
    }

    /**
     * Generates seats for all flights in the system.
     *
     * @return a success message.
     */
    @PostMapping("/generateSeats")
    public ResponseEntity<String> generateSeats() {
        flightService.generateSeats(flightService.getAllFlightsNoDto());
        return ResponseEntity.ok("Seats successfully generated!");
    }

    /**
     * Resets the database by deleting all flights, bookings, and seats.
     *
     * @return a success message.
     */
    @PostMapping("/reset")
    public ResponseEntity<String> resetTables() {
        flightService.resetTables();
        return ResponseEntity.ok("All bookings, seats, and flights have been successfully deleted.");
    }
}
