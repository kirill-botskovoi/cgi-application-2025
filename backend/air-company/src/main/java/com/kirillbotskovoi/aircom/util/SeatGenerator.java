package com.kirillbotskovoi.aircom.util;

import com.kirillbotskovoi.aircom.entity.Flight;
import com.kirillbotskovoi.aircom.entity.Seat;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class SeatGenerator {
    public List<Seat> generateSeats(Flight flight) {
        List<Seat> seats = new ArrayList<>();
        Random random = new Random();

        int firstClassRows = 5;
        int businessClassRows = 10;
        int economyClassRows = 15;

        int seatsPerRow = 6;

        for (int row = 1; row <= firstClassRows + businessClassRows + economyClassRows; row++) {
            String seatClass;
            if (row <= firstClassRows) {
                seatClass = "FIRST_CLASS";
            } else if (row <= firstClassRows + businessClassRows) {
                seatClass = "BUSINESS_CLASS";
            } else {
                seatClass = "ECONOMY_CLASS";
            }

            for (char seat = 'A'; seat < 'A' + seatsPerRow; seat++) {
                boolean isOccupied = random.nextDouble() < 0.3;

                seats.add(Seat.builder()
                        .seatNumber(row + "" + seat)
                        .isOccupied(isOccupied)
                        .seatClass(seatClass)
                        .flight(flight)
                        .build());
            }
        }
        return seats;
    }

}
