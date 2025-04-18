package com.kirillbotskovoi.aircom.service;

import com.kirillbotskovoi.aircom.dto.FlightResponseDTO;
import com.kirillbotskovoi.aircom.entity.Flight;
import com.kirillbotskovoi.aircom.repository.BookingRepository;
import com.kirillbotskovoi.aircom.repository.FlightRepository;
import com.kirillbotskovoi.aircom.repository.SeatRepository;
import com.kirillbotskovoi.aircom.util.FlightConverter;
import com.kirillbotskovoi.aircom.util.SeatGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service for managing flights and their related operations.
 */
@Service
@RequiredArgsConstructor
public class FlightService {
    private final FlightRepository flightRepository;
    private final BookingRepository bookingRepository;
    private final SeatRepository seatRepository;
    private final FlightConverter flightConverter;
    private final RestTemplate restTemplate;
    private final SeatGenerator seatGenerator;
    @Value("${aviationstack.api.key}")
    private String apiKey;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    /**
     * Fetches flight data from an external API and saves it to the database.
     */
    public void fetchAndSaveFlights() {
        String url = "http://api.aviationstack.com/v1/flights?access_key=" + apiKey;
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        if (response == null || !response.containsKey("data")) {
            throw new RuntimeException("API fetch error");
        }
        List<Map<String, Object>> flightsData = (List<Map<String, Object>>) response.get("data");
        for (Map<String, Object> flightData : flightsData) {
            try {
                String flightNumber = (String) ((Map<String, Object>) flightData.get("flight")).get("iata");
                String departureAirport = (String) ((Map<String, Object>) flightData.get("departure")).get("iata");
                String arrivalAirport = (String) ((Map<String, Object>) flightData.get("arrival")).get("iata");

                String departureTimeStr = (String) ((Map<String, Object>) flightData.get("departure")).get("scheduled");
                String arrivalTimeStr = (String) ((Map<String, Object>) flightData.get("arrival")).get("scheduled");

                LocalDateTime departureTime = departureTimeStr != null ? LocalDateTime.parse(departureTimeStr, FORMATTER) : null;
                LocalDateTime arrivalTime = arrivalTimeStr != null ? LocalDateTime.parse(arrivalTimeStr, FORMATTER) : null;

                Flight flight = Flight.builder()
                        .flightNumber(flightNumber)
                        .departureAirport(departureAirport)
                        .arrivalAirport(arrivalAirport)
                        .departureTime(departureTime)
                        .arrivalTime(arrivalTime)
                        .seats(null)
                        .build();

                flight.setSeats(seatGenerator.generateSeats(flight));

                flightRepository.save(flight);
            } catch (Exception e) {
                System.err.println("Error processing the flight:  " + e.getMessage());
            }
        }
    }

    public void generateSeats(List<Flight> flights){
        SeatGenerator seatGenerator = new SeatGenerator();
        for (Flight flight : flights) {
            flight.setSeats(seatGenerator.generateSeats(flight));
        }
    }

    public void resetTables() {
        bookingRepository.deleteAll();
        seatRepository.deleteAll();
        flightRepository.deleteAll();
    }


    public List<FlightResponseDTO> getAllFlights() {
        return flightRepository.findAll().stream()
                .map(flightConverter::convertToDto)
                .collect(Collectors.toList());
    }

    public List<Flight> getAllFlightsNoDto() {
        return new ArrayList<>(flightRepository.findAll());
    }
}
