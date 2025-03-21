package com.kirillbotskovoi.aircom.util;

import com.kirillbotskovoi.aircom.entity.Flight;
import com.kirillbotskovoi.aircom.entity.Seat;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class SeatGenerator {

    @Value("${seat.rows.min}")
    private int minRows;

    @Value("${seat.rows.max}")
    private int maxRows;

    @Value("${seat.perRow.min}")
    private int minSeatsPerRow;

    @Value("${seat.perRow.max}")
    private int maxSeatsPerRow;

    @Value("${seat.occupancy.min}")
    private double minOccupancy;

    @Value("${seat.occupancy.max}")
    private double maxOccupancy;

    @Value("${seat.firstClassRatio}")
    private double firstClassRatio;

    @Value("${seat.businessClassRatio}")
    private double businessClassRatio;

    @Value("${seat.economyClassRatio}")
    private double economyClassRatio;

    @Value("${seat.basePrice.min}")
    private int seatMinPrice;

    @Value("${seat.basePrice.max}")
    private int seatMaxPrice;

    @Value("${seat.priceMultiplier.economy}")
    private double economyMultiplier;

    @Value("${seat.priceMultiplier.business}")
    private double businessMultiplier;

    @Value("${seat.priceMultiplier.first}")
    private double firstClassMultiplier;

    private final Random random = new Random();

    public List<Seat> generateSeats(Flight flight) {
        List<Seat> seats = new ArrayList<>();
        int totalRows = random.nextInt(maxRows - minRows + 1) + minRows;
        int seatsPerRow = (random.nextInt((maxSeatsPerRow - minSeatsPerRow) / 2 + 1) * 2) + minSeatsPerRow;

        int firstClassRows = (int) (totalRows * firstClassRatio);
        int businessClassRows = (int) (totalRows * businessClassRatio);

        double rawOccupancyRate = minOccupancy + (maxOccupancy - minOccupancy) * random.nextDouble();
        int occupancyRate = (int) Math.round(rawOccupancyRate * 100);

        int totalSeats = totalRows * seatsPerRow;
        int occupiedSeatsCount = (int) Math.round((occupancyRate / 100.0) * totalSeats);

        List<Boolean> occupancyList = new ArrayList<>(Collections.nCopies(occupiedSeatsCount, true));
        occupancyList.addAll(Collections.nCopies(totalSeats - occupiedSeatsCount, false));
        Collections.shuffle(occupancyList, random);

        int seatIndex = 0;
        int basePrice = random.nextInt(seatMaxPrice - seatMinPrice + 1) + seatMinPrice;

        for (int row = 1; row <= totalRows; row++) {
            String seatClass;
            double priceMultiplier;
            if (row <= firstClassRows) {
                seatClass = "FIRST_CLASS";
                priceMultiplier = firstClassMultiplier;
            } else if (row <= firstClassRows + businessClassRows) {
                seatClass = "BUSINESS_CLASS";
                priceMultiplier = businessMultiplier;
            } else {
                seatClass = "ECONOMY_CLASS";
                priceMultiplier = economyMultiplier;
            }

            for (int seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                boolean isOccupied = occupancyList.get(seatIndex++);
                double seatPrice = (double) basePrice * priceMultiplier;

                seats.add(Seat.builder()
                        .rowNumber(row)
                        .seatIndex(seatNum)
                        .isOccupied(isOccupied)
                        .seatClass(seatClass)
                        .price(seatPrice)
                        .flight(flight)
                        .build());
            }
        }
        return seats;
    }
}
