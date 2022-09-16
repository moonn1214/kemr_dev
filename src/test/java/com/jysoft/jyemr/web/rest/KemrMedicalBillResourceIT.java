package com.jysoft.jyemr.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jysoft.jyemr.IntegrationTest;
import com.jysoft.jyemr.domain.KemrMedicalBill;
import com.jysoft.jyemr.repository.KemrMedicalBillRepository;
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
 * Integration tests for the {@link KemrMedicalBillResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KemrMedicalBillResourceIT {

    private static final Integer DEFAULT_KEMR_MEDICAL_BILL_TOTAL = 1;
    private static final Integer UPDATED_KEMR_MEDICAL_BILL_TOTAL = 2;

    private static final Integer DEFAULT_KEMR_MEDICAL_BILL_NHS_SHARE = 1;
    private static final Integer UPDATED_KEMR_MEDICAL_BILL_NHS_SHARE = 2;

    private static final Integer DEFAULT_KEMR_MEDICAL_BILL_PATIENT_SHARE = 1;
    private static final Integer UPDATED_KEMR_MEDICAL_BILL_PATIENT_SHARE = 2;

    private static final String DEFAULT_KEMR_MEDICAL_BILL_METHOD = "A";
    private static final String UPDATED_KEMR_MEDICAL_BILL_METHOD = "B";

    private static final String DEFAULT_KEMR_MEDICAL_BILL_DELIVERY_TYPE = "A";
    private static final String UPDATED_KEMR_MEDICAL_BILL_DELIVERY_TYPE = "B";

    private static final String DEFAULT_KEMR_MEDICAL_BILL_CASH_RECEIPT = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_MEDICAL_BILL_CASH_RECEIPT = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/kemr-medical-bills";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KemrMedicalBillRepository kemrMedicalBillRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKemrMedicalBillMockMvc;

    private KemrMedicalBill kemrMedicalBill;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrMedicalBill createEntity(EntityManager em) {
        KemrMedicalBill kemrMedicalBill = new KemrMedicalBill()
            .kemrMedicalBillTotal(DEFAULT_KEMR_MEDICAL_BILL_TOTAL)
            .kemrMedicalBillNhsShare(DEFAULT_KEMR_MEDICAL_BILL_NHS_SHARE)
            .kemrMedicalBillPatientShare(DEFAULT_KEMR_MEDICAL_BILL_PATIENT_SHARE)
            .kemrMedicalBillMethod(DEFAULT_KEMR_MEDICAL_BILL_METHOD)
            .kemrMedicalBillDeliveryType(DEFAULT_KEMR_MEDICAL_BILL_DELIVERY_TYPE)
            .kemrMedicalBillCashReceipt(DEFAULT_KEMR_MEDICAL_BILL_CASH_RECEIPT);
        return kemrMedicalBill;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrMedicalBill createUpdatedEntity(EntityManager em) {
        KemrMedicalBill kemrMedicalBill = new KemrMedicalBill()
            .kemrMedicalBillTotal(UPDATED_KEMR_MEDICAL_BILL_TOTAL)
            .kemrMedicalBillNhsShare(UPDATED_KEMR_MEDICAL_BILL_NHS_SHARE)
            .kemrMedicalBillPatientShare(UPDATED_KEMR_MEDICAL_BILL_PATIENT_SHARE)
            .kemrMedicalBillMethod(UPDATED_KEMR_MEDICAL_BILL_METHOD)
            .kemrMedicalBillDeliveryType(UPDATED_KEMR_MEDICAL_BILL_DELIVERY_TYPE)
            .kemrMedicalBillCashReceipt(UPDATED_KEMR_MEDICAL_BILL_CASH_RECEIPT);
        return kemrMedicalBill;
    }

    @BeforeEach
    public void initTest() {
        kemrMedicalBill = createEntity(em);
    }

    @Test
    @Transactional
    void createKemrMedicalBill() throws Exception {
        int databaseSizeBeforeCreate = kemrMedicalBillRepository.findAll().size();
        // Create the KemrMedicalBill
        restKemrMedicalBillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isCreated());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeCreate + 1);
        KemrMedicalBill testKemrMedicalBill = kemrMedicalBillList.get(kemrMedicalBillList.size() - 1);
        assertThat(testKemrMedicalBill.getKemrMedicalBillTotal()).isEqualTo(DEFAULT_KEMR_MEDICAL_BILL_TOTAL);
        assertThat(testKemrMedicalBill.getKemrMedicalBillNhsShare()).isEqualTo(DEFAULT_KEMR_MEDICAL_BILL_NHS_SHARE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillPatientShare()).isEqualTo(DEFAULT_KEMR_MEDICAL_BILL_PATIENT_SHARE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillMethod()).isEqualTo(DEFAULT_KEMR_MEDICAL_BILL_METHOD);
        assertThat(testKemrMedicalBill.getKemrMedicalBillDeliveryType()).isEqualTo(DEFAULT_KEMR_MEDICAL_BILL_DELIVERY_TYPE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillCashReceipt()).isEqualTo(DEFAULT_KEMR_MEDICAL_BILL_CASH_RECEIPT);
    }

    @Test
    @Transactional
    void createKemrMedicalBillWithExistingId() throws Exception {
        // Create the KemrMedicalBill with an existing ID
        kemrMedicalBill.setId(1L);

        int databaseSizeBeforeCreate = kemrMedicalBillRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKemrMedicalBillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkKemrMedicalBillTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrMedicalBillRepository.findAll().size();
        // set the field null
        kemrMedicalBill.setKemrMedicalBillTotal(null);

        // Create the KemrMedicalBill, which fails.

        restKemrMedicalBillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrMedicalBillNhsShareIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrMedicalBillRepository.findAll().size();
        // set the field null
        kemrMedicalBill.setKemrMedicalBillNhsShare(null);

        // Create the KemrMedicalBill, which fails.

        restKemrMedicalBillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrMedicalBillPatientShareIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrMedicalBillRepository.findAll().size();
        // set the field null
        kemrMedicalBill.setKemrMedicalBillPatientShare(null);

        // Create the KemrMedicalBill, which fails.

        restKemrMedicalBillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrMedicalBillMethodIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrMedicalBillRepository.findAll().size();
        // set the field null
        kemrMedicalBill.setKemrMedicalBillMethod(null);

        // Create the KemrMedicalBill, which fails.

        restKemrMedicalBillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrMedicalBillDeliveryTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrMedicalBillRepository.findAll().size();
        // set the field null
        kemrMedicalBill.setKemrMedicalBillDeliveryType(null);

        // Create the KemrMedicalBill, which fails.

        restKemrMedicalBillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrMedicalBillCashReceiptIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrMedicalBillRepository.findAll().size();
        // set the field null
        kemrMedicalBill.setKemrMedicalBillCashReceipt(null);

        // Create the KemrMedicalBill, which fails.

        restKemrMedicalBillMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllKemrMedicalBills() throws Exception {
        // Initialize the database
        kemrMedicalBillRepository.saveAndFlush(kemrMedicalBill);

        // Get all the kemrMedicalBillList
        restKemrMedicalBillMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kemrMedicalBill.getId().intValue())))
            .andExpect(jsonPath("$.[*].kemrMedicalBillTotal").value(hasItem(DEFAULT_KEMR_MEDICAL_BILL_TOTAL)))
            .andExpect(jsonPath("$.[*].kemrMedicalBillNhsShare").value(hasItem(DEFAULT_KEMR_MEDICAL_BILL_NHS_SHARE)))
            .andExpect(jsonPath("$.[*].kemrMedicalBillPatientShare").value(hasItem(DEFAULT_KEMR_MEDICAL_BILL_PATIENT_SHARE)))
            .andExpect(jsonPath("$.[*].kemrMedicalBillMethod").value(hasItem(DEFAULT_KEMR_MEDICAL_BILL_METHOD)))
            .andExpect(jsonPath("$.[*].kemrMedicalBillDeliveryType").value(hasItem(DEFAULT_KEMR_MEDICAL_BILL_DELIVERY_TYPE)))
            .andExpect(jsonPath("$.[*].kemrMedicalBillCashReceipt").value(hasItem(DEFAULT_KEMR_MEDICAL_BILL_CASH_RECEIPT)));
    }

    @Test
    @Transactional
    void getKemrMedicalBill() throws Exception {
        // Initialize the database
        kemrMedicalBillRepository.saveAndFlush(kemrMedicalBill);

        // Get the kemrMedicalBill
        restKemrMedicalBillMockMvc
            .perform(get(ENTITY_API_URL_ID, kemrMedicalBill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kemrMedicalBill.getId().intValue()))
            .andExpect(jsonPath("$.kemrMedicalBillTotal").value(DEFAULT_KEMR_MEDICAL_BILL_TOTAL))
            .andExpect(jsonPath("$.kemrMedicalBillNhsShare").value(DEFAULT_KEMR_MEDICAL_BILL_NHS_SHARE))
            .andExpect(jsonPath("$.kemrMedicalBillPatientShare").value(DEFAULT_KEMR_MEDICAL_BILL_PATIENT_SHARE))
            .andExpect(jsonPath("$.kemrMedicalBillMethod").value(DEFAULT_KEMR_MEDICAL_BILL_METHOD))
            .andExpect(jsonPath("$.kemrMedicalBillDeliveryType").value(DEFAULT_KEMR_MEDICAL_BILL_DELIVERY_TYPE))
            .andExpect(jsonPath("$.kemrMedicalBillCashReceipt").value(DEFAULT_KEMR_MEDICAL_BILL_CASH_RECEIPT));
    }

    @Test
    @Transactional
    void getNonExistingKemrMedicalBill() throws Exception {
        // Get the kemrMedicalBill
        restKemrMedicalBillMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewKemrMedicalBill() throws Exception {
        // Initialize the database
        kemrMedicalBillRepository.saveAndFlush(kemrMedicalBill);

        int databaseSizeBeforeUpdate = kemrMedicalBillRepository.findAll().size();

        // Update the kemrMedicalBill
        KemrMedicalBill updatedKemrMedicalBill = kemrMedicalBillRepository.findById(kemrMedicalBill.getId()).get();
        // Disconnect from session so that the updates on updatedKemrMedicalBill are not directly saved in db
        em.detach(updatedKemrMedicalBill);
        updatedKemrMedicalBill
            .kemrMedicalBillTotal(UPDATED_KEMR_MEDICAL_BILL_TOTAL)
            .kemrMedicalBillNhsShare(UPDATED_KEMR_MEDICAL_BILL_NHS_SHARE)
            .kemrMedicalBillPatientShare(UPDATED_KEMR_MEDICAL_BILL_PATIENT_SHARE)
            .kemrMedicalBillMethod(UPDATED_KEMR_MEDICAL_BILL_METHOD)
            .kemrMedicalBillDeliveryType(UPDATED_KEMR_MEDICAL_BILL_DELIVERY_TYPE)
            .kemrMedicalBillCashReceipt(UPDATED_KEMR_MEDICAL_BILL_CASH_RECEIPT);

        restKemrMedicalBillMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKemrMedicalBill.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKemrMedicalBill))
            )
            .andExpect(status().isOk());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeUpdate);
        KemrMedicalBill testKemrMedicalBill = kemrMedicalBillList.get(kemrMedicalBillList.size() - 1);
        assertThat(testKemrMedicalBill.getKemrMedicalBillTotal()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_TOTAL);
        assertThat(testKemrMedicalBill.getKemrMedicalBillNhsShare()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_NHS_SHARE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillPatientShare()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_PATIENT_SHARE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillMethod()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_METHOD);
        assertThat(testKemrMedicalBill.getKemrMedicalBillDeliveryType()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_DELIVERY_TYPE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillCashReceipt()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_CASH_RECEIPT);
    }

    @Test
    @Transactional
    void putNonExistingKemrMedicalBill() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalBillRepository.findAll().size();
        kemrMedicalBill.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrMedicalBillMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kemrMedicalBill.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKemrMedicalBill() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalBillRepository.findAll().size();
        kemrMedicalBill.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicalBillMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKemrMedicalBill() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalBillRepository.findAll().size();
        kemrMedicalBill.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicalBillMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKemrMedicalBillWithPatch() throws Exception {
        // Initialize the database
        kemrMedicalBillRepository.saveAndFlush(kemrMedicalBill);

        int databaseSizeBeforeUpdate = kemrMedicalBillRepository.findAll().size();

        // Update the kemrMedicalBill using partial update
        KemrMedicalBill partialUpdatedKemrMedicalBill = new KemrMedicalBill();
        partialUpdatedKemrMedicalBill.setId(kemrMedicalBill.getId());

        partialUpdatedKemrMedicalBill
            .kemrMedicalBillTotal(UPDATED_KEMR_MEDICAL_BILL_TOTAL)
            .kemrMedicalBillNhsShare(UPDATED_KEMR_MEDICAL_BILL_NHS_SHARE)
            .kemrMedicalBillDeliveryType(UPDATED_KEMR_MEDICAL_BILL_DELIVERY_TYPE);

        restKemrMedicalBillMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrMedicalBill.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrMedicalBill))
            )
            .andExpect(status().isOk());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeUpdate);
        KemrMedicalBill testKemrMedicalBill = kemrMedicalBillList.get(kemrMedicalBillList.size() - 1);
        assertThat(testKemrMedicalBill.getKemrMedicalBillTotal()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_TOTAL);
        assertThat(testKemrMedicalBill.getKemrMedicalBillNhsShare()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_NHS_SHARE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillPatientShare()).isEqualTo(DEFAULT_KEMR_MEDICAL_BILL_PATIENT_SHARE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillMethod()).isEqualTo(DEFAULT_KEMR_MEDICAL_BILL_METHOD);
        assertThat(testKemrMedicalBill.getKemrMedicalBillDeliveryType()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_DELIVERY_TYPE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillCashReceipt()).isEqualTo(DEFAULT_KEMR_MEDICAL_BILL_CASH_RECEIPT);
    }

    @Test
    @Transactional
    void fullUpdateKemrMedicalBillWithPatch() throws Exception {
        // Initialize the database
        kemrMedicalBillRepository.saveAndFlush(kemrMedicalBill);

        int databaseSizeBeforeUpdate = kemrMedicalBillRepository.findAll().size();

        // Update the kemrMedicalBill using partial update
        KemrMedicalBill partialUpdatedKemrMedicalBill = new KemrMedicalBill();
        partialUpdatedKemrMedicalBill.setId(kemrMedicalBill.getId());

        partialUpdatedKemrMedicalBill
            .kemrMedicalBillTotal(UPDATED_KEMR_MEDICAL_BILL_TOTAL)
            .kemrMedicalBillNhsShare(UPDATED_KEMR_MEDICAL_BILL_NHS_SHARE)
            .kemrMedicalBillPatientShare(UPDATED_KEMR_MEDICAL_BILL_PATIENT_SHARE)
            .kemrMedicalBillMethod(UPDATED_KEMR_MEDICAL_BILL_METHOD)
            .kemrMedicalBillDeliveryType(UPDATED_KEMR_MEDICAL_BILL_DELIVERY_TYPE)
            .kemrMedicalBillCashReceipt(UPDATED_KEMR_MEDICAL_BILL_CASH_RECEIPT);

        restKemrMedicalBillMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrMedicalBill.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrMedicalBill))
            )
            .andExpect(status().isOk());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeUpdate);
        KemrMedicalBill testKemrMedicalBill = kemrMedicalBillList.get(kemrMedicalBillList.size() - 1);
        assertThat(testKemrMedicalBill.getKemrMedicalBillTotal()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_TOTAL);
        assertThat(testKemrMedicalBill.getKemrMedicalBillNhsShare()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_NHS_SHARE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillPatientShare()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_PATIENT_SHARE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillMethod()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_METHOD);
        assertThat(testKemrMedicalBill.getKemrMedicalBillDeliveryType()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_DELIVERY_TYPE);
        assertThat(testKemrMedicalBill.getKemrMedicalBillCashReceipt()).isEqualTo(UPDATED_KEMR_MEDICAL_BILL_CASH_RECEIPT);
    }

    @Test
    @Transactional
    void patchNonExistingKemrMedicalBill() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalBillRepository.findAll().size();
        kemrMedicalBill.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrMedicalBillMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kemrMedicalBill.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKemrMedicalBill() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalBillRepository.findAll().size();
        kemrMedicalBill.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicalBillMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKemrMedicalBill() throws Exception {
        int databaseSizeBeforeUpdate = kemrMedicalBillRepository.findAll().size();
        kemrMedicalBill.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrMedicalBillMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrMedicalBill))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrMedicalBill in the database
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKemrMedicalBill() throws Exception {
        // Initialize the database
        kemrMedicalBillRepository.saveAndFlush(kemrMedicalBill);

        int databaseSizeBeforeDelete = kemrMedicalBillRepository.findAll().size();

        // Delete the kemrMedicalBill
        restKemrMedicalBillMockMvc
            .perform(delete(ENTITY_API_URL_ID, kemrMedicalBill.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KemrMedicalBill> kemrMedicalBillList = kemrMedicalBillRepository.findAll();
        assertThat(kemrMedicalBillList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
