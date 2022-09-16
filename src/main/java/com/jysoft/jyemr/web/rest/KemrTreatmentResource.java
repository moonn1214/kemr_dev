package com.jysoft.jyemr.web.rest;

import com.jysoft.jyemr.domain.KemrTreatment;
import com.jysoft.jyemr.repository.KemrTreatmentRepository;
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
 * REST controller for managing {@link com.jysoft.jyemr.domain.KemrTreatment}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KemrTreatmentResource {

    private final Logger log = LoggerFactory.getLogger(KemrTreatmentResource.class);

    private static final String ENTITY_NAME = "kemrTreatment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KemrTreatmentRepository kemrTreatmentRepository;

    public KemrTreatmentResource(KemrTreatmentRepository kemrTreatmentRepository) {
        this.kemrTreatmentRepository = kemrTreatmentRepository;
    }

    /**
     * {@code POST  /kemr-treatments} : Create a new kemrTreatment.
     *
     * @param kemrTreatment the kemrTreatment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kemrTreatment, or with status {@code 400 (Bad Request)} if the kemrTreatment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kemr-treatments")
    public ResponseEntity<KemrTreatment> createKemrTreatment(@Valid @RequestBody KemrTreatment kemrTreatment) throws URISyntaxException {
        log.debug("REST request to save KemrTreatment : {}", kemrTreatment);
        if (kemrTreatment.getId() != null) {
            throw new BadRequestAlertException("A new kemrTreatment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KemrTreatment result = kemrTreatmentRepository.save(kemrTreatment);
        return ResponseEntity
            .created(new URI("/api/kemr-treatments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kemr-treatments/:id} : Updates an existing kemrTreatment.
     *
     * @param id the id of the kemrTreatment to save.
     * @param kemrTreatment the kemrTreatment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrTreatment,
     * or with status {@code 400 (Bad Request)} if the kemrTreatment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kemrTreatment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kemr-treatments/{id}")
    public ResponseEntity<KemrTreatment> updateKemrTreatment(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody KemrTreatment kemrTreatment
    ) throws URISyntaxException {
        log.debug("REST request to update KemrTreatment : {}, {}", id, kemrTreatment);
        if (kemrTreatment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrTreatment.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrTreatmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KemrTreatment result = kemrTreatmentRepository.save(kemrTreatment);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrTreatment.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kemr-treatments/:id} : Partial updates given fields of an existing kemrTreatment, field will ignore if it is null
     *
     * @param id the id of the kemrTreatment to save.
     * @param kemrTreatment the kemrTreatment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrTreatment,
     * or with status {@code 400 (Bad Request)} if the kemrTreatment is not valid,
     * or with status {@code 404 (Not Found)} if the kemrTreatment is not found,
     * or with status {@code 500 (Internal Server Error)} if the kemrTreatment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kemr-treatments/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KemrTreatment> partialUpdateKemrTreatment(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody KemrTreatment kemrTreatment
    ) throws URISyntaxException {
        log.debug("REST request to partial update KemrTreatment partially : {}, {}", id, kemrTreatment);
        if (kemrTreatment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrTreatment.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrTreatmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KemrTreatment> result = kemrTreatmentRepository
            .findById(kemrTreatment.getId())
            .map(existingKemrTreatment -> {
                if (kemrTreatment.getKemrTreatmentName() != null) {
                    existingKemrTreatment.setKemrTreatmentName(kemrTreatment.getKemrTreatmentName());
                }

                return existingKemrTreatment;
            })
            .map(kemrTreatmentRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrTreatment.getId().toString())
        );
    }

    /**
     * {@code GET  /kemr-treatments} : get all the kemrTreatments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kemrTreatments in body.
     */
    @GetMapping("/kemr-treatments")
    public List<KemrTreatment> getAllKemrTreatments() {
        log.debug("REST request to get all KemrTreatments");
        return kemrTreatmentRepository.findAll();
    }

    /**
     * {@code GET  /kemr-treatments/:id} : get the "id" kemrTreatment.
     *
     * @param id the id of the kemrTreatment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kemrTreatment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kemr-treatments/{id}")
    public ResponseEntity<KemrTreatment> getKemrTreatment(@PathVariable Long id) {
        log.debug("REST request to get KemrTreatment : {}", id);
        Optional<KemrTreatment> kemrTreatment = kemrTreatmentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kemrTreatment);
    }

    /**
     * {@code DELETE  /kemr-treatments/:id} : delete the "id" kemrTreatment.
     *
     * @param id the id of the kemrTreatment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kemr-treatments/{id}")
    public ResponseEntity<Void> deleteKemrTreatment(@PathVariable Long id) {
        log.debug("REST request to delete KemrTreatment : {}", id);
        kemrTreatmentRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
