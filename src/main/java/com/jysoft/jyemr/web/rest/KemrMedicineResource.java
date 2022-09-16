package com.jysoft.jyemr.web.rest;

import com.jysoft.jyemr.domain.KemrMedicine;
import com.jysoft.jyemr.repository.KemrMedicineRepository;
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
 * REST controller for managing {@link com.jysoft.jyemr.domain.KemrMedicine}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KemrMedicineResource {

    private final Logger log = LoggerFactory.getLogger(KemrMedicineResource.class);

    private static final String ENTITY_NAME = "kemrMedicine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KemrMedicineRepository kemrMedicineRepository;

    public KemrMedicineResource(KemrMedicineRepository kemrMedicineRepository) {
        this.kemrMedicineRepository = kemrMedicineRepository;
    }

    /**
     * {@code POST  /kemr-medicines} : Create a new kemrMedicine.
     *
     * @param kemrMedicine the kemrMedicine to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kemrMedicine, or with status {@code 400 (Bad Request)} if the kemrMedicine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kemr-medicines")
    public ResponseEntity<KemrMedicine> createKemrMedicine(@Valid @RequestBody KemrMedicine kemrMedicine) throws URISyntaxException {
        log.debug("REST request to save KemrMedicine : {}", kemrMedicine);
        if (kemrMedicine.getId() != null) {
            throw new BadRequestAlertException("A new kemrMedicine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KemrMedicine result = kemrMedicineRepository.save(kemrMedicine);
        return ResponseEntity
            .created(new URI("/api/kemr-medicines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kemr-medicines/:id} : Updates an existing kemrMedicine.
     *
     * @param id the id of the kemrMedicine to save.
     * @param kemrMedicine the kemrMedicine to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrMedicine,
     * or with status {@code 400 (Bad Request)} if the kemrMedicine is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kemrMedicine couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kemr-medicines/{id}")
    public ResponseEntity<KemrMedicine> updateKemrMedicine(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody KemrMedicine kemrMedicine
    ) throws URISyntaxException {
        log.debug("REST request to update KemrMedicine : {}, {}", id, kemrMedicine);
        if (kemrMedicine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrMedicine.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrMedicineRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KemrMedicine result = kemrMedicineRepository.save(kemrMedicine);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrMedicine.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kemr-medicines/:id} : Partial updates given fields of an existing kemrMedicine, field will ignore if it is null
     *
     * @param id the id of the kemrMedicine to save.
     * @param kemrMedicine the kemrMedicine to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrMedicine,
     * or with status {@code 400 (Bad Request)} if the kemrMedicine is not valid,
     * or with status {@code 404 (Not Found)} if the kemrMedicine is not found,
     * or with status {@code 500 (Internal Server Error)} if the kemrMedicine couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kemr-medicines/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KemrMedicine> partialUpdateKemrMedicine(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody KemrMedicine kemrMedicine
    ) throws URISyntaxException {
        log.debug("REST request to partial update KemrMedicine partially : {}, {}", id, kemrMedicine);
        if (kemrMedicine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrMedicine.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrMedicineRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KemrMedicine> result = kemrMedicineRepository
            .findById(kemrMedicine.getId())
            .map(existingKemrMedicine -> {
                if (kemrMedicine.getKemrMedicineName() != null) {
                    existingKemrMedicine.setKemrMedicineName(kemrMedicine.getKemrMedicineName());
                }
                if (kemrMedicine.getKemrMedicinePrice() != null) {
                    existingKemrMedicine.setKemrMedicinePrice(kemrMedicine.getKemrMedicinePrice());
                }

                return existingKemrMedicine;
            })
            .map(kemrMedicineRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrMedicine.getId().toString())
        );
    }

    /**
     * {@code GET  /kemr-medicines} : get all the kemrMedicines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kemrMedicines in body.
     */
    @GetMapping("/kemr-medicines")
    public List<KemrMedicine> getAllKemrMedicines() {
        log.debug("REST request to get all KemrMedicines");
        return kemrMedicineRepository.findAll();
    }

    /**
     * {@code GET  /kemr-medicines/:id} : get the "id" kemrMedicine.
     *
     * @param id the id of the kemrMedicine to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kemrMedicine, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kemr-medicines/{id}")
    public ResponseEntity<KemrMedicine> getKemrMedicine(@PathVariable Long id) {
        log.debug("REST request to get KemrMedicine : {}", id);
        Optional<KemrMedicine> kemrMedicine = kemrMedicineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kemrMedicine);
    }

    /**
     * {@code DELETE  /kemr-medicines/:id} : delete the "id" kemrMedicine.
     *
     * @param id the id of the kemrMedicine to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kemr-medicines/{id}")
    public ResponseEntity<Void> deleteKemrMedicine(@PathVariable Long id) {
        log.debug("REST request to delete KemrMedicine : {}", id);
        kemrMedicineRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
