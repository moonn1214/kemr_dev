package com.jysoft.jyemr.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jysoft.jyemr.IntegrationTest;
import com.jysoft.jyemr.domain.KemrDoctor;
import com.jysoft.jyemr.repository.KemrDoctorRepository;
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
 * Integration tests for the {@link KemrDoctorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KemrDoctorResourceIT {

    private static final String DEFAULT_KEMR_DOCTOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_DOCTOR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_DOCTOR_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_DOCTOR_FIELD = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/kemr-doctors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KemrDoctorRepository kemrDoctorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKemrDoctorMockMvc;

    private KemrDoctor kemrDoctor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrDoctor createEntity(EntityManager em) {
        KemrDoctor kemrDoctor = new KemrDoctor().kemrDoctorName(DEFAULT_KEMR_DOCTOR_NAME).kemrDoctorField(DEFAULT_KEMR_DOCTOR_FIELD);
        return kemrDoctor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrDoctor createUpdatedEntity(EntityManager em) {
        KemrDoctor kemrDoctor = new KemrDoctor().kemrDoctorName(UPDATED_KEMR_DOCTOR_NAME).kemrDoctorField(UPDATED_KEMR_DOCTOR_FIELD);
        return kemrDoctor;
    }

    @BeforeEach
    public void initTest() {
        kemrDoctor = createEntity(em);
    }

    @Test
    @Transactional
    void createKemrDoctor() throws Exception {
        int databaseSizeBeforeCreate = kemrDoctorRepository.findAll().size();
        // Create the KemrDoctor
        restKemrDoctorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrDoctor)))
            .andExpect(status().isCreated());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeCreate + 1);
        KemrDoctor testKemrDoctor = kemrDoctorList.get(kemrDoctorList.size() - 1);
        assertThat(testKemrDoctor.getKemrDoctorName()).isEqualTo(DEFAULT_KEMR_DOCTOR_NAME);
        assertThat(testKemrDoctor.getKemrDoctorField()).isEqualTo(DEFAULT_KEMR_DOCTOR_FIELD);
    }

    @Test
    @Transactional
    void createKemrDoctorWithExistingId() throws Exception {
        // Create the KemrDoctor with an existing ID
        kemrDoctor.setId(1L);

        int databaseSizeBeforeCreate = kemrDoctorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKemrDoctorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrDoctor)))
            .andExpect(status().isBadRequest());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkKemrDoctorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrDoctorRepository.findAll().size();
        // set the field null
        kemrDoctor.setKemrDoctorName(null);

        // Create the KemrDoctor, which fails.

        restKemrDoctorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrDoctor)))
            .andExpect(status().isBadRequest());

        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrDoctorFieldIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrDoctorRepository.findAll().size();
        // set the field null
        kemrDoctor.setKemrDoctorField(null);

        // Create the KemrDoctor, which fails.

        restKemrDoctorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrDoctor)))
            .andExpect(status().isBadRequest());

        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllKemrDoctors() throws Exception {
        // Initialize the database
        kemrDoctorRepository.saveAndFlush(kemrDoctor);

        // Get all the kemrDoctorList
        restKemrDoctorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kemrDoctor.getId().intValue())))
            .andExpect(jsonPath("$.[*].kemrDoctorName").value(hasItem(DEFAULT_KEMR_DOCTOR_NAME)))
            .andExpect(jsonPath("$.[*].kemrDoctorField").value(hasItem(DEFAULT_KEMR_DOCTOR_FIELD)));
    }

    @Test
    @Transactional
    void getKemrDoctor() throws Exception {
        // Initialize the database
        kemrDoctorRepository.saveAndFlush(kemrDoctor);

        // Get the kemrDoctor
        restKemrDoctorMockMvc
            .perform(get(ENTITY_API_URL_ID, kemrDoctor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kemrDoctor.getId().intValue()))
            .andExpect(jsonPath("$.kemrDoctorName").value(DEFAULT_KEMR_DOCTOR_NAME))
            .andExpect(jsonPath("$.kemrDoctorField").value(DEFAULT_KEMR_DOCTOR_FIELD));
    }

    @Test
    @Transactional
    void getNonExistingKemrDoctor() throws Exception {
        // Get the kemrDoctor
        restKemrDoctorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingKemrDoctor() throws Exception {
        // Initialize the database
        kemrDoctorRepository.saveAndFlush(kemrDoctor);

        int databaseSizeBeforeUpdate = kemrDoctorRepository.findAll().size();

        // Update the kemrDoctor
        KemrDoctor updatedKemrDoctor = kemrDoctorRepository.findById(kemrDoctor.getId()).get();
        // Disconnect from session so that the updates on updatedKemrDoctor are not directly saved in db
        em.detach(updatedKemrDoctor);
        updatedKemrDoctor.kemrDoctorName(UPDATED_KEMR_DOCTOR_NAME).kemrDoctorField(UPDATED_KEMR_DOCTOR_FIELD);

        restKemrDoctorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKemrDoctor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKemrDoctor))
            )
            .andExpect(status().isOk());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeUpdate);
        KemrDoctor testKemrDoctor = kemrDoctorList.get(kemrDoctorList.size() - 1);
        assertThat(testKemrDoctor.getKemrDoctorName()).isEqualTo(UPDATED_KEMR_DOCTOR_NAME);
        assertThat(testKemrDoctor.getKemrDoctorField()).isEqualTo(UPDATED_KEMR_DOCTOR_FIELD);
    }

    @Test
    @Transactional
    void putNonExistingKemrDoctor() throws Exception {
        int databaseSizeBeforeUpdate = kemrDoctorRepository.findAll().size();
        kemrDoctor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrDoctorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kemrDoctor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrDoctor))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKemrDoctor() throws Exception {
        int databaseSizeBeforeUpdate = kemrDoctorRepository.findAll().size();
        kemrDoctor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrDoctorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrDoctor))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKemrDoctor() throws Exception {
        int databaseSizeBeforeUpdate = kemrDoctorRepository.findAll().size();
        kemrDoctor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrDoctorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrDoctor)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKemrDoctorWithPatch() throws Exception {
        // Initialize the database
        kemrDoctorRepository.saveAndFlush(kemrDoctor);

        int databaseSizeBeforeUpdate = kemrDoctorRepository.findAll().size();

        // Update the kemrDoctor using partial update
        KemrDoctor partialUpdatedKemrDoctor = new KemrDoctor();
        partialUpdatedKemrDoctor.setId(kemrDoctor.getId());

        restKemrDoctorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrDoctor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrDoctor))
            )
            .andExpect(status().isOk());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeUpdate);
        KemrDoctor testKemrDoctor = kemrDoctorList.get(kemrDoctorList.size() - 1);
        assertThat(testKemrDoctor.getKemrDoctorName()).isEqualTo(DEFAULT_KEMR_DOCTOR_NAME);
        assertThat(testKemrDoctor.getKemrDoctorField()).isEqualTo(DEFAULT_KEMR_DOCTOR_FIELD);
    }

    @Test
    @Transactional
    void fullUpdateKemrDoctorWithPatch() throws Exception {
        // Initialize the database
        kemrDoctorRepository.saveAndFlush(kemrDoctor);

        int databaseSizeBeforeUpdate = kemrDoctorRepository.findAll().size();

        // Update the kemrDoctor using partial update
        KemrDoctor partialUpdatedKemrDoctor = new KemrDoctor();
        partialUpdatedKemrDoctor.setId(kemrDoctor.getId());

        partialUpdatedKemrDoctor.kemrDoctorName(UPDATED_KEMR_DOCTOR_NAME).kemrDoctorField(UPDATED_KEMR_DOCTOR_FIELD);

        restKemrDoctorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrDoctor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrDoctor))
            )
            .andExpect(status().isOk());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeUpdate);
        KemrDoctor testKemrDoctor = kemrDoctorList.get(kemrDoctorList.size() - 1);
        assertThat(testKemrDoctor.getKemrDoctorName()).isEqualTo(UPDATED_KEMR_DOCTOR_NAME);
        assertThat(testKemrDoctor.getKemrDoctorField()).isEqualTo(UPDATED_KEMR_DOCTOR_FIELD);
    }

    @Test
    @Transactional
    void patchNonExistingKemrDoctor() throws Exception {
        int databaseSizeBeforeUpdate = kemrDoctorRepository.findAll().size();
        kemrDoctor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrDoctorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kemrDoctor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrDoctor))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKemrDoctor() throws Exception {
        int databaseSizeBeforeUpdate = kemrDoctorRepository.findAll().size();
        kemrDoctor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrDoctorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrDoctor))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKemrDoctor() throws Exception {
        int databaseSizeBeforeUpdate = kemrDoctorRepository.findAll().size();
        kemrDoctor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrDoctorMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(kemrDoctor))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrDoctor in the database
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKemrDoctor() throws Exception {
        // Initialize the database
        kemrDoctorRepository.saveAndFlush(kemrDoctor);

        int databaseSizeBeforeDelete = kemrDoctorRepository.findAll().size();

        // Delete the kemrDoctor
        restKemrDoctorMockMvc
            .perform(delete(ENTITY_API_URL_ID, kemrDoctor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KemrDoctor> kemrDoctorList = kemrDoctorRepository.findAll();
        assertThat(kemrDoctorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
