package com.jysoft.jyemr.repository;

import com.jysoft.jyemr.domain.KemrMedicalTreatment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the KemrMedicalTreatment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KemrMedicalTreatmentRepository extends JpaRepository<KemrMedicalTreatment, Long> {}
