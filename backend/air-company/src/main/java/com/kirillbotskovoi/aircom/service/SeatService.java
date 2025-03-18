package com.kirillbotskovoi.aircom.service;

import com.kirillbotskovoi.aircom.dto.SeatResponseDTO;
import com.kirillbotskovoi.aircom.entity.Seat;
import com.kirillbotskovoi.aircom.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeatService {
    private final SeatRepository seatRepository;

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

    public SeatResponseDTO getSeatsBySeatId(Long seatId) {
        Seat seat = seatRepository.getSeatById(seatId);
        return SeatResponseDTO.builder()
                .rowNumber(seat.getRowNumber())
                .seatIndex(seat.getSeatIndex())
                .isOccupied(seat.isOccupied())
                .seatClass(seat.getSeatClass())
                .price(seat.getPrice())
                .build();
    }
}
