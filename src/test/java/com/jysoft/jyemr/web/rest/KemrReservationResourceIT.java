package com.jysoft.jyemr.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jysoft.jyemr.IntegrationTest;
import com.jysoft.jyemr.domain.KemrReservation;
import com.jysoft.jyemr.repository.KemrReservationRepository;
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
 * Integration tests for the {@link KemrReservationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KemrReservationResourceIT {

    private static final String DEFAULT_KEMR_RESERVATION_STATUS = "A";
    private static final String UPDATED_KEMR_RESERVATION_STATUS = "B";

    private static final String DEFAULT_KEMR_RESERVATION_NEW_PATIENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_RESERVATION_NEW_PATIENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_RESERVATION_NEW_PATIENT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_RESERVATION_NEW_PATIENT_PHONE = "BBBBBBBBBB";

    private static final Instant DEFAULT_KEMR_RESERVATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_KEMR_RESERVATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_KEMR_RESERVATION_TIME = 1;
    private static final Integer UPDATED_KEMR_RESERVATION_TIME = 2;

    private static final String ENTITY_API_URL = "/api/kemr-reservations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KemrReservationRepository kemrReservationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKemrReservationMockMvc;

    private KemrReservation kemrReservation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrReservation createEntity(EntityManager em) {
        KemrReservation kemrReservation = new KemrReservation()
            .kemrReservationStatus(DEFAULT_KEMR_RESERVATION_STATUS)
            .kemrReservationNewPatientName(DEFAULT_KEMR_RESERVATION_NEW_PATIENT_NAME)
            .kemrReservationNewPatientPhone(DEFAULT_KEMR_RESERVATION_NEW_PATIENT_PHONE)
            .kemrReservationDate(DEFAULT_KEMR_RESERVATION_DATE)
            .kemrReservationTime(DEFAULT_KEMR_RESERVATION_TIME);
        return kemrReservation;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrReservation createUpdatedEntity(EntityManager em) {
        KemrReservation kemrReservation = new KemrReservation()
            .kemrReservationStatus(UPDATED_KEMR_RESERVATION_STATUS)
            .kemrReservationNewPatientName(UPDATED_KEMR_RESERVATION_NEW_PATIENT_NAME)
            .kemrReservationNewPatientPhone(UPDATED_KEMR_RESERVATION_NEW_PATIENT_PHONE)
            .kemrReservationDate(UPDATED_KEMR_RESERVATION_DATE)
            .kemrReservationTime(UPDATED_KEMR_RESERVATION_TIME);
        return kemrReservation;
    }

    @BeforeEach
    public void initTest() {
        kemrReservation = createEntity(em);
    }

    @Test
    @Transactional
    void createKemrReservation() throws Exception {
        int databaseSizeBeforeCreate = kemrReservationRepository.findAll().size();
        // Create the KemrReservation
        restKemrReservationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isCreated());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeCreate + 1);
        KemrReservation testKemrReservation = kemrReservationList.get(kemrReservationList.size() - 1);
        assertThat(testKemrReservation.getKemrReservationStatus()).isEqualTo(DEFAULT_KEMR_RESERVATION_STATUS);
        assertThat(testKemrReservation.getKemrReservationNewPatientName()).isEqualTo(DEFAULT_KEMR_RESERVATION_NEW_PATIENT_NAME);
        assertThat(testKemrReservation.getKemrReservationNewPatientPhone()).isEqualTo(DEFAULT_KEMR_RESERVATION_NEW_PATIENT_PHONE);
        assertThat(testKemrReservation.getKemrReservationDate()).isEqualTo(DEFAULT_KEMR_RESERVATION_DATE);
        assertThat(testKemrReservation.getKemrReservationTime()).isEqualTo(DEFAULT_KEMR_RESERVATION_TIME);
    }

    @Test
    @Transactional
    void createKemrReservationWithExistingId() throws Exception {
        // Create the KemrReservation with an existing ID
        kemrReservation.setId(1L);

        int databaseSizeBeforeCreate = kemrReservationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKemrReservationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkKemrReservationStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrReservationRepository.findAll().size();
        // set the field null
        kemrReservation.setKemrReservationStatus(null);

        // Create the KemrReservation, which fails.

        restKemrReservationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isBadRequest());

        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrReservationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrReservationRepository.findAll().size();
        // set the field null
        kemrReservation.setKemrReservationDate(null);

        // Create the KemrReservation, which fails.

        restKemrReservationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isBadRequest());

        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrReservationTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrReservationRepository.findAll().size();
        // set the field null
        kemrReservation.setKemrReservationTime(null);

        // Create the KemrReservation, which fails.

        restKemrReservationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isBadRequest());

        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllKemrReservations() throws Exception {
        // Initialize the database
        kemrReservationRepository.saveAndFlush(kemrReservation);

        // Get all the kemrReservationList
        restKemrReservationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kemrReservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].kemrReservationStatus").value(hasItem(DEFAULT_KEMR_RESERVATION_STATUS)))
            .andExpect(jsonPath("$.[*].kemrReservationNewPatientName").value(hasItem(DEFAULT_KEMR_RESERVATION_NEW_PATIENT_NAME)))
            .andExpect(jsonPath("$.[*].kemrReservationNewPatientPhone").value(hasItem(DEFAULT_KEMR_RESERVATION_NEW_PATIENT_PHONE)))
            .andExpect(jsonPath("$.[*].kemrReservationDate").value(hasItem(DEFAULT_KEMR_RESERVATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].kemrReservationTime").value(hasItem(DEFAULT_KEMR_RESERVATION_TIME)));
    }

    @Test
    @Transactional
    void getKemrReservation() throws Exception {
        // Initialize the database
        kemrReservationRepository.saveAndFlush(kemrReservation);

        // Get the kemrReservation
        restKemrReservationMockMvc
            .perform(get(ENTITY_API_URL_ID, kemrReservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kemrReservation.getId().intValue()))
            .andExpect(jsonPath("$.kemrReservationStatus").value(DEFAULT_KEMR_RESERVATION_STATUS))
            .andExpect(jsonPath("$.kemrReservationNewPatientName").value(DEFAULT_KEMR_RESERVATION_NEW_PATIENT_NAME))
            .andExpect(jsonPath("$.kemrReservationNewPatientPhone").value(DEFAULT_KEMR_RESERVATION_NEW_PATIENT_PHONE))
            .andExpect(jsonPath("$.kemrReservationDate").value(DEFAULT_KEMR_RESERVATION_DATE.toString()))
            .andExpect(jsonPath("$.kemrReservationTime").value(DEFAULT_KEMR_RESERVATION_TIME));
    }

    @Test
    @Transactional
    void getNonExistingKemrReservation() throws Exception {
        // Get the kemrReservation
        restKemrReservationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingKemrReservation() throws Exception {
        // Initialize the database
        kemrReservationRepository.saveAndFlush(kemrReservation);

        int databaseSizeBeforeUpdate = kemrReservationRepository.findAll().size();

        // Update the kemrReservation
        KemrReservation updatedKemrReservation = kemrReservationRepository.findById(kemrReservation.getId()).get();
        // Disconnect from session so that the updates on updatedKemrReservation are not directly saved in db
        em.detach(updatedKemrReservation);
        updatedKemrReservation
            .kemrReservationStatus(UPDATED_KEMR_RESERVATION_STATUS)
            .kemrReservationNewPatientName(UPDATED_KEMR_RESERVATION_NEW_PATIENT_NAME)
            .kemrReservationNewPatientPhone(UPDATED_KEMR_RESERVATION_NEW_PATIENT_PHONE)
            .kemrReservationDate(UPDATED_KEMR_RESERVATION_DATE)
            .kemrReservationTime(UPDATED_KEMR_RESERVATION_TIME);

        restKemrReservationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKemrReservation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKemrReservation))
            )
            .andExpect(status().isOk());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeUpdate);
        KemrReservation testKemrReservation = kemrReservationList.get(kemrReservationList.size() - 1);
        assertThat(testKemrReservation.getKemrReservationStatus()).isEqualTo(UPDATED_KEMR_RESERVATION_STATUS);
        assertThat(testKemrReservation.getKemrReservationNewPatientName()).isEqualTo(UPDATED_KEMR_RESERVATION_NEW_PATIENT_NAME);
        assertThat(testKemrReservation.getKemrReservationNewPatientPhone()).isEqualTo(UPDATED_KEMR_RESERVATION_NEW_PATIENT_PHONE);
        assertThat(testKemrReservation.getKemrReservationDate()).isEqualTo(UPDATED_KEMR_RESERVATION_DATE);
        assertThat(testKemrReservation.getKemrReservationTime()).isEqualTo(UPDATED_KEMR_RESERVATION_TIME);
    }

    @Test
    @Transactional
    void putNonExistingKemrReservation() throws Exception {
        int databaseSizeBeforeUpdate = kemrReservationRepository.findAll().size();
        kemrReservation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrReservationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kemrReservation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKemrReservation() throws Exception {
        int databaseSizeBeforeUpdate = kemrReservationRepository.findAll().size();
        kemrReservation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrReservationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKemrReservation() throws Exception {
        int databaseSizeBeforeUpdate = kemrReservationRepository.findAll().size();
        kemrReservation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrReservationMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKemrReservationWithPatch() throws Exception {
        // Initialize the database
        kemrReservationRepository.saveAndFlush(kemrReservation);

        int databaseSizeBeforeUpdate = kemrReservationRepository.findAll().size();

        // Update the kemrReservation using partial update
        KemrReservation partialUpdatedKemrReservation = new KemrReservation();
        partialUpdatedKemrReservation.setId(kemrReservation.getId());

        partialUpdatedKemrReservation
            .kemrReservationStatus(UPDATED_KEMR_RESERVATION_STATUS)
            .kemrReservationNewPatientName(UPDATED_KEMR_RESERVATION_NEW_PATIENT_NAME)
            .kemrReservationNewPatientPhone(UPDATED_KEMR_RESERVATION_NEW_PATIENT_PHONE)
            .kemrReservationDate(UPDATED_KEMR_RESERVATION_DATE);

        restKemrReservationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrReservation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrReservation))
            )
            .andExpect(status().isOk());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeUpdate);
        KemrReservation testKemrReservation = kemrReservationList.get(kemrReservationList.size() - 1);
        assertThat(testKemrReservation.getKemrReservationStatus()).isEqualTo(UPDATED_KEMR_RESERVATION_STATUS);
        assertThat(testKemrReservation.getKemrReservationNewPatientName()).isEqualTo(UPDATED_KEMR_RESERVATION_NEW_PATIENT_NAME);
        assertThat(testKemrReservation.getKemrReservationNewPatientPhone()).isEqualTo(UPDATED_KEMR_RESERVATION_NEW_PATIENT_PHONE);
        assertThat(testKemrReservation.getKemrReservationDate()).isEqualTo(UPDATED_KEMR_RESERVATION_DATE);
        assertThat(testKemrReservation.getKemrReservationTime()).isEqualTo(DEFAULT_KEMR_RESERVATION_TIME);
    }

    @Test
    @Transactional
    void fullUpdateKemrReservationWithPatch() throws Exception {
        // Initialize the database
        kemrReservationRepository.saveAndFlush(kemrReservation);

        int databaseSizeBeforeUpdate = kemrReservationRepository.findAll().size();

        // Update the kemrReservation using partial update
        KemrReservation partialUpdatedKemrReservation = new KemrReservation();
        partialUpdatedKemrReservation.setId(kemrReservation.getId());

        partialUpdatedKemrReservation
            .kemrReservationStatus(UPDATED_KEMR_RESERVATION_STATUS)
            .kemrReservationNewPatientName(UPDATED_KEMR_RESERVATION_NEW_PATIENT_NAME)
            .kemrReservationNewPatientPhone(UPDATED_KEMR_RESERVATION_NEW_PATIENT_PHONE)
            .kemrReservationDate(UPDATED_KEMR_RESERVATION_DATE)
            .kemrReservationTime(UPDATED_KEMR_RESERVATION_TIME);

        restKemrReservationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrReservation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrReservation))
            )
            .andExpect(status().isOk());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeUpdate);
        KemrReservation testKemrReservation = kemrReservationList.get(kemrReservationList.size() - 1);
        assertThat(testKemrReservation.getKemrReservationStatus()).isEqualTo(UPDATED_KEMR_RESERVATION_STATUS);
        assertThat(testKemrReservation.getKemrReservationNewPatientName()).isEqualTo(UPDATED_KEMR_RESERVATION_NEW_PATIENT_NAME);
        assertThat(testKemrReservation.getKemrReservationNewPatientPhone()).isEqualTo(UPDATED_KEMR_RESERVATION_NEW_PATIENT_PHONE);
        assertThat(testKemrReservation.getKemrReservationDate()).isEqualTo(UPDATED_KEMR_RESERVATION_DATE);
        assertThat(testKemrReservation.getKemrReservationTime()).isEqualTo(UPDATED_KEMR_RESERVATION_TIME);
    }

    @Test
    @Transactional
    void patchNonExistingKemrReservation() throws Exception {
        int databaseSizeBeforeUpdate = kemrReservationRepository.findAll().size();
        kemrReservation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrReservationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kemrReservation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKemrReservation() throws Exception {
        int databaseSizeBeforeUpdate = kemrReservationRepository.findAll().size();
        kemrReservation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrReservationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKemrReservation() throws Exception {
        int databaseSizeBeforeUpdate = kemrReservationRepository.findAll().size();
        kemrReservation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrReservationMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrReservation))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrReservation in the database
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKemrReservation() throws Exception {
        // Initialize the database
        kemrReservationRepository.saveAndFlush(kemrReservation);

        int databaseSizeBeforeDelete = kemrReservationRepository.findAll().size();

        // Delete the kemrReservation
        restKemrReservationMockMvc
            .perform(delete(ENTITY_API_URL_ID, kemrReservation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KemrReservation> kemrReservationList = kemrReservationRepository.findAll();
        assertThat(kemrReservationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
