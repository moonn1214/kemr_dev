package com.jysoft.jyemr.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jysoft.jyemr.IntegrationTest;
import com.jysoft.jyemr.domain.KemrMedicalTreatment;
import com.jysoft.jyemr.repository.KemrMedicalTreatmentRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link KemrMedicalTreatmentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KemrMedicalTreatmentResourceIT {

    private static final String DEFAULT_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE = "BBBBBBBBBB";

    private static final Instant DEFAULT_KEMR_MEDICAL_TREATMENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_KEMR_MEDICAL_TREATMENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/kemr-medical-treatments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KemrMedicalTreatmentRepository kemrMedicalTreatmentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKemrMedicalTreatmentMockMvc;

    private KemrMedicalTreatment kemrMedicalTreatment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrMedicalTreatment createEntity(EntityManager em) {
        KemrMedicalTreatment kemrMedicalTreatment = new KemrMedicalTreatment()
            .kemrMedicalTreatmentDoctorNote(DEFAULT_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE)
            .kemrMedicalTreatmentNurseMessage(DEFAULT_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE)
            .kemrMedicalTreatmentDate(DEFAULT_KEMR_MEDICAL_TREATMENT_DATE);
        return kemrMedicalTreatment;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrMedicalTreatment createUpdatedEntity(EntityManager em) {
        KemrMedicalTreatment kemrMedicalTreatment = new KemrMedicalTreatment()
            .kemrMedicalTreatmentDoctorNote(UPDATED_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE)
            .kemrMedicalTreatmentNurseMessage(UPDATED_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE)
            .kemrMedicalTreatmentDate(UPDATED_KEMR_MEDICAL_TREATMENT_DATE);
        return kemrMedicalTreatment;
    }

    @BeforeEach
    public void initTest() {
        kemrMedicalTreatment = createEntity(em);
    }

    @Test
    @Transactional
    void createKemrMedicalTreatment() throws Exception {
        int databaseSizeBeforeCreate = kemrMedicalTreatmentRepository.findAll().size();
        // Create the KemrMedicalTreatment
        restKemrMedicalTreatmentMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalTreatment))
            )
            .andExpect(status().isCreated());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeCreate + 1);
        KemrMedicalTreatment testKemrMedicalTreatment = kemrMedicalTreatmentList.get(kemrMedicalTreatmentList.size() - 1);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentDoctorNote()).isEqualTo(DEFAULT_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentNurseMessage()).isEqualTo(DEFAULT_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentDate()).isEqualTo(DEFAULT_KEMR_MEDICAL_TREATMENT_DATE);
    }

    @Test
    @Transactional
    void createKemrMedicalTreatmentWithExistingId() throws Exception {
        // Create the KemrMedicalTreatment with an existing ID
        kemrMedicalTreatment.setId(1L);

        int databaseSizeBeforeCreate = kemrMedicalTreatmentRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKemrMedicalTreatmentMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalTreatment))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllKemrMedicalTreatments() throws Exception {
        // Initialize the database
        kemrMedicalTreatmentRepository.saveAndFlush(kemrMedicalTreatment);

        // Get all the kemrMedicalTreatmentList
        restKemrMedicalTreatmentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kemrMedicalTreatment.getId().intValue())))
            .andExpect(jsonPath("$.[*].kemrMedicalTreatmentDoctorNote").value(hasItem(DEFAULT_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE)))
            .andExpect(jsonPath("$.[*].kemrMedicalTreatmentNurseMessage").value(hasItem(DEFAULT_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE)))
            .andExpect(jsonPath("$.[*].kemrMedicalTreatmentDate").value(hasItem(DEFAULT_KEMR_MEDICAL_TREATMENT_DATE.toString())));
    }

    @Test
    @Transactional
    void getKemrMedicalTreatment() throws Exception {
        // Initialize the database
        kemrMedicalTreatmentRepository.saveAndFlush(kemrMedicalTreatment);

        // Get the kemrMedicalTreatment
        restKemrMedicalTreatmentMockMvc
            .perform(get(ENTITY_API_URL_ID, kemrMedicalTreatment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kemrMedicalTreatment.getId().intValue()))
            .andExpect(jsonPath("$.kemrMedicalTreatmentDoctorNote").value(DEFAULT_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE))
            .andExpect(jsonPath("$.kemrMedicalTreatmentNurseMessage").value(DEFAULT_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE))
            .andExpect(jsonPath("$.kemrMedicalTreatmentDate").value(DEFAULT_KEMR_MEDICAL_TREATMENT_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingKemrMedicalTreatment() throws Exception {
        // Get the kemrMedicalTreatment
        restKemrMedicalTreatmentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewKemrMedicalTreatment() throws Exception {
        // Initialize the database
        kemrMedicalTreatmentRepository.saveAndFlush(kemrMedicalTreatment);

        int databaseSizeBeforeUpdate = kemrMedicalTreatmentRepository.findAll().size();

        // Update the kemrMedicalTreatment
        KemrMedicalTreatment updatedKemrMedicalTreatment = kemrMedicalTreatmentRepository.findById(kemrMedicalTreatment.getId()).get();
        // Disconnect from session so that the updates on updatedKemrMedicalTreatment are not directly saved in db
        em.detach(updatedKemrMedicalTreatment);
        updatedKemrMedicalTreatment
            .kemrMedicalTreatmentDoctorNote(UPDATED_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE)
            .kemrMedicalTreatmentNurseMessage(UPDATED_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE)
            .kemrMedicalTreatmentDate(UPDATED_KEMR_MEDICAL_TREATMENT_DATE);

        restKemrMedicalTreatmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKemrMedicalTreatment.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKemrMedicalTreatment))
            )
            .andExpect(status().isOk());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeUpdate);
        KemrMedicalTreatment testKemrMedicalTreatment = kemrMedicalTreatmentList.get(kemrMedicalTreatmentList.size() - 1);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentDoctorNote()).isEqualTo(UPDATED_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentNurseMessage()).isEqualTo(UPDATED_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentDate()).isEqualTo(UPDATED_KEMR_MEDICAL_TREATMENT_DATE);
    }

    @Test
    @Transactional
    void putNonExistingKemrMedicalTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalTreatmentRepository.findAll().size();
        kemrMedicalTreatment.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrMedicalTreatmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kemrMedicalTreatment.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalTreatment))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKemrMedicalTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalTreatmentRepository.findAll().size();
        kemrMedicalTreatment.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicalTreatmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalTreatment))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKemrMedicalTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalTreatmentRepository.findAll().size();
        kemrMedicalTreatment.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicalTreatmentMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicalTreatment))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKemrMedicalTreatmentWithPatch() throws Exception {
        // Initialize the database
        kemrMedicalTreatmentRepository.saveAndFlush(kemrMedicalTreatment);

        int databaseSizeBeforeUpdate = kemrMedicalTreatmentRepository.findAll().size();

        // Update the kemrMedicalTreatment using partial update
        KemrMedicalTreatment partialUpdatedKemrMedicalTreatment = new KemrMedicalTreatment();
        partialUpdatedKemrMedicalTreatment.setId(kemrMedicalTreatment.getId());

        partialUpdatedKemrMedicalTreatment.kemrMedicalTreatmentNurseMessage(UPDATED_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE);

        restKemrMedicalTreatmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrMedicalTreatment.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrMedicalTreatment))
            )
            .andExpect(status().isOk());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeUpdate);
        KemrMedicalTreatment testKemrMedicalTreatment = kemrMedicalTreatmentList.get(kemrMedicalTreatmentList.size() - 1);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentDoctorNote()).isEqualTo(DEFAULT_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentNurseMessage()).isEqualTo(UPDATED_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentDate()).isEqualTo(DEFAULT_KEMR_MEDICAL_TREATMENT_DATE);
    }

    @Test
    @Transactional
    void fullUpdateKemrMedicalTreatmentWithPatch() throws Exception {
        // Initialize the database
        kemrMedicalTreatmentRepository.saveAndFlush(kemrMedicalTreatment);

        int databaseSizeBeforeUpdate = kemrMedicalTreatmentRepository.findAll().size();

        // Update the kemrMedicalTreatment using partial update
        KemrMedicalTreatment partialUpdatedKemrMedicalTreatment = new KemrMedicalTreatment();
        partialUpdatedKemrMedicalTreatment.setId(kemrMedicalTreatment.getId());

        partialUpdatedKemrMedicalTreatment
            .kemrMedicalTreatmentDoctorNote(UPDATED_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE)
            .kemrMedicalTreatmentNurseMessage(UPDATED_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE)
            .kemrMedicalTreatmentDate(UPDATED_KEMR_MEDICAL_TREATMENT_DATE);

        restKemrMedicalTreatmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrMedicalTreatment.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrMedicalTreatment))
            )
            .andExpect(status().isOk());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeUpdate);
        KemrMedicalTreatment testKemrMedicalTreatment = kemrMedicalTreatmentList.get(kemrMedicalTreatmentList.size() - 1);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentDoctorNote()).isEqualTo(UPDATED_KEMR_MEDICAL_TREATMENT_DOCTOR_NOTE);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentNurseMessage()).isEqualTo(UPDATED_KEMR_MEDICAL_TREATMENT_NURSE_MESSAGE);
        assertThat(testKemrMedicalTreatment.getKemrMedicalTreatmentDate()).isEqualTo(UPDATED_KEMR_MEDICAL_TREATMENT_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingKemrMedicalTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalTreatmentRepository.findAll().size();
        kemrMedicalTreatment.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrMedicalTreatmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kemrMedicalTreatment.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalTreatment))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKemrMedicalTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalTreatmentRepository.findAll().size();
        kemrMedicalTreatment.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicalTreatmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalTreatment))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKemrMedicalTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalTreatmentRepository.findAll().size();
        kemrMedicalTreatment.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicalTreatmentMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalTreatment))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrMedicalTreatment in the database
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKemrMedicalTreatment() throws Exception {
        // Initialize the database
        kemrMedicalTreatmentRepository.saveAndFlush(kemrMedicalTreatment);

        int databaseSizeBeforeDelete = kemrMedicalTreatmentRepository.findAll().size();

        // Delete the kemrMedicalTreatment
        restKemrMedicalTreatmentMockMvc
            .perform(delete(ENTITY_API_URL_ID, kemrMedicalTreatment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KemrMedicalTreatment> kemrMedicalTreatmentList = kemrMedicalTreatmentRepository.findAll();
        assertThat(kemrMedicalTreatmentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
