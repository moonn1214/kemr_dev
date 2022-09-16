package com.jysoft.jyemr.web.rest;

import com.jysoft.jyemr.domain.KemrDiagnosis;
import com.jysoft.jyemr.repository.KemrDiagnosisRepository;
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
 * REST controller for managing {@link com.jysoft.jyemr.domain.KemrDiagnosis}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KemrDiagnosisResource {

    private final Logger log = LoggerFactory.getLogger(KemrDiagnosisResource.class);

    private static final String ENTITY_NAME = "kemrDiagnosis";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KemrDiagnosisRepository kemrDiagnosisRepository;

    public KemrDiagnosisResource(KemrDiagnosisRepository kemrDiagnosisRepository) {
        this.kemrDiagnosisRepository = kemrDiagnosisRepository;
    }

    /**
     * {@code POST  /kemr-diagnoses} : Create a new kemrDiagnosis.
     *
     * @param kemrDiagnosis the kemrDiagnosis to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kemrDiagnosis, or with status {@code 400 (Bad Request)} if the kemrDiagnosis has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kemr-diagnoses")
    public ResponseEntity<KemrDiagnosis> createKemrDiagnosis(@Valid @RequestBody KemrDiagnosis kemrDiagnosis) throws URISyntaxException {
        log.debug("REST request to save KemrDiagnosis : {}", kemrDiagnosis);
        if (kemrDiagnosis.getId() != null) {
            throw new BadRequestAlertException("A new kemrDiagnosis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KemrDiagnosis result = kemrDiagnosisRepository.save(kemrDiagnosis);
        return ResponseEntity
            .created(new URI("/api/kemr-diagnoses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kemr-diagnoses/:id} : Updates an existing kemrDiagnosis.
     *
     * @param id the id of the kemrDiagnosis to save.
     * @param kemrDiagnosis the kemrDiagnosis to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrDiagnosis,
     * or with status {@code 400 (Bad Request)} if the kemrDiagnosis is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kemrDiagnosis couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kemr-diagnoses/{id}")
    public ResponseEntity<KemrDiagnosis> updateKemrDiagnosis(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody KemrDiagnosis kemrDiagnosis
    ) throws URISyntaxException {
        log.debug("REST request to update KemrDiagnosis : {}, {}", id, kemrDiagnosis);
        if (kemrDiagnosis.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrDiagnosis.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrDiagnosisRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KemrDiagnosis result = kemrDiagnosisRepository.save(kemrDiagnosis);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrDiagnosis.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kemr-diagnoses/:id} : Partial updates given fields of an existing kemrDiagnosis, field will ignore if it is null
     *
     * @param id the id of the kemrDiagnosis to save.
     * @param kemrDiagnosis the kemrDiagnosis to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrDiagnosis,
     * or with status {@code 400 (Bad Request)} if the kemrDiagnosis is not valid,
     * or with status {@code 404 (Not Found)} if the kemrDiagnosis is not found,
     * or with status {@code 500 (Internal Server Error)} if the kemrDiagnosis couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kemr-diagnoses/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KemrDiagnosis> partialUpdateKemrDiagnosis(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody KemrDiagnosis kemrDiagnosis
    ) throws URISyntaxException {
        log.debug("REST request to partial update KemrDiagnosis partially : {}, {}", id, kemrDiagnosis);
        if (kemrDiagnosis.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrDiagnosis.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrDiagnosisRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KemrDiagnosis> result = kemrDiagnosisRepository
            .findById(kemrDiagnosis.getId())
            .map(existingKemrDiagnosis -> {
                if (kemrDiagnosis.getKemrDiagnosisName() != null) {
                    existingKemrDiagnosis.setKemrDiagnosisName(kemrDiagnosis.getKemrDiagnosisName());
                }

                return existingKemrDiagnosis;
            })
            .map(kemrDiagnosisRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrDiagnosis.getId().toString())
        );
    }

    /**
     * {@code GET  /kemr-diagnoses} : get all the kemrDiagnoses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kemrDiagnoses in body.
     */
    @GetMapping("/kemr-diagnoses")
    public List<KemrDiagnosis> getAllKemrDiagnoses() {
        log.debug("REST request to get all KemrDiagnoses");
        return kemrDiagnosisRepository.findAll();
    }

    /**
     * {@code GET  /kemr-diagnoses/:id} : get the "id" kemrDiagnosis.
     *
     * @param id the id of the kemrDiagnosis to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kemrDiagnosis, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kemr-diagnoses/{id}")
    public ResponseEntity<KemrDiagnosis> getKemrDiagnosis(@PathVariable Long id) {
        log.debug("REST request to get KemrDiagnosis : {}", id);
        Optional<KemrDiagnosis> kemrDiagnosis = kemrDiagnosisRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kemrDiagnosis);
    }

    /**
     * {@code DELETE  /kemr-diagnoses/:id} : delete the "id" kemrDiagnosis.
     *
     * @param id the id of the kemrDiagnosis to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kemr-diagnoses/{id}")
    public ResponseEntity<Void> deleteKemrDiagnosis(@PathVariable Long id) {
        log.debug("REST request to delete KemrDiagnosis : {}", id);
        kemrDiagnosisRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
