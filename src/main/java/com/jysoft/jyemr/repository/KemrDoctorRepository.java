package com.jysoft.jyemr.repository;

import com.jysoft.jyemr.domain.KemrDoctor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the KemrDoctor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KemrDoctorRepository extends JpaRepository<KemrDoctor, Long> {}
