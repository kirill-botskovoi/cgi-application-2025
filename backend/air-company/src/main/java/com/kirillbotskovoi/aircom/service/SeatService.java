package com.kirillbotskovoi.aircom.service;

import com.kirillbotskovoi.aircom.dto.SeatResponseDTO;
import com.kirillbotskovoi.aircom.entity.Seat;
import com.kirillbotskovoi.aircom.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service for managing seats and their data.
 */
@Service
@RequiredArgsConstructor
public class SeatService {
    private final SeatRepository seatRepository;

    /**
     * Retrieves all seats for a specific flight by its ID.
     *
     * @param flightId the ID of the flight
     * @return a list of SeatResponseDTOs representing the seats
     */
    public List<SeatResponseDTO> getSeatsByFlightId(Long flightId) {
        List<Seat> seats = seatRepository.findByFlightId(flightId);
        return seats.stream()
                .map(seat -> SeatResponseDTO.builder()
                        .id(seat.getId())
                        .rowNumber(seat.getRowNumber())
                        .seatIndex(seat.getSeatIndex())
                        .isOccupied(seat.isOccupied())
                        .seatClass(seat.getSeatClass())
                        .price(seat.getPrice())
                        .build())
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a specific seat by its ID.
     *
     * @param seatId the ID of the seat
     * @return a SeatResponseDTO representing the seat
     */
    public SeatResponseDTO getSeatsBySeatId(Long seatId) {
        Seat seat = seatRepository.getSeatById(seatId)
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        return SeatResponseDTO.builder()
                .rowNumber(seat.getRowNumber())
                .seatIndex(seat.getSeatIndex())
                .isOccupied(seat.isOccupied())
                .seatClass(seat.getSeatClass())
                .price(seat.getPrice())
                .build();
    }

    /**
     * Retrieves the minimum and maximum seat prices for a specific flight.
     *
     * @param flightId the ID of the flight
     * @return a map containing the minimum and maximum prices
     */
    public Map<String, Double> getPriceRangeByFlightId(Long flightId) {
        Double minPrice = seatRepository.findMinPriceByFlightId(flightId);
        Double maxPrice = seatRepository.findMaxPriceByFlightId(flightId);
        return Map.of("minPrice", minPrice, "maxPrice", maxPrice);
    }
}
