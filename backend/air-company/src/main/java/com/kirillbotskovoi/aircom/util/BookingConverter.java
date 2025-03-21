package com.kirillbotskovoi.aircom.util;

import com.kirillbotskovoi.aircom.dto.BookingResponseDTO;
import com.kirillbotskovoi.aircom.entity.Booking;
import org.springframework.stereotype.Component;

@Component
public class BookingConverter {

   public BookingResponseDTO convertToDto(Booking booking) {
      return BookingResponseDTO.builder()
            .flightNumber(booking.getFlight().getFlightNumber())
            .user(booking.getUser().getUsername())
            .seatIndex(booking.getSeat().getSeatIndex())
            .seatRow(booking.getSeat().getRowNumber())
            .seatClass(booking.getSeat().getSeatClass())
            .price(booking.getSeat().getPrice())
            .build();
   }
}
