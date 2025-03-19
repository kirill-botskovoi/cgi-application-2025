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

@RestController
@RequestMapping("/api/flights")
@RequiredArgsConstructor
public class FlightController {
    private final FlightService flightService;

    @GetMapping
    public ResponseEntity<List<FlightResponseDTO>> getFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    @PostMapping("/fetch")
    public ResponseEntity<String> fetchFlights() {
        flightService.fetchAndSaveFlights();
        return ResponseEntity.ok("Flights successfully fetched!");
    }

    @PostMapping("/generateSeats")
    public ResponseEntity<String> generateSeats() {
        flightService.generateSeats(flightService.getAllFlightsNoDto());
        return ResponseEntity.ok("Seats successfully generated!");
    }

}
