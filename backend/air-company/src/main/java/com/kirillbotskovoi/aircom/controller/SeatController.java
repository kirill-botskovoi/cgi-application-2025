package com.kirillbotskovoi.aircom.controller;

import com.kirillbotskovoi.aircom.dto.SeatResponseDTO;
import com.kirillbotskovoi.aircom.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {
    private final SeatService seatService;

    @GetMapping("/flight/{flightId}")
    public ResponseEntity<List<SeatResponseDTO>> getSeatsByFlight(@PathVariable Long flightId) {
        return ResponseEntity.ok(seatService.getSeatsByFlightId(flightId));
    }
}
