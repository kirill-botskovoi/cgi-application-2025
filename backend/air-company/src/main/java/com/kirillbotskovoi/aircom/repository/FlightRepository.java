package com.kirillbotskovoi.aircom.repository;

import com.kirillbotskovoi.aircom.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
}
