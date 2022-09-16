package com.jysoft.jyemr.web.rest;

import com.jysoft.jyemr.domain.KemrReservation;
import com.jysoft.jyemr.repository.KemrReservationRepository;
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
 * REST controller for managing {@link com.jysoft.jyemr.domain.KemrReservation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KemrReservationResource {

    private final Logger log = LoggerFactory.getLogger(KemrReservationResource.class);

    private static final String ENTITY_NAME = "kemrReservation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KemrReservationRepository kemrReservationRepository;

    public KemrReservationResource(KemrReservationRepository kemrReservationRepository) {
        this.kemrReservationRepository = kemrReservationRepository;
    }

    /**
     * {@code POST  /kemr-reservations} : Create a new kemrReservation.
     *
     * @param kemrReservation the kemrReservation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kemrReservation, or with status {@code 400 (Bad Request)} if the kemrReservation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kemr-reservations")
    public ResponseEntity<KemrReservation> createKemrReservation(@Valid @RequestBody KemrReservation kemrReservation)
        throws URISyntaxException {
        log.debug("REST request to save KemrReservation : {}", kemrReservation);
        if (kemrReservation.getId() != null) {
            throw new BadRequestAlertException("A new kemrReservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KemrReservation result = kemrReservationRepository.save(kemrReservation);
        return ResponseEntity
            .created(new URI("/api/kemr-reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kemr-reservations/:id} : Updates an existing kemrReservation.
     *
     * @param id the id of the kemrReservation to save.
     * @param kemrReservation the kemrReservation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrReservation,
     * or with status {@code 400 (Bad Request)} if the kemrReservation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kemrReservation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kemr-reservations/{id}")
    public ResponseEntity<KemrReservation> updateKemrReservation(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody KemrReservation kemrReservation
    ) throws URISyntaxException {
        log.debug("REST request to update KemrReservation : {}, {}", id, kemrReservation);
        if (kemrReservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrReservation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrReservationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KemrReservation result = kemrReservationRepository.save(kemrReservation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrReservation.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kemr-reservations/:id} : Partial updates given fields of an existing kemrReservation, field will ignore if it is null
     *
     * @param id the id of the kemrReservation to save.
     * @param kemrReservation the kemrReservation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrReservation,
     * or with status {@code 400 (Bad Request)} if the kemrReservation is not valid,
     * or with status {@code 404 (Not Found)} if the kemrReservation is not found,
     * or with status {@code 500 (Internal Server Error)} if the kemrReservation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kemr-reservations/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KemrReservation> partialUpdateKemrReservation(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody KemrReservation kemrReservation
    ) throws URISyntaxException {
        log.debug("REST request to partial update KemrReservation partially : {}, {}", id, kemrReservation);
        if (kemrReservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrReservation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrReservationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KemrReservation> result = kemrReservationRepository
            .findById(kemrReservation.getId())
            .map(existingKemrReservation -> {
                if (kemrReservation.getKemrReservationStatus() != null) {
                    existingKemrReservation.setKemrReservationStatus(kemrReservation.getKemrReservationStatus());
                }
                if (kemrReservation.getKemrReservationNewPatientName() != null) {
                    existingKemrReservation.setKemrReservationNewPatientName(kemrReservation.getKemrReservationNewPatientName());
                }
                if (kemrReservation.getKemrReservationNewPatientPhone() != null) {
                    existingKemrReservation.setKemrReservationNewPatientPhone(kemrReservation.getKemrReservationNewPatientPhone());
                }
                if (kemrReservation.getKemrReservationDate() != null) {
                    existingKemrReservation.setKemrReservationDate(kemrReservation.getKemrReservationDate());
                }
                if (kemrReservation.getKemrReservationTime() != null) {
                    existingKemrReservation.setKemrReservationTime(kemrReservation.getKemrReservationTime());
                }

                return existingKemrReservation;
            })
            .map(kemrReservationRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrReservation.getId().toString())
        );
    }

    /**
     * {@code GET  /kemr-reservations} : get all the kemrReservations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kemrReservations in body.
     */
    @GetMapping("/kemr-reservations")
    public List<KemrReservation> getAllKemrReservations() {
        log.debug("REST request to get all KemrReservations");
        return kemrReservationRepository.findAll();
    }

    /**
     * {@code GET  /kemr-reservations/:id} : get the "id" kemrReservation.
     *
     * @param id the id of the kemrReservation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kemrReservation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kemr-reservations/{id}")
    public ResponseEntity<KemrReservation> getKemrReservation(@PathVariable Long id) {
        log.debug("REST request to get KemrReservation : {}", id);
        Optional<KemrReservation> kemrReservation = kemrReservationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kemrReservation);
    }

    /**
     * {@code DELETE  /kemr-reservations/:id} : delete the "id" kemrReservation.
     *
     * @param id the id of the kemrReservation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kemr-reservations/{id}")
    public ResponseEntity<Void> deleteKemrReservation(@PathVariable Long id) {
        log.debug("REST request to delete KemrReservation : {}", id);
        kemrReservationRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
