package com.jysoft.jyemr.web.rest;

import com.jysoft.jyemr.domain.KemrPrescription;
import com.jysoft.jyemr.repository.KemrPrescriptionRepository;
import com.jysoft.jyemr.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.jysoft.jyemr.domain.KemrPrescription}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KemrPrescriptionResource {

    private final Logger log = LoggerFactory.getLogger(KemrPrescriptionResource.class);

    private static final String ENTITY_NAME = "kemrPrescription";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KemrPrescriptionRepository kemrPrescriptionRepository;

    public KemrPrescriptionResource(KemrPrescriptionRepository kemrPrescriptionRepository) {
        this.kemrPrescriptionRepository = kemrPrescriptionRepository;
    }

    /**
     * {@code POST  /kemr-prescriptions} : Create a new kemrPrescription.
     *
     * @param kemrPrescription the kemrPrescription to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kemrPrescription, or with status {@code 400 (Bad Request)} if the kemrPrescription has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kemr-prescriptions")
    public ResponseEntity<KemrPrescription> createKemrPrescription(@RequestBody KemrPrescription kemrPrescription)
        throws URISyntaxException {
        log.debug("REST request to save KemrPrescription : {}", kemrPrescription);
        if (kemrPrescription.getId() != null) {
            throw new BadRequestAlertException("A new kemrPrescription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KemrPrescription result = kemrPrescriptionRepository.save(kemrPrescription);
        return ResponseEntity
            .created(new URI("/api/kemr-prescriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kemr-prescriptions/:id} : Updates an existing kemrPrescription.
     *
     * @param id the id of the kemrPrescription to save.
     * @param kemrPrescription the kemrPrescription to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrPrescription,
     * or with status {@code 400 (Bad Request)} if the kemrPrescription is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kemrPrescription couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kemr-prescriptions/{id}")
    public ResponseEntity<KemrPrescription> updateKemrPrescription(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody KemrPrescription kemrPrescription
    ) throws URISyntaxException {
        log.debug("REST request to update KemrPrescription : {}, {}", id, kemrPrescription);
        if (kemrPrescription.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrPrescription.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrPrescriptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KemrPrescription result = kemrPrescriptionRepository.save(kemrPrescription);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrPrescription.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kemr-prescriptions/:id} : Partial updates given fields of an existing kemrPrescription, field will ignore if it is null
     *
     * @param id the id of the kemrPrescription to save.
     * @param kemrPrescription the kemrPrescription to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrPrescription,
     * or with status {@code 400 (Bad Request)} if the kemrPrescription is not valid,
     * or with status {@code 404 (Not Found)} if the kemrPrescription is not found,
     * or with status {@code 500 (Internal Server Error)} if the kemrPrescription couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kemr-prescriptions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KemrPrescription> partialUpdateKemrPrescription(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody KemrPrescription kemrPrescription
    ) throws URISyntaxException {
        log.debug("REST request to partial update KemrPrescription partially : {}, {}", id, kemrPrescription);
        if (kemrPrescription.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrPrescription.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrPrescriptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KemrPrescription> result = kemrPrescriptionRepository
            .findById(kemrPrescription.getId())
            .map(existingKemrPrescription -> {
                return existingKemrPrescription;
            })
            .map(kemrPrescriptionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrPrescription.getId().toString())
        );
    }

    /**
     * {@code GET  /kemr-prescriptions} : get all the kemrPrescriptions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kemrPrescriptions in body.
     */
    @GetMapping("/kemr-prescriptions")
    public List<KemrPrescription> getAllKemrPrescriptions() {
        log.debug("REST request to get all KemrPrescriptions");
        return kemrPrescriptionRepository.findAll();
    }

    /**
     * {@code GET  /kemr-prescriptions/:id} : get the "id" kemrPrescription.
     *
     * @param id the id of the kemrPrescription to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kemrPrescription, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kemr-prescriptions/{id}")
    public ResponseEntity<KemrPrescription> getKemrPrescription(@PathVariable Long id) {
        log.debug("REST request to get KemrPrescription : {}", id);
        Optional<KemrPrescription> kemrPrescription = kemrPrescriptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kemrPrescription);
    }

    /**
     * {@code DELETE  /kemr-prescriptions/:id} : delete the "id" kemrPrescription.
     *
     * @param id the id of the kemrPrescription to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kemr-prescriptions/{id}")
    public ResponseEntity<Void> deleteKemrPrescription(@PathVariable Long id) {
        log.debug("REST request to delete KemrPrescription : {}", id);
        kemrPrescriptionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
