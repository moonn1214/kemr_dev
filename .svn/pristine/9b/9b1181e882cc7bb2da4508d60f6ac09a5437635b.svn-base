package com.jysoft.jyemr.web.rest;

import com.jysoft.jyemr.domain.KemrInstitution;
import com.jysoft.jyemr.repository.KemrInstitutionRepository;
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
 * REST controller for managing {@link com.jysoft.jyemr.domain.KemrInstitution}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class KemrInstitutionResource {

    private final Logger log = LoggerFactory.getLogger(KemrInstitutionResource.class);

    private static final String ENTITY_NAME = "kemrInstitution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KemrInstitutionRepository kemrInstitutionRepository;

    public KemrInstitutionResource(KemrInstitutionRepository kemrInstitutionRepository) {
        this.kemrInstitutionRepository = kemrInstitutionRepository;
    }

    /**
     * {@code POST  /kemr-institutions} : Create a new kemrInstitution.
     *
     * @param kemrInstitution the kemrInstitution to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new kemrInstitution, or with status {@code 400 (Bad Request)} if the kemrInstitution has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/kemr-institutions")
    public ResponseEntity<KemrInstitution> createKemrInstitution(@Valid @RequestBody KemrInstitution kemrInstitution)
        throws URISyntaxException {
        log.debug("REST request to save KemrInstitution : {}", kemrInstitution);
        if (kemrInstitution.getId() != null) {
            throw new BadRequestAlertException("A new kemrInstitution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KemrInstitution result = kemrInstitutionRepository.save(kemrInstitution);
        return ResponseEntity
            .created(new URI("/api/kemr-institutions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /kemr-institutions/:id} : Updates an existing kemrInstitution.
     *
     * @param id the id of the kemrInstitution to save.
     * @param kemrInstitution the kemrInstitution to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrInstitution,
     * or with status {@code 400 (Bad Request)} if the kemrInstitution is not valid,
     * or with status {@code 500 (Internal Server Error)} if the kemrInstitution couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/kemr-institutions/{id}")
    public ResponseEntity<KemrInstitution> updateKemrInstitution(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody KemrInstitution kemrInstitution
    ) throws URISyntaxException {
        log.debug("REST request to update KemrInstitution : {}, {}", id, kemrInstitution);
        if (kemrInstitution.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrInstitution.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrInstitutionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        KemrInstitution result = kemrInstitutionRepository.save(kemrInstitution);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrInstitution.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /kemr-institutions/:id} : Partial updates given fields of an existing kemrInstitution, field will ignore if it is null
     *
     * @param id the id of the kemrInstitution to save.
     * @param kemrInstitution the kemrInstitution to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated kemrInstitution,
     * or with status {@code 400 (Bad Request)} if the kemrInstitution is not valid,
     * or with status {@code 404 (Not Found)} if the kemrInstitution is not found,
     * or with status {@code 500 (Internal Server Error)} if the kemrInstitution couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/kemr-institutions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KemrInstitution> partialUpdateKemrInstitution(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody KemrInstitution kemrInstitution
    ) throws URISyntaxException {
        log.debug("REST request to partial update KemrInstitution partially : {}, {}", id, kemrInstitution);
        if (kemrInstitution.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, kemrInstitution.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!kemrInstitutionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KemrInstitution> result = kemrInstitutionRepository
            .findById(kemrInstitution.getId())
            .map(existingKemrInstitution -> {
                if (kemrInstitution.getKemrInstitutionId() != null) {
                    existingKemrInstitution.setKemrInstitutionId(kemrInstitution.getKemrInstitutionId());
                }
                if (kemrInstitution.getKemrInstitutionPassword() != null) {
                    existingKemrInstitution.setKemrInstitutionPassword(kemrInstitution.getKemrInstitutionPassword());
                }
                if (kemrInstitution.getKemrInstitutionName() != null) {
                    existingKemrInstitution.setKemrInstitutionName(kemrInstitution.getKemrInstitutionName());
                }
                if (kemrInstitution.getKemrInstitutionDepartment() != null) {
                    existingKemrInstitution.setKemrInstitutionDepartment(kemrInstitution.getKemrInstitutionDepartment());
                }
                if (kemrInstitution.getKemrInstitutionPosition() != null) {
                    existingKemrInstitution.setKemrInstitutionPosition(kemrInstitution.getKemrInstitutionPosition());
                }
                if (kemrInstitution.getKemrInstitutionManager() != null) {
                    existingKemrInstitution.setKemrInstitutionManager(kemrInstitution.getKemrInstitutionManager());
                }
                if (kemrInstitution.getKemrInstitutionCellphone() != null) {
                    existingKemrInstitution.setKemrInstitutionCellphone(kemrInstitution.getKemrInstitutionCellphone());
                }
                if (kemrInstitution.getKemrInstitutionEmail() != null) {
                    existingKemrInstitution.setKemrInstitutionEmail(kemrInstitution.getKemrInstitutionEmail());
                }
                if (kemrInstitution.getKemrInstitutionWebsite() != null) {
                    existingKemrInstitution.setKemrInstitutionWebsite(kemrInstitution.getKemrInstitutionWebsite());
                }
                if (kemrInstitution.getKemrInstitutionAgree() != null) {
                    existingKemrInstitution.setKemrInstitutionAgree(kemrInstitution.getKemrInstitutionAgree());
                }
                if (kemrInstitution.getKemrInstitutionStatus() != null) {
                    existingKemrInstitution.setKemrInstitutionStatus(kemrInstitution.getKemrInstitutionStatus());
                }
                if (kemrInstitution.getKemrInstitutionModification() != null) {
                    existingKemrInstitution.setKemrInstitutionModification(kemrInstitution.getKemrInstitutionModification());
                }
                if (kemrInstitution.getKemrInstitutionWithdrawal() != null) {
                    existingKemrInstitution.setKemrInstitutionWithdrawal(kemrInstitution.getKemrInstitutionWithdrawal());
                }
                if (kemrInstitution.getKemrInstitutionLandline() != null) {
                    existingKemrInstitution.setKemrInstitutionLandline(kemrInstitution.getKemrInstitutionLandline());
                }
                if (kemrInstitution.getKemrInstitutionFail() != null) {
                    existingKemrInstitution.setKemrInstitutionFail(kemrInstitution.getKemrInstitutionFail());
                }
                if (kemrInstitution.getKemrInstitutionFailtime() != null) {
                    existingKemrInstitution.setKemrInstitutionFailtime(kemrInstitution.getKemrInstitutionFailtime());
                }
                if (kemrInstitution.getKemrInstitutionNumber() != null) {
                    existingKemrInstitution.setKemrInstitutionNumber(kemrInstitution.getKemrInstitutionNumber());
                }

                return existingKemrInstitution;
            })
            .map(kemrInstitutionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, kemrInstitution.getId().toString())
        );
    }

    /**
     * {@code GET  /kemr-institutions} : get all the kemrInstitutions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of kemrInstitutions in body.
     */
    @GetMapping("/kemr-institutions")
    public List<KemrInstitution> getAllKemrInstitutions() {
        log.debug("REST request to get all KemrInstitutions");
        return kemrInstitutionRepository.findAll();
    }

    /**
     * {@code GET  /kemr-institutions/:id} : get the "id" kemrInstitution.
     *
     * @param id the id of the kemrInstitution to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the kemrInstitution, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/kemr-institutions/{id}")
    public ResponseEntity<KemrInstitution> getKemrInstitution(@PathVariable Long id) {
        log.debug("REST request to get KemrInstitution : {}", id);
        Optional<KemrInstitution> kemrInstitution = kemrInstitutionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(kemrInstitution);
    }

    /**
     * {@code DELETE  /kemr-institutions/:id} : delete the "id" kemrInstitution.
     *
     * @param id the id of the kemrInstitution to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/kemr-institutions/{id}")
    public ResponseEntity<Void> deleteKemrInstitution(@PathVariable Long id) {
        log.debug("REST request to delete KemrInstitution : {}", id);
        kemrInstitutionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
