package com.jysoft.jyemr.web.rest;

import com.jysoft.jyemr.domain.KemrPatient;
import com.jysoft.jyemr.repository.KemrPatientRepository;
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
 * REST controller for managing {@link com.jysoft.jyemr.domain.KemrPatient}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KemrPatientResource {

    private final Logger log = LoggerFactory.getLogger(KemrPatientResource.class);

    private static final String ENTITY_NAME = "kemrPatient";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KemrPatientRepository kemrPatientRepository;

    public KemrPatientResource(KemrPatientRepository kemrPatientRepository) {
        this.kemrPatientRepository = kemrPatientRepository;
    }

    /**
     * {@code POST  /kemr-patients} : Create a new kemrPatient.
     *
     * @param kemrPatient the kemrPatient to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kemrPatient, or with status {@code 400 (Bad Request)} if the kemrPatient has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kemr-patients")
    public ResponseEntity<KemrPatient> createKemrPatient(@Valid @RequestBody KemrPatient kemrPatient) throws URISyntaxException {
        log.debug("REST request to save KemrPatient : {}", kemrPatient);
        if (kemrPatient.getId() != null) {
            throw new BadRequestAlertException("A new kemrPatient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KemrPatient result = kemrPatientRepository.save(kemrPatient);
        return ResponseEntity
            .created(new URI("/api/kemr-patients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kemr-patients/:id} : Updates an existing kemrPatient.
     *
     * @param id the id of the kemrPatient to save.
     * @param kemrPatient the kemrPatient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrPatient,
     * or with status {@code 400 (Bad Request)} if the kemrPatient is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kemrPatient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kemr-patients/{id}")
    public ResponseEntity<KemrPatient> updateKemrPatient(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody KemrPatient kemrPatient
    ) throws URISyntaxException {
        log.debug("REST request to update KemrPatient : {}, {}", id, kemrPatient);
        if (kemrPatient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrPatient.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrPatientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KemrPatient result = kemrPatientRepository.save(kemrPatient);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrPatient.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kemr-patients/:id} : Partial updates given fields of an existing kemrPatient, field will ignore if it is null
     *
     * @param id the id of the kemrPatient to save.
     * @param kemrPatient the kemrPatient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrPatient,
     * or with status {@code 400 (Bad Request)} if the kemrPatient is not valid,
     * or with status {@code 404 (Not Found)} if the kemrPatient is not found,
     * or with status {@code 500 (Internal Server Error)} if the kemrPatient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kemr-patients/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KemrPatient> partialUpdateKemrPatient(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody KemrPatient kemrPatient
    ) throws URISyntaxException {
        log.debug("REST request to partial update KemrPatient partially : {}, {}", id, kemrPatient);
        if (kemrPatient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrPatient.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrPatientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KemrPatient> result = kemrPatientRepository
            .findById(kemrPatient.getId())
            .map(existingKemrPatient -> {
                if (kemrPatient.getKemrPatientName() != null) {
                    existingKemrPatient.setKemrPatientName(kemrPatient.getKemrPatientName());
                }
                if (kemrPatient.getKemrPatientSex() != null) {
                    existingKemrPatient.setKemrPatientSex(kemrPatient.getKemrPatientSex());
                }
                if (kemrPatient.getKemrPatientBirthday() != null) {
                    existingKemrPatient.setKemrPatientBirthday(kemrPatient.getKemrPatientBirthday());
                }
                if (kemrPatient.getKemrPatientRegistrationDate() != null) {
                    existingKemrPatient.setKemrPatientRegistrationDate(kemrPatient.getKemrPatientRegistrationDate());
                }
                if (kemrPatient.getKemrPatientSocialSeurityNo() != null) {
                    existingKemrPatient.setKemrPatientSocialSeurityNo(kemrPatient.getKemrPatientSocialSeurityNo());
                }
                if (kemrPatient.getKemrPatientQualificationCheck() != null) {
                    existingKemrPatient.setKemrPatientQualificationCheck(kemrPatient.getKemrPatientQualificationCheck());
                }
                if (kemrPatient.getKemrPatientAddress() != null) {
                    existingKemrPatient.setKemrPatientAddress(kemrPatient.getKemrPatientAddress());
                }
                if (kemrPatient.getKemrPatientNurseMemo() != null) {
                    existingKemrPatient.setKemrPatientNurseMemo(kemrPatient.getKemrPatientNurseMemo());
                }
                if (kemrPatient.getKemrPatientCellphone() != null) {
                    existingKemrPatient.setKemrPatientCellphone(kemrPatient.getKemrPatientCellphone());
                }
                if (kemrPatient.getKemrPatientLandline() != null) {
                    existingKemrPatient.setKemrPatientLandline(kemrPatient.getKemrPatientLandline());
                }

                return existingKemrPatient;
            })
            .map(kemrPatientRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrPatient.getId().toString())
        );
    }

    /**
     * {@code GET  /kemr-patients} : get all the kemrPatients.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kemrPatients in body.
     */
    @GetMapping("/kemr-patients")
    public List<KemrPatient> getAllKemrPatients() {
        log.debug("REST request to get all KemrPatients");
        return kemrPatientRepository.findAll();
    }

    /**
     * {@code GET  /kemr-patients/:id} : get the "id" kemrPatient.
     *
     * @param id the id of the kemrPatient to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kemrPatient, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kemr-patients/{id}")
    public ResponseEntity<KemrPatient> getKemrPatient(@PathVariable Long id) {
        log.debug("REST request to get KemrPatient : {}", id);
        Optional<KemrPatient> kemrPatient = kemrPatientRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kemrPatient);
    }

    /**
     * {@code DELETE  /kemr-patients/:id} : delete the "id" kemrPatient.
     *
     * @param id the id of the kemrPatient to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kemr-patients/{id}")
    public ResponseEntity<Void> deleteKemrPatient(@PathVariable Long id) {
        log.debug("REST request to delete KemrPatient : {}", id);
        kemrPatientRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
