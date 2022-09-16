package com.jysoft.jyemr.web.rest;

import com.jysoft.jyemr.domain.KemrMedicalBill;
import com.jysoft.jyemr.repository.KemrMedicalBillRepository;
import com.jysoft.jyemr.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.jysoft.jyemr.domain.KemrMedicalBill}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KemrMedicalBillResource {

    private final Logger log = LoggerFactory.getLogger(KemrMedicalBillResource.class);

    private static final String ENTITY_NAME = "kemrMedicalBill";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KemrMedicalBillRepository kemrMedicalBillRepository;

    public KemrMedicalBillResource(KemrMedicalBillRepository kemrMedicalBillRepository) {
        this.kemrMedicalBillRepository = kemrMedicalBillRepository;
    }

    /**
     * {@code POST  /kemr-medical-bills} : Create a new kemrMedicalBill.
     *
     * @param kemrMedicalBill the kemrMedicalBill to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kemrMedicalBill, or with status {@code 400 (Bad Request)} if the kemrMedicalBill has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kemr-medical-bills")
    public ResponseEntity<KemrMedicalBill> createKemrMedicalBill(@Valid @RequestBody KemrMedicalBill kemrMedicalBill)
        throws URISyntaxException {
        log.debug("REST request to save KemrMedicalBill : {}", kemrMedicalBill);
        if (kemrMedicalBill.getId() != null) {
            throw new BadRequestAlertException("A new kemrMedicalBill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KemrMedicalBill result = kemrMedicalBillRepository.save(kemrMedicalBill);
        return ResponseEntity
            .created(new URI("/api/kemr-medical-bills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kemr-medical-bills/:id} : Updates an existing kemrMedicalBill.
     *
     * @param id the id of the kemrMedicalBill to save.
     * @param kemrMedicalBill the kemrMedicalBill to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrMedicalBill,
     * or with status {@code 400 (Bad Request)} if the kemrMedicalBill is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kemrMedicalBill couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kemr-medical-bills/{id}")
    public ResponseEntity<KemrMedicalBill> updateKemrMedicalBill(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody KemrMedicalBill kemrMedicalBill
    ) throws URISyntaxException {
        log.debug("REST request to update KemrMedicalBill : {}, {}", id, kemrMedicalBill);
        if (kemrMedicalBill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrMedicalBill.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrMedicalBillRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KemrMedicalBill result = kemrMedicalBillRepository.save(kemrMedicalBill);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrMedicalBill.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kemr-medical-bills/:id} : Partial updates given fields of an existing kemrMedicalBill, field will ignore if it is null
     *
     * @param id the id of the kemrMedicalBill to save.
     * @param kemrMedicalBill the kemrMedicalBill to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrMedicalBill,
     * or with status {@code 400 (Bad Request)} if the kemrMedicalBill is not valid,
     * or with status {@code 404 (Not Found)} if the kemrMedicalBill is not found,
     * or with status {@code 500 (Internal Server Error)} if the kemrMedicalBill couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kemr-medical-bills/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KemrMedicalBill> partialUpdateKemrMedicalBill(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody KemrMedicalBill kemrMedicalBill
    ) throws URISyntaxException {
        log.debug("REST request to partial update KemrMedicalBill partially : {}, {}", id, kemrMedicalBill);
        if (kemrMedicalBill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrMedicalBill.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrMedicalBillRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KemrMedicalBill> result = kemrMedicalBillRepository
            .findById(kemrMedicalBill.getId())
            .map(existingKemrMedicalBill -> {
                if (kemrMedicalBill.getKemrMedicalBillTotal() != null) {
                    existingKemrMedicalBill.setKemrMedicalBillTotal(kemrMedicalBill.getKemrMedicalBillTotal());
                }
                if (kemrMedicalBill.getKemrMedicalBillNhsShare() != null) {
                    existingKemrMedicalBill.setKemrMedicalBillNhsShare(kemrMedicalBill.getKemrMedicalBillNhsShare());
                }
                if (kemrMedicalBill.getKemrMedicalBillPatientShare() != null) {
                    existingKemrMedicalBill.setKemrMedicalBillPatientShare(kemrMedicalBill.getKemrMedicalBillPatientShare());
                }
                if (kemrMedicalBill.getKemrMedicalBillMethod() != null) {
                    existingKemrMedicalBill.setKemrMedicalBillMethod(kemrMedicalBill.getKemrMedicalBillMethod());
                }
                if (kemrMedicalBill.getKemrMedicalBillDeliveryType() != null) {
                    existingKemrMedicalBill.setKemrMedicalBillDeliveryType(kemrMedicalBill.getKemrMedicalBillDeliveryType());
                }
                if (kemrMedicalBill.getKemrMedicalBillCashReceipt() != null) {
                    existingKemrMedicalBill.setKemrMedicalBillCashReceipt(kemrMedicalBill.getKemrMedicalBillCashReceipt());
                }

                return existingKemrMedicalBill;
            })
            .map(kemrMedicalBillRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrMedicalBill.getId().toString())
        );
    }

    /**
     * {@code GET  /kemr-medical-bills} : get all the kemrMedicalBills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kemrMedicalBills in body.
     */
    @GetMapping("/kemr-medical-bills")
    public List<KemrMedicalBill> getAllKemrMedicalBills() {
        log.debug("REST request to get all KemrMedicalBills");
        return kemrMedicalBillRepository.findAll();
    }

    /**
     * {@code GET  /kemr-medical-bills/:id} : get the "id" kemrMedicalBill.
     *
     * @param id the id of the kemrMedicalBill to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kemrMedicalBill, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kemr-medical-bills/{id}")
    public ResponseEntity<KemrMedicalBill> getKemrMedicalBill(@PathVariable Long id) {
        log.debug("REST request to get KemrMedicalBill : {}", id);
        Optional<KemrMedicalBill> kemrMedicalBill = kemrMedicalBillRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kemrMedicalBill);
    }

    /**
     * {@code DELETE  /kemr-medical-bills/:id} : delete the "id" kemrMedicalBill.
     *
     * @param id the id of the kemrMedicalBill to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kemr-medical-bills/{id}")
    public ResponseEntity<Void> deleteKemrMedicalBill(@PathVariable Long id) {
        log.debug("REST request to delete KemrMedicalBill : {}", id);
        kemrMedicalBillRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
