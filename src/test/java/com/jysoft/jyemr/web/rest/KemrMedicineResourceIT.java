package com.jysoft.jyemr.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jysoft.jyemr.IntegrationTest;
import com.jysoft.jyemr.domain.KemrMedicine;
import com.jysoft.jyemr.repository.KemrMedicineRepository;
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
 * Integration tests for the {@link KemrMedicineResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KemrMedicineResourceIT {

    private static final String DEFAULT_KEMR_MEDICINE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_MEDICINE_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_KEMR_MEDICINE_PRICE = 1;
    private static final Integer UPDATED_KEMR_MEDICINE_PRICE = 2;

    private static final String ENTITY_API_URL = "/api/kemr-medicines";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KemrMedicineRepository kemrMedicineRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKemrMedicineMockMvc;

    private KemrMedicine kemrMedicine;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrMedicine createEntity(EntityManager em) {
        KemrMedicine kemrMedicine = new KemrMedicine()
            .kemrMedicineName(DEFAULT_KEMR_MEDICINE_NAME)
            .kemrMedicinePrice(DEFAULT_KEMR_MEDICINE_PRICE);
        return kemrMedicine;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrMedicine createUpdatedEntity(EntityManager em) {
        KemrMedicine kemrMedicine = new KemrMedicine()
            .kemrMedicineName(UPDATED_KEMR_MEDICINE_NAME)
            .kemrMedicinePrice(UPDATED_KEMR_MEDICINE_PRICE);
        return kemrMedicine;
    }

    @BeforeEach
    public void initTest() {
        kemrMedicine = createEntity(em);
    }

    @Test
    @Transactional
    void createKemrMedicine() throws Exception {
        int databaseSizeBeforeCreate = kemrMedicineRepository.findAll().size();
        // Create the KemrMedicine
        restKemrMedicineMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicine)))
            .andExpect(status().isCreated());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeCreate + 1);
        KemrMedicine testKemrMedicine = kemrMedicineList.get(kemrMedicineList.size() - 1);
        assertThat(testKemrMedicine.getKemrMedicineName()).isEqualTo(DEFAULT_KEMR_MEDICINE_NAME);
        assertThat(testKemrMedicine.getKemrMedicinePrice()).isEqualTo(DEFAULT_KEMR_MEDICINE_PRICE);
    }

    @Test
    @Transactional
    void createKemrMedicineWithExistingId() throws Exception {
        // Create the KemrMedicine with an existing ID
        kemrMedicine.setId(1L);

        int databaseSizeBeforeCreate = kemrMedicineRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKemrMedicineMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicine)))
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkKemrMedicineNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrMedicineRepository.findAll().size();
        // set the field null
        kemrMedicine.setKemrMedicineName(null);

        // Create the KemrMedicine, which fails.

        restKemrMedicineMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicine)))
            .andExpect(status().isBadRequest());

        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrMedicinePriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrMedicineRepository.findAll().size();
        // set the field null
        kemrMedicine.setKemrMedicinePrice(null);

        // Create the KemrMedicine, which fails.

        restKemrMedicineMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicine)))
            .andExpect(status().isBadRequest());

        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllKemrMedicines() throws Exception {
        // Initialize the database
        kemrMedicineRepository.saveAndFlush(kemrMedicine);

        // Get all the kemrMedicineList
        restKemrMedicineMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kemrMedicine.getId().intValue())))
            .andExpect(jsonPath("$.[*].kemrMedicineName").value(hasItem(DEFAULT_KEMR_MEDICINE_NAME)))
            .andExpect(jsonPath("$.[*].kemrMedicinePrice").value(hasItem(DEFAULT_KEMR_MEDICINE_PRICE)));
    }

    @Test
    @Transactional
    void getKemrMedicine() throws Exception {
        // Initialize the database
        kemrMedicineRepository.saveAndFlush(kemrMedicine);

        // Get the kemrMedicine
        restKemrMedicineMockMvc
            .perform(get(ENTITY_API_URL_ID, kemrMedicine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kemrMedicine.getId().intValue()))
            .andExpect(jsonPath("$.kemrMedicineName").value(DEFAULT_KEMR_MEDICINE_NAME))
            .andExpect(jsonPath("$.kemrMedicinePrice").value(DEFAULT_KEMR_MEDICINE_PRICE));
    }

    @Test
    @Transactional
    void getNonExistingKemrMedicine() throws Exception {
        // Get the kemrMedicine
        restKemrMedicineMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingKemrMedicine() throws Exception {
        // Initialize the database
        kemrMedicineRepository.saveAndFlush(kemrMedicine);

        int databaseSizeBeforeUpdate = kemrMedicineRepository.findAll().size();

        // Update the kemrMedicine
        KemrMedicine updatedKemrMedicine = kemrMedicineRepository.findById(kemrMedicine.getId()).get();
        // Disconnect from session so that the updates on updatedKemrMedicine are not directly saved in db
        em.detach(updatedKemrMedicine);
        updatedKemrMedicine.kemrMedicineName(UPDATED_KEMR_MEDICINE_NAME).kemrMedicinePrice(UPDATED_KEMR_MEDICINE_PRICE);

        restKemrMedicineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKemrMedicine.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKemrMedicine))
            )
            .andExpect(status().isOk());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeUpdate);
        KemrMedicine testKemrMedicine = kemrMedicineList.get(kemrMedicineList.size() - 1);
        assertThat(testKemrMedicine.getKemrMedicineName()).isEqualTo(UPDATED_KEMR_MEDICINE_NAME);
        assertThat(testKemrMedicine.getKemrMedicinePrice()).isEqualTo(UPDATED_KEMR_MEDICINE_PRICE);
    }

    @Test
    @Transactional
    void putNonExistingKemrMedicine() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicineRepository.findAll().size();
        kemrMedicine.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrMedicineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kemrMedicine.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicine))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKemrMedicine() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicineRepository.findAll().size();
        kemrMedicine.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicine))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKemrMedicine() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicineRepository.findAll().size();
        kemrMedicine.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicineMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicine)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKemrMedicineWithPatch() throws Exception {
        // Initialize the database
        kemrMedicineRepository.saveAndFlush(kemrMedicine);

        int databaseSizeBeforeUpdate = kemrMedicineRepository.findAll().size();

        // Update the kemrMedicine using partial update
        KemrMedicine partialUpdatedKemrMedicine = new KemrMedicine();
        partialUpdatedKemrMedicine.setId(kemrMedicine.getId());

        partialUpdatedKemrMedicine.kemrMedicineName(UPDATED_KEMR_MEDICINE_NAME).kemrMedicinePrice(UPDATED_KEMR_MEDICINE_PRICE);

        restKemrMedicineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrMedicine.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrMedicine))
            )
            .andExpect(status().isOk());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeUpdate);
        KemrMedicine testKemrMedicine = kemrMedicineList.get(kemrMedicineList.size() - 1);
        assertThat(testKemrMedicine.getKemrMedicineName()).isEqualTo(UPDATED_KEMR_MEDICINE_NAME);
        assertThat(testKemrMedicine.getKemrMedicinePrice()).isEqualTo(UPDATED_KEMR_MEDICINE_PRICE);
    }

    @Test
    @Transactional
    void fullUpdateKemrMedicineWithPatch() throws Exception {
        // Initialize the database
        kemrMedicineRepository.saveAndFlush(kemrMedicine);

        int databaseSizeBeforeUpdate = kemrMedicineRepository.findAll().size();

        // Update the kemrMedicine using partial update
        KemrMedicine partialUpdatedKemrMedicine = new KemrMedicine();
        partialUpdatedKemrMedicine.setId(kemrMedicine.getId());

        partialUpdatedKemrMedicine.kemrMedicineName(UPDATED_KEMR_MEDICINE_NAME).kemrMedicinePrice(UPDATED_KEMR_MEDICINE_PRICE);

        restKemrMedicineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrMedicine.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrMedicine))
            )
            .andExpect(status().isOk());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeUpdate);
        KemrMedicine testKemrMedicine = kemrMedicineList.get(kemrMedicineList.size() - 1);
        assertThat(testKemrMedicine.getKemrMedicineName()).isEqualTo(UPDATED_KEMR_MEDICINE_NAME);
        assertThat(testKemrMedicine.getKemrMedicinePrice()).isEqualTo(UPDATED_KEMR_MEDICINE_PRICE);
    }

    @Test
    @Transactional
    void patchNonExistingKemrMedicine() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicineRepository.findAll().size();
        kemrMedicine.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrMedicineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kemrMedicine.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicine))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKemrMedicine() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicineRepository.findAll().size();
        kemrMedicine.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicine))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKemrMedicine() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicineRepository.findAll().size();
        kemrMedicine.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicineMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(kemrMedicine))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrMedicine in the database
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKemrMedicine() throws Exception {
        // Initialize the database
        kemrMedicineRepository.saveAndFlush(kemrMedicine);

        int databaseSizeBeforeDelete = kemrMedicineRepository.findAll().size();

        // Delete the kemrMedicine
        restKemrMedicineMockMvc
            .perform(delete(ENTITY_API_URL_ID, kemrMedicine.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KemrMedicine> kemrMedicineList = kemrMedicineRepository.findAll();
        assertThat(kemrMedicineList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
