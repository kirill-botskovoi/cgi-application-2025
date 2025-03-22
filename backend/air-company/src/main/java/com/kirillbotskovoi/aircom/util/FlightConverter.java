package com.kirillbotskovoi.aircom.util;

import com.kirillbotskovoi.aircom.dto.FlightResponseDTO;
import com.kirillbotskovoi.aircom.entity.Flight;
import com.kirillbotskovoi.aircom.entity.Seat;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Converter for transforming Flight objects into FlightResponseDTO.
 */
@Component
public class FlightConverter {

    /**
     * Converts a Flight object to FlightResponseDTO.
     *
     * @param flight the flight to be converted.
     * @return a FlightResponseDTO containing flight details.
     */
    public FlightResponseDTO convertToDto(Flight flight) {
        List<Long> seatIds = flight.getSeats().stream()
                .map(Seat::getId)
                .collect(Collectors.toList());

        return FlightResponseDTO.builder()
                .id(flight.getId())
                .flightNumber(flight.getFlightNumber())
                .departureAirport(flight.getDepartureAirport())
                .arrivalAirport(flight.getArrivalAirport())
                .departureTime(flight.getDepartureTime())
                .arrivalTime(flight.getArrivalTime())
                .seatIds(seatIds)
                .build();
    }
}
