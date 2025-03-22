package com.kirillbotskovoi.aircom.controller;

import com.kirillbotskovoi.aircom.dto.SeatResponseDTO;
import com.kirillbotskovoi.aircom.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * REST controller for managing seats.
 */
@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {
    private final SeatService seatService;

    /**
     * Retrieves a list of seats for a specific flight.
     *
     * @param flightId the ID of the flight.
     * @return a list of SeatResponseDTO for the given flight.
     */
    @GetMapping("/flight/{flightId}")
    public ResponseEntity<List<SeatResponseDTO>> getSeatsByFlight(@PathVariable Long flightId) {
        return ResponseEntity.ok(seatService.getSeatsByFlightId(flightId));
    }

    /**
     * Retrieves seat details by seat ID.
     *
     * @param seatId the ID of the seat.
     * @return a SeatResponseDTO containing seat details.
     */    @GetMapping("/{seatId}")
    public ResponseEntity<SeatResponseDTO> getSeatById(@PathVariable Long seatId){
        return ResponseEntity.ok(seatService.getSeatsBySeatId(seatId));
    }

    /**
     * Retrieves the price range of seats for a specific flight.
     *
     * @param flightId the ID of the flight.
     * @return a map containing the minimum and maximum seat prices.
     */
    @GetMapping("/flight/{flightId}/price-range")
    public ResponseEntity<Map<String, Double>> getPriceRange(@PathVariable Long flightId) {
        return ResponseEntity.ok(seatService.getPriceRangeByFlightId(flightId));
    }
}
