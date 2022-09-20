package com.jysoft.jyemr.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jysoft.jyemr.IntegrationTest;
import com.jysoft.jyemr.domain.KemrTreatment;
import com.jysoft.jyemr.repository.KemrTreatmentRepository;
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
 * Integration tests for the {@link KemrTreatmentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KemrTreatmentResourceIT {

    private static final String DEFAULT_KEMR_TREATMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_TREATMENT_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/kemr-treatments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KemrTreatmentRepository kemrTreatmentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKemrTreatmentMockMvc;

    private KemrTreatment kemrTreatment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrTreatment createEntity(EntityManager em) {
        KemrTreatment kemrTreatment = new KemrTreatment().kemrTreatmentName(DEFAULT_KEMR_TREATMENT_NAME);
        return kemrTreatment;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrTreatment createUpdatedEntity(EntityManager em) {
        KemrTreatment kemrTreatment = new KemrTreatment().kemrTreatmentName(UPDATED_KEMR_TREATMENT_NAME);
        return kemrTreatment;
    }

    @BeforeEach
    public void initTest() {
        kemrTreatment = createEntity(em);
    }

    @Test
    @Transactional
    void createKemrTreatment() throws Exception {
        int databaseSizeBeforeCreate = kemrTreatmentRepository.findAll().size();
        // Create the KemrTreatment
        restKemrTreatmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrTreatment)))
            .andExpect(status().isCreated());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeCreate + 1);
        KemrTreatment testKemrTreatment = kemrTreatmentList.get(kemrTreatmentList.size() - 1);
        assertThat(testKemrTreatment.getKemrTreatmentName()).isEqualTo(DEFAULT_KEMR_TREATMENT_NAME);
    }

    @Test
    @Transactional
    void createKemrTreatmentWithExistingId() throws Exception {
        // Create the KemrTreatment with an existing ID
        kemrTreatment.setId(1L);

        int databaseSizeBeforeCreate = kemrTreatmentRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKemrTreatmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrTreatment)))
            .andExpect(status().isBadRequest());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkKemrTreatmentNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrTreatmentRepository.findAll().size();
        // set the field null
        kemrTreatment.setKemrTreatmentName(null);

        // Create the KemrTreatment, which fails.

        restKemrTreatmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrTreatment)))
            .andExpect(status().isBadRequest());

        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllKemrTreatments() throws Exception {
        // Initialize the database
        kemrTreatmentRepository.saveAndFlush(kemrTreatment);

        // Get all the kemrTreatmentList
        restKemrTreatmentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kemrTreatment.getId().intValue())))
            .andExpect(jsonPath("$.[*].kemrTreatmentName").value(hasItem(DEFAULT_KEMR_TREATMENT_NAME)));
    }

    @Test
    @Transactional
    void getKemrTreatment() throws Exception {
        // Initialize the database
        kemrTreatmentRepository.saveAndFlush(kemrTreatment);

        // Get the kemrTreatment
        restKemrTreatmentMockMvc
            .perform(get(ENTITY_API_URL_ID, kemrTreatment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kemrTreatment.getId().intValue()))
            .andExpect(jsonPath("$.kemrTreatmentName").value(DEFAULT_KEMR_TREATMENT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingKemrTreatment() throws Exception {
        // Get the kemrTreatment
        restKemrTreatmentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingKemrTreatment() throws Exception {
        // Initialize the database
        kemrTreatmentRepository.saveAndFlush(kemrTreatment);

        int databaseSizeBeforeUpdate = kemrTreatmentRepository.findAll().size();

        // Update the kemrTreatment
        KemrTreatment updatedKemrTreatment = kemrTreatmentRepository.findById(kemrTreatment.getId()).get();
        // Disconnect from session so that the updates on updatedKemrTreatment are not directly saved in db
        em.detach(updatedKemrTreatment);
        updatedKemrTreatment.kemrTreatmentName(UPDATED_KEMR_TREATMENT_NAME);

        restKemrTreatmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKemrTreatment.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKemrTreatment))
            )
            .andExpect(status().isOk());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeUpdate);
        KemrTreatment testKemrTreatment = kemrTreatmentList.get(kemrTreatmentList.size() - 1);
        assertThat(testKemrTreatment.getKemrTreatmentName()).isEqualTo(UPDATED_KEMR_TREATMENT_NAME);
    }

    @Test
    @Transactional
    void putNonExistingKemrTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrTreatmentRepository.findAll().size();
        kemrTreatment.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrTreatmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kemrTreatment.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrTreatment))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKemrTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrTreatmentRepository.findAll().size();
        kemrTreatment.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrTreatmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrTreatment))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKemrTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrTreatmentRepository.findAll().size();
        kemrTreatment.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrTreatmentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrTreatment)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKemrTreatmentWithPatch() throws Exception {
        // Initialize the database
        kemrTreatmentRepository.saveAndFlush(kemrTreatment);

        int databaseSizeBeforeUpdate = kemrTreatmentRepository.findAll().size();

        // Update the kemrTreatment using partial update
        KemrTreatment partialUpdatedKemrTreatment = new KemrTreatment();
        partialUpdatedKemrTreatment.setId(kemrTreatment.getId());

        restKemrTreatmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrTreatment.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrTreatment))
            )
            .andExpect(status().isOk());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeUpdate);
        KemrTreatment testKemrTreatment = kemrTreatmentList.get(kemrTreatmentList.size() - 1);
        assertThat(testKemrTreatment.getKemrTreatmentName()).isEqualTo(DEFAULT_KEMR_TREATMENT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateKemrTreatmentWithPatch() throws Exception {
        // Initialize the database
        kemrTreatmentRepository.saveAndFlush(kemrTreatment);

        int databaseSizeBeforeUpdate = kemrTreatmentRepository.findAll().size();

        // Update the kemrTreatment using partial update
        KemrTreatment partialUpdatedKemrTreatment = new KemrTreatment();
        partialUpdatedKemrTreatment.setId(kemrTreatment.getId());

        partialUpdatedKemrTreatment.kemrTreatmentName(UPDATED_KEMR_TREATMENT_NAME);

        restKemrTreatmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrTreatment.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrTreatment))
            )
            .andExpect(status().isOk());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeUpdate);
        KemrTreatment testKemrTreatment = kemrTreatmentList.get(kemrTreatmentList.size() - 1);
        assertThat(testKemrTreatment.getKemrTreatmentName()).isEqualTo(UPDATED_KEMR_TREATMENT_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingKemrTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrTreatmentRepository.findAll().size();
        kemrTreatment.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrTreatmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kemrTreatment.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrTreatment))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKemrTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrTreatmentRepository.findAll().size();
        kemrTreatment.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrTreatmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrTreatment))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKemrTreatment() throws Exception {
        int databaseSizeBeforeUpdate = kemrTreatmentRepository.findAll().size();
        kemrTreatment.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrTreatmentMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(kemrTreatment))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrTreatment in the database
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKemrTreatment() throws Exception {
        // Initialize the database
        kemrTreatmentRepository.saveAndFlush(kemrTreatment);

        int databaseSizeBeforeDelete = kemrTreatmentRepository.findAll().size();

        // Delete the kemrTreatment
        restKemrTreatmentMockMvc
            .perform(delete(ENTITY_API_URL_ID, kemrTreatment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KemrTreatment> kemrTreatmentList = kemrTreatmentRepository.findAll();
        assertThat(kemrTreatmentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
