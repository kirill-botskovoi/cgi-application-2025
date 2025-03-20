package com.kirillbotskovoi.aircom.repository;

import com.kirillbotskovoi.aircom.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByFlightId(Long flightId);
    Optional<Seat> getSeatById(Long seatId);

    @Query("SELECT MIN(s.price) FROM Seat s WHERE s.flight.id = :flightId")
    Double findMinPriceByFlightId(@Param("flightId") Long flightId);

    @Query("SELECT MAX(s.price) FROM Seat s WHERE s.flight.id = :flightId")
    Double findMaxPriceByFlightId(@Param("flightId") Long flightId);
}