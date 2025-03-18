package com.kirillbotskovoi.aircom.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SeatResponseDTO {
    private Long id;
    private Integer rowNumber;
    private Integer seatIndex;
    private Boolean isOccupied;
    private String seatClass;
    private Double price;
}
