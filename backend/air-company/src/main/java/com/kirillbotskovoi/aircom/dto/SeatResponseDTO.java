package com.kirillbotskovoi.aircom.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SeatResponseDTO {
    private Long id;
    private String seatNumber;
    private boolean isOccupied;
    private String seatClass;
}
