package com.jysoft.jyemr.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jysoft.jyemr.IntegrationTest;
import com.jysoft.jyemr.domain.KemrPrescription;
import com.jysoft.jyemr.repository.KemrPrescriptionRepository;
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
 * Integration tests for the {@link KemrPrescriptionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KemrPrescriptionResourceIT {

    private static final String ENTITY_API_URL = "/api/kemr-prescriptions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KemrPrescriptionRepository kemrPrescriptionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKemrPrescriptionMockMvc;

    private KemrPrescription kemrPrescription;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrPrescription createEntity(EntityManager em) {
        KemrPrescription kemrPrescription = new KemrPrescription();
        return kemrPrescription;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrPrescription createUpdatedEntity(EntityManager em) {
        KemrPrescription kemrPrescription = new KemrPrescription();
        return kemrPrescription;
    }

    @BeforeEach
    public void initTest() {
        kemrPrescription = createEntity(em);
    }

    @Test
    @Transactional
    void createKemrPrescription() throws Exception {
        int databaseSizeBeforeCreate = kemrPrescriptionRepository.findAll().size();
        // Create the KemrPrescription
        restKemrPrescriptionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPrescription))
            )
            .andExpect(status().isCreated());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeCreate + 1);
        KemrPrescription testKemrPrescription = kemrPrescriptionList.get(kemrPrescriptionList.size() - 1);
    }

    @Test
    @Transactional
    void createKemrPrescriptionWithExistingId() throws Exception {
        // Create the KemrPrescription with an existing ID
        kemrPrescription.setId(1L);

        int databaseSizeBeforeCreate = kemrPrescriptionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKemrPrescriptionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPrescription))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllKemrPrescriptions() throws Exception {
        // Initialize the database
        kemrPrescriptionRepository.saveAndFlush(kemrPrescription);

        // Get all the kemrPrescriptionList
        restKemrPrescriptionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kemrPrescription.getId().intValue())));
    }

    @Test
    @Transactional
    void getKemrPrescription() throws Exception {
        // Initialize the database
        kemrPrescriptionRepository.saveAndFlush(kemrPrescription);

        // Get the kemrPrescription
        restKemrPrescriptionMockMvc
            .perform(get(ENTITY_API_URL_ID, kemrPrescription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kemrPrescription.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingKemrPrescription() throws Exception {
        // Get the kemrPrescription
        restKemrPrescriptionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewKemrPrescription() throws Exception {
        // Initialize the database
        kemrPrescriptionRepository.saveAndFlush(kemrPrescription);

        int databaseSizeBeforeUpdate = kemrPrescriptionRepository.findAll().size();

        // Update the kemrPrescription
        KemrPrescription updatedKemrPrescription = kemrPrescriptionRepository.findById(kemrPrescription.getId()).get();
        // Disconnect from session so that the updates on updatedKemrPrescription are not directly saved in db
        em.detach(updatedKemrPrescription);

        restKemrPrescriptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKemrPrescription.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKemrPrescription))
            )
            .andExpect(status().isOk());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeUpdate);
        KemrPrescription testKemrPrescription = kemrPrescriptionList.get(kemrPrescriptionList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingKemrPrescription() throws Exception {
        int databaseSizeBeforeUpdate = kemrPrescriptionRepository.findAll().size();
        kemrPrescription.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrPrescriptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kemrPrescription.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrPrescription))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKemrPrescription() throws Exception {
        int databaseSizeBeforeUpdate = kemrPrescriptionRepository.findAll().size();
        kemrPrescription.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrPrescriptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrPrescription))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKemrPrescription() throws Exception {
        int databaseSizeBeforeUpdate = kemrPrescriptionRepository.findAll().size();
        kemrPrescription.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrPrescriptionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPrescription))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKemrPrescriptionWithPatch() throws Exception {
        // Initialize the database
        kemrPrescriptionRepository.saveAndFlush(kemrPrescription);

        int databaseSizeBeforeUpdate = kemrPrescriptionRepository.findAll().size();

        // Update the kemrPrescription using partial update
        KemrPrescription partialUpdatedKemrPrescription = new KemrPrescription();
        partialUpdatedKemrPrescription.setId(kemrPrescription.getId());

        restKemrPrescriptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrPrescription.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrPrescription))
            )
            .andExpect(status().isOk());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeUpdate);
        KemrPrescription testKemrPrescription = kemrPrescriptionList.get(kemrPrescriptionList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateKemrPrescriptionWithPatch() throws Exception {
        // Initialize the database
        kemrPrescriptionRepository.saveAndFlush(kemrPrescription);

        int databaseSizeBeforeUpdate = kemrPrescriptionRepository.findAll().size();

        // Update the kemrPrescription using partial update
        KemrPrescription partialUpdatedKemrPrescription = new KemrPrescription();
        partialUpdatedKemrPrescription.setId(kemrPrescription.getId());

        restKemrPrescriptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrPrescription.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrPrescription))
            )
            .andExpect(status().isOk());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeUpdate);
        KemrPrescription testKemrPrescription = kemrPrescriptionList.get(kemrPrescriptionList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingKemrPrescription() throws Exception {
        int databaseSizeBeforeUpdate = kemrPrescriptionRepository.findAll().size();
        kemrPrescription.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrPrescriptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kemrPrescription.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrPrescription))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKemrPrescription() throws Exception {
        int databaseSizeBeforeUpdate = kemrPrescriptionRepository.findAll().size();
        kemrPrescription.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrPrescriptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrPrescription))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKemrPrescription() throws Exception {
        int databaseSizeBeforeUpdate = kemrPrescriptionRepository.findAll().size();
        kemrPrescription.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrPrescriptionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrPrescription))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrPrescription in the database
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKemrPrescription() throws Exception {
        // Initialize the database
        kemrPrescriptionRepository.saveAndFlush(kemrPrescription);

        int databaseSizeBeforeDelete = kemrPrescriptionRepository.findAll().size();

        // Delete the kemrPrescription
        restKemrPrescriptionMockMvc
            .perform(delete(ENTITY_API_URL_ID, kemrPrescription.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KemrPrescription> kemrPrescriptionList = kemrPrescriptionRepository.findAll();
        assertThat(kemrPrescriptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
