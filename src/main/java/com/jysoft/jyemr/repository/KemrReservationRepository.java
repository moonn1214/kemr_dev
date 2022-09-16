package com.jysoft.jyemr.repository;

import com.jysoft.jyemr.domain.KemrReservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the KemrReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KemrReservationRepository extends JpaRepository<KemrReservation, Long> {}
