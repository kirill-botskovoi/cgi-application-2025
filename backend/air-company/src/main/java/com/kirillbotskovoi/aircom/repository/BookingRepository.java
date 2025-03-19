package com.kirillbotskovoi.aircom.repository;

import com.kirillbotskovoi.aircom.entity.Booking;
import com.kirillbotskovoi.aircom.entity.Seat;
import com.kirillbotskovoi.aircom.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findBySeat(Seat seat);
    List<Booking> findByUser(User user);
}
