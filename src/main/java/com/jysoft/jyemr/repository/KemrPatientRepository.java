package com.jysoft.jyemr.repository;

import com.jysoft.jyemr.domain.KemrPatient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the KemrPatient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KemrPatientRepository extends JpaRepository<KemrPatient, Long> {}
