package com.jysoft.jyemr.web.rest;

import com.jysoft.jyemr.domain.KemrMedicalTreatment;
import com.jysoft.jyemr.repository.KemrMedicalTreatmentRepository;
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
 * REST controller for managing {@link com.jysoft.jyemr.domain.KemrMedicalTreatment}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KemrMedicalTreatmentResource {

    private final Logger log = LoggerFactory.getLogger(KemrMedicalTreatmentResource.class);

    private static final String ENTITY_NAME = "kemrMedicalTreatment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KemrMedicalTreatmentRepository kemrMedicalTreatmentRepository;

    public KemrMedicalTreatmentResource(KemrMedicalTreatmentRepository kemrMedicalTreatmentRepository) {
        this.kemrMedicalTreatmentRepository = kemrMedicalTreatmentRepository;
    }

    /**
     * {@code POST  /kemr-medical-treatments} : Create a new kemrMedicalTreatment.
     *
     * @param kemrMedicalTreatment the kemrMedicalTreatment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kemrMedicalTreatment, or with status {@code 400 (Bad Request)} if the kemrMedicalTreatment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kemr-medical-treatments")
    public ResponseEntity<KemrMedicalTreatment> createKemrMedicalTreatment(@Valid @RequestBody KemrMedicalTreatment kemrMedicalTreatment)
        throws URISyntaxException {
        log.debug("REST request to save KemrMedicalTreatment : {}", kemrMedicalTreatment);
        if (kemrMedicalTreatment.getId() != null) {
            throw new BadRequestAlertException("A new kemrMedicalTreatment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KemrMedicalTreatment result = kemrMedicalTreatmentRepository.save(kemrMedicalTreatment);
        return ResponseEntity
            .created(new URI("/api/kemr-medical-treatments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kemr-medical-treatments/:id} : Updates an existing kemrMedicalTreatment.
     *
     * @param id the id of the kemrMedicalTreatment to save.
     * @param kemrMedicalTreatment the kemrMedicalTreatment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrMedicalTreatment,
     * or with status {@code 400 (Bad Request)} if the kemrMedicalTreatment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kemrMedicalTreatment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kemr-medical-treatments/{id}")
    public ResponseEntity<KemrMedicalTreatment> updateKemrMedicalTreatment(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody KemrMedicalTreatment kemrMedicalTreatment
    ) throws URISyntaxException {
        log.debug("REST request to update KemrMedicalTreatment : {}, {}", id, kemrMedicalTreatment);
        if (kemrMedicalTreatment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrMedicalTreatment.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrMedicalTreatmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KemrMedicalTreatment result = kemrMedicalTreatmentRepository.save(kemrMedicalTreatment);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrMedicalTreatment.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kemr-medical-treatments/:id} : Partial updates given fields of an existing kemrMedicalTreatment, field will ignore if it is null
     *
     * @param id the id of the kemrMedicalTreatment to save.
     * @param kemrMedicalTreatment the kemrMedicalTreatment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrMedicalTreatment,
     * or with status {@code 400 (Bad Request)} if the kemrMedicalTreatment is not valid,
     * or with status {@code 404 (Not Found)} if the kemrMedicalTreatment is not found,
     * or with status {@code 500 (Internal Server Error)} if the kemrMedicalTreatment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kemr-medical-treatments/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KemrMedicalTreatment> partialUpdateKemrMedicalTreatment(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody KemrMedicalTreatment kemrMedicalTreatment
    ) throws URISyntaxException {
        log.debug("REST request to partial update KemrMedicalTreatment partially : {}, {}", id, kemrMedicalTreatment);
        if (kemrMedicalTreatment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrMedicalTreatment.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrMedicalTreatmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KemrMedicalTreatment> result = kemrMedicalTreatmentRepository
            .findById(kemrMedicalTreatment.getId())
            .map(existingKemrMedicalTreatment -> {
                if (kemrMedicalTreatment.getKemrMedicalTreatmentDoctorNote() != null) {
                    existingKemrMedicalTreatment.setKemrMedicalTreatmentDoctorNote(
                        kemrMedicalTreatment.getKemrMedicalTreatmentDoctorNote()
                    );
                }
                if (kemrMedicalTreatment.getKemrMedicalTreatmentNurseMessage() != null) {
                    existingKemrMedicalTreatment.setKemrMedicalTreatmentNurseMessage(
                        kemrMedicalTreatment.getKemrMedicalTreatmentNurseMessage()
                    );
                }
                if (kemrMedicalTreatment.getKemrMedicalTreatmentDate() != null) {
                    existingKemrMedicalTreatment.setKemrMedicalTreatmentDate(kemrMedicalTreatment.getKemrMedicalTreatmentDate());
                }

                return existingKemrMedicalTreatment;
            })
            .map(kemrMedicalTreatmentRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrMedicalTreatment.getId().toString())
        );
    }

    /**
     * {@code GET  /kemr-medical-treatments} : get all the kemrMedicalTreatments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kemrMedicalTreatments in body.
     */
    @GetMapping("/kemr-medical-treatments")
    public List<KemrMedicalTreatment> getAllKemrMedicalTreatments() {
        log.debug("REST request to get all KemrMedicalTreatments");
        return kemrMedicalTreatmentRepository.findAll();
    }

    /**
     * {@code GET  /kemr-medical-treatments/:id} : get the "id" kemrMedicalTreatment.
     *
     * @param id the id of the kemrMedicalTreatment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kemrMedicalTreatment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kemr-medical-treatments/{id}")
    public ResponseEntity<KemrMedicalTreatment> getKemrMedicalTreatment(@PathVariable Long id) {
        log.debug("REST request to get KemrMedicalTreatment : {}", id);
        Optional<KemrMedicalTreatment> kemrMedicalTreatment = kemrMedicalTreatmentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kemrMedicalTreatment);
    }

    /**
     * {@code DELETE  /kemr-medical-treatments/:id} : delete the "id" kemrMedicalTreatment.
     *
     * @param id the id of the kemrMedicalTreatment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kemr-medical-treatments/{id}")
    public ResponseEntity<Void> deleteKemrMedicalTreatment(@PathVariable Long id) {
        log.debug("REST request to delete KemrMedicalTreatment : {}", id);
        kemrMedicalTreatmentRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
