package com.kirillbotskovoi.aircom.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BookingResponseDTO {
   private String flightNumber;
   private String user;
   private Integer seatIndex;
   private Integer seatRow;
   private String seatClass;
   private Double price;
}