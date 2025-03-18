package com.kirillbotskovoi.aircom.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;
    private Integer rowNumber;
    private Integer seatIndex;
    private boolean isOccupied;
    private String seatClass;
    private Double price;
}
