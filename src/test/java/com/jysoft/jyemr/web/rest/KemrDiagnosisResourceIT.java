package com.jysoft.jyemr.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jysoft.jyemr.IntegrationTest;
import com.jysoft.jyemr.domain.KemrDiagnosis;
import com.jysoft.jyemr.repository.KemrDiagnosisRepository;
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
 * Integration tests for the {@link KemrDiagnosisResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KemrDiagnosisResourceIT {

    private static final String DEFAULT_KEMR_DIAGNOSIS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_DIAGNOSIS_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/kemr-diagnoses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KemrDiagnosisRepository kemrDiagnosisRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKemrDiagnosisMockMvc;

    private KemrDiagnosis kemrDiagnosis;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrDiagnosis createEntity(EntityManager em) {
        KemrDiagnosis kemrDiagnosis = new KemrDiagnosis().kemrDiagnosisName(DEFAULT_KEMR_DIAGNOSIS_NAME);
        return kemrDiagnosis;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrDiagnosis createUpdatedEntity(EntityManager em) {
        KemrDiagnosis kemrDiagnosis = new KemrDiagnosis().kemrDiagnosisName(UPDATED_KEMR_DIAGNOSIS_NAME);
        return kemrDiagnosis;
    }

    @BeforeEach
    public void initTest() {
        kemrDiagnosis = createEntity(em);
    }

    @Test
    @Transactional
    void createKemrDiagnosis() throws Exception {
        int databaseSizeBeforeCreate = kemrDiagnosisRepository.findAll().size();
        // Create the KemrDiagnosis
        restKemrDiagnosisMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrDiagnosis)))
            .andExpect(status().isCreated());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeCreate + 1);
        KemrDiagnosis testKemrDiagnosis = kemrDiagnosisList.get(kemrDiagnosisList.size() - 1);
        assertThat(testKemrDiagnosis.getKemrDiagnosisName()).isEqualTo(DEFAULT_KEMR_DIAGNOSIS_NAME);
    }

    @Test
    @Transactional
    void createKemrDiagnosisWithExistingId() throws Exception {
        // Create the KemrDiagnosis with an existing ID
        kemrDiagnosis.setId(1L);

        int databaseSizeBeforeCreate = kemrDiagnosisRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKemrDiagnosisMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrDiagnosis)))
            .andExpect(status().isBadRequest());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkKemrDiagnosisNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrDiagnosisRepository.findAll().size();
        // set the field null
        kemrDiagnosis.setKemrDiagnosisName(null);

        // Create the KemrDiagnosis, which fails.

        restKemrDiagnosisMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrDiagnosis)))
            .andExpect(status().isBadRequest());

        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllKemrDiagnoses() throws Exception {
        // Initialize the database
        kemrDiagnosisRepository.saveAndFlush(kemrDiagnosis);

        // Get all the kemrDiagnosisList
        restKemrDiagnosisMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kemrDiagnosis.getId().intValue())))
            .andExpect(jsonPath("$.[*].kemrDiagnosisName").value(hasItem(DEFAULT_KEMR_DIAGNOSIS_NAME)));
    }

    @Test
    @Transactional
    void getKemrDiagnosis() throws Exception {
        // Initialize the database
        kemrDiagnosisRepository.saveAndFlush(kemrDiagnosis);

        // Get the kemrDiagnosis
        restKemrDiagnosisMockMvc
            .perform(get(ENTITY_API_URL_ID, kemrDiagnosis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kemrDiagnosis.getId().intValue()))
            .andExpect(jsonPath("$.kemrDiagnosisName").value(DEFAULT_KEMR_DIAGNOSIS_NAME));
    }

    @Test
    @Transactional
    void getNonExistingKemrDiagnosis() throws Exception {
        // Get the kemrDiagnosis
        restKemrDiagnosisMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewKemrDiagnosis() throws Exception {
        // Initialize the database
        kemrDiagnosisRepository.saveAndFlush(kemrDiagnosis);

        int databaseSizeBeforeUpdate = kemrDiagnosisRepository.findAll().size();

        // Update the kemrDiagnosis
        KemrDiagnosis updatedKemrDiagnosis = kemrDiagnosisRepository.findById(kemrDiagnosis.getId()).get();
        // Disconnect from session so that the updates on updatedKemrDiagnosis are not directly saved in db
        em.detach(updatedKemrDiagnosis);
        updatedKemrDiagnosis.kemrDiagnosisName(UPDATED_KEMR_DIAGNOSIS_NAME);

        restKemrDiagnosisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKemrDiagnosis.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKemrDiagnosis))
            )
            .andExpect(status().isOk());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeUpdate);
        KemrDiagnosis testKemrDiagnosis = kemrDiagnosisList.get(kemrDiagnosisList.size() - 1);
        assertThat(testKemrDiagnosis.getKemrDiagnosisName()).isEqualTo(UPDATED_KEMR_DIAGNOSIS_NAME);
    }

    @Test
    @Transactional
    void putNonExistingKemrDiagnosis() throws Exception {
        int databaseSizeBeforeUpdate = kemrDiagnosisRepository.findAll().size();
        kemrDiagnosis.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrDiagnosisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kemrDiagnosis.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrDiagnosis))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKemrDiagnosis() throws Exception {
        int databaseSizeBeforeUpdate = kemrDiagnosisRepository.findAll().size();
        kemrDiagnosis.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrDiagnosisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrDiagnosis))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKemrDiagnosis() throws Exception {
        int databaseSizeBeforeUpdate = kemrDiagnosisRepository.findAll().size();
        kemrDiagnosis.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrDiagnosisMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrDiagnosis)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKemrDiagnosisWithPatch() throws Exception {
        // Initialize the database
        kemrDiagnosisRepository.saveAndFlush(kemrDiagnosis);

        int databaseSizeBeforeUpdate = kemrDiagnosisRepository.findAll().size();

        // Update the kemrDiagnosis using partial update
        KemrDiagnosis partialUpdatedKemrDiagnosis = new KemrDiagnosis();
        partialUpdatedKemrDiagnosis.setId(kemrDiagnosis.getId());

        partialUpdatedKemrDiagnosis.kemrDiagnosisName(UPDATED_KEMR_DIAGNOSIS_NAME);

        restKemrDiagnosisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrDiagnosis.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrDiagnosis))
            )
            .andExpect(status().isOk());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeUpdate);
        KemrDiagnosis testKemrDiagnosis = kemrDiagnosisList.get(kemrDiagnosisList.size() - 1);
        assertThat(testKemrDiagnosis.getKemrDiagnosisName()).isEqualTo(UPDATED_KEMR_DIAGNOSIS_NAME);
    }

    @Test
    @Transactional
    void fullUpdateKemrDiagnosisWithPatch() throws Exception {
        // Initialize the database
        kemrDiagnosisRepository.saveAndFlush(kemrDiagnosis);

        int databaseSizeBeforeUpdate = kemrDiagnosisRepository.findAll().size();

        // Update the kemrDiagnosis using partial update
        KemrDiagnosis partialUpdatedKemrDiagnosis = new KemrDiagnosis();
        partialUpdatedKemrDiagnosis.setId(kemrDiagnosis.getId());

        partialUpdatedKemrDiagnosis.kemrDiagnosisName(UPDATED_KEMR_DIAGNOSIS_NAME);

        restKemrDiagnosisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrDiagnosis.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrDiagnosis))
            )
            .andExpect(status().isOk());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeUpdate);
        KemrDiagnosis testKemrDiagnosis = kemrDiagnosisList.get(kemrDiagnosisList.size() - 1);
        assertThat(testKemrDiagnosis.getKemrDiagnosisName()).isEqualTo(UPDATED_KEMR_DIAGNOSIS_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingKemrDiagnosis() throws Exception {
        int databaseSizeBeforeUpdate = kemrDiagnosisRepository.findAll().size();
        kemrDiagnosis.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrDiagnosisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kemrDiagnosis.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrDiagnosis))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKemrDiagnosis() throws Exception {
        int databaseSizeBeforeUpdate = kemrDiagnosisRepository.findAll().size();
        kemrDiagnosis.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrDiagnosisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrDiagnosis))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKemrDiagnosis() throws Exception {
        int databaseSizeBeforeUpdate = kemrDiagnosisRepository.findAll().size();
        kemrDiagnosis.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrDiagnosisMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(kemrDiagnosis))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrDiagnosis in the database
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKemrDiagnosis() throws Exception {
        // Initialize the database
        kemrDiagnosisRepository.saveAndFlush(kemrDiagnosis);

        int databaseSizeBeforeDelete = kemrDiagnosisRepository.findAll().size();

        // Delete the kemrDiagnosis
        restKemrDiagnosisMockMvc
            .perform(delete(ENTITY_API_URL_ID, kemrDiagnosis.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KemrDiagnosis> kemrDiagnosisList = kemrDiagnosisRepository.findAll();
        assertThat(kemrDiagnosisList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
