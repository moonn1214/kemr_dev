package com.jysoft.jyemr.repository;

import com.jysoft.jyemr.domain.KemrMedicine;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the KemrMedicine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KemrMedicineRepository extends JpaRepository<KemrMedicine, Long> {}
