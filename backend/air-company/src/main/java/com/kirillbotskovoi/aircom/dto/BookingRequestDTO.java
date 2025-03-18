package com.kirillbotskovoi.aircom.dto;

import lombok.Data;

@Data
public class BookingRequestDTO {
    private Long userId;
    private Long flightId;
    private Long seatId;
}
