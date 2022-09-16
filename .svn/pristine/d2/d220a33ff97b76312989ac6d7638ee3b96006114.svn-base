package com.jysoft.jyemr.web.rest;

import com.jysoft.jyemr.domain.KemrDoctor;
import com.jysoft.jyemr.repository.KemrDoctorRepository;
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
 * REST controller for managing {@link com.jysoft.jyemr.domain.KemrDoctor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KemrDoctorResource {

    private final Logger log = LoggerFactory.getLogger(KemrDoctorResource.class);

    private static final String ENTITY_NAME = "kemrDoctor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KemrDoctorRepository kemrDoctorRepository;

    public KemrDoctorResource(KemrDoctorRepository kemrDoctorRepository) {
        this.kemrDoctorRepository = kemrDoctorRepository;
    }

    /**
     * {@code POST  /kemr-doctors} : Create a new kemrDoctor.
     *
     * @param kemrDoctor the kemrDoctor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kemrDoctor, or with status {@code 400 (Bad Request)} if the kemrDoctor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kemr-doctors")
    public ResponseEntity<KemrDoctor> createKemrDoctor(@Valid @RequestBody KemrDoctor kemrDoctor) throws URISyntaxException {
        log.debug("REST request to save KemrDoctor : {}", kemrDoctor);
        if (kemrDoctor.getId() != null) {
            throw new BadRequestAlertException("A new kemrDoctor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KemrDoctor result = kemrDoctorRepository.save(kemrDoctor);
        return ResponseEntity
            .created(new URI("/api/kemr-doctors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kemr-doctors/:id} : Updates an existing kemrDoctor.
     *
     * @param id the id of the kemrDoctor to save.
     * @param kemrDoctor the kemrDoctor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrDoctor,
     * or with status {@code 400 (Bad Request)} if the kemrDoctor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kemrDoctor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kemr-doctors/{id}")
    public ResponseEntity<KemrDoctor> updateKemrDoctor(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody KemrDoctor kemrDoctor
    ) throws URISyntaxException {
        log.debug("REST request to update KemrDoctor : {}, {}", id, kemrDoctor);
        if (kemrDoctor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrDoctor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrDoctorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KemrDoctor result = kemrDoctorRepository.save(kemrDoctor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrDoctor.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kemr-doctors/:id} : Partial updates given fields of an existing kemrDoctor, field will ignore if it is null
     *
     * @param id the id of the kemrDoctor to save.
     * @param kemrDoctor the kemrDoctor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrDoctor,
     * or with status {@code 400 (Bad Request)} if the kemrDoctor is not valid,
     * or with status {@code 404 (Not Found)} if the kemrDoctor is not found,
     * or with status {@code 500 (Internal Server Error)} if the kemrDoctor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kemr-doctors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KemrDoctor> partialUpdateKemrDoctor(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody KemrDoctor kemrDoctor
    ) throws URISyntaxException {
        log.debug("REST request to partial update KemrDoctor partially : {}, {}", id, kemrDoctor);
        if (kemrDoctor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrDoctor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrDoctorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KemrDoctor> result = kemrDoctorRepository
            .findById(kemrDoctor.getId())
            .map(existingKemrDoctor -> {
                if (kemrDoctor.getKemrDoctorName() != null) {
                    existingKemrDoctor.setKemrDoctorName(kemrDoctor.getKemrDoctorName());
                }
                if (kemrDoctor.getKemrDoctorField() != null) {
                    existingKemrDoctor.setKemrDoctorField(kemrDoctor.getKemrDoctorField());
                }

                return existingKemrDoctor;
            })
            .map(kemrDoctorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrDoctor.getId().toString())
        );
    }

    /**
     * {@code GET  /kemr-doctors} : get all the kemrDoctors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kemrDoctors in body.
     */
    @GetMapping("/kemr-doctors")
    public List<KemrDoctor> getAllKemrDoctors() {
        log.debug("REST request to get all KemrDoctors");
        return kemrDoctorRepository.findAll();
    }

    /**
     * {@code GET  /kemr-doctors/:id} : get the "id" kemrDoctor.
     *
     * @param id the id of the kemrDoctor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kemrDoctor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kemr-doctors/{id}")
    public ResponseEntity<KemrDoctor> getKemrDoctor(@PathVariable Long id) {
        log.debug("REST request to get KemrDoctor : {}", id);
        Optional<KemrDoctor> kemrDoctor = kemrDoctorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kemrDoctor);
    }

    /**
     * {@code DELETE  /kemr-doctors/:id} : delete the "id" kemrDoctor.
     *
     * @param id the id of the kemrDoctor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kemr-doctors/{id}")
    public ResponseEntity<Void> deleteKemrDoctor(@PathVariable Long id) {
        log.debug("REST request to delete KemrDoctor : {}", id);
        kemrDoctorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
