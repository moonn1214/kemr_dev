package com.jysoft.jyemr.repository;

import com.jysoft.jyemr.domain.KemrMedicalBill;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the KemrMedicalBill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KemrMedicalBillRepository extends JpaRepository<KemrMedicalBill, Long> {}
