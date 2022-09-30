package com.jysoft.jyemr.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jysoft.jyemr.IntegrationTest;
import com.jysoft.jyemr.domain.KemrPatient;
import com.jysoft.jyemr.repository.KemrPatientRepository;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link KemrPatientResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KemrPatientResourceIT {

    private static final String DEFAULT_KEMR_PATIENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_PATIENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_PATIENT_SEX = "A";
    private static final String UPDATED_KEMR_PATIENT_SEX = "B";

    private static final LocalDate DEFAULT_KEMR_PATIENT_BIRTHDAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_KEMR_PATIENT_BIRTHDAY = LocalDate.now(ZoneId.systemDefault());

    private static final Instant DEFAULT_KEMR_PATIENT_REGISTRATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_KEMR_PATIENT_REGISTRATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_KEMR_PATIENT_SOCIAL_SECURITY_NO = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_PATIENT_SOCIAL_SECURITY_NO = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_PATIENT_QUALIFICATION_CHECK = "A";
    private static final String UPDATED_KEMR_PATIENT_QUALIFICATION_CHECK = "B";

    private static final String DEFAULT_KEMR_PATIENT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_PATIENT_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_PATIENT_NURSE_MEMO = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_PATIENT_NURSE_MEMO = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_PATIENT_CELLPHONE = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_PATIENT_CELLPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_PATIENT_LANDLINE = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_PATIENT_LANDLINE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/kemr-patients";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KemrPatientRepository kemrPatientRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKemrPatientMockMvc;

    private KemrPatient kemrPatient;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrPatient createEntity(EntityManager em) {
        KemrPatient kemrPatient = new KemrPatient()
            .kemrPatientName(DEFAULT_KEMR_PATIENT_NAME)
            .kemrPatientSex(DEFAULT_KEMR_PATIENT_SEX)
            .kemrPatientBirthday(DEFAULT_KEMR_PATIENT_BIRTHDAY)
            .kemrPatientRegistrationDate(DEFAULT_KEMR_PATIENT_REGISTRATION_DATE)
            .kemrPatientSocialSecurityNo(DEFAULT_KEMR_PATIENT_SOCIAL_SECURITY_NO)
            .kemrPatientQualificationCheck(DEFAULT_KEMR_PATIENT_QUALIFICATION_CHECK)
            .kemrPatientAddress(DEFAULT_KEMR_PATIENT_ADDRESS)
            .kemrPatientNurseMemo(DEFAULT_KEMR_PATIENT_NURSE_MEMO)
            .kemrPatientCellphone(DEFAULT_KEMR_PATIENT_CELLPHONE)
            .kemrPatientLandline(DEFAULT_KEMR_PATIENT_LANDLINE);
        return kemrPatient;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrPatient createUpdatedEntity(EntityManager em) {
        KemrPatient kemrPatient = new KemrPatient()
            .kemrPatientName(UPDATED_KEMR_PATIENT_NAME)
            .kemrPatientSex(UPDATED_KEMR_PATIENT_SEX)
            .kemrPatientBirthday(UPDATED_KEMR_PATIENT_BIRTHDAY)
            .kemrPatientRegistrationDate(UPDATED_KEMR_PATIENT_REGISTRATION_DATE)
            .kemrPatientSocialSecurityNo(UPDATED_KEMR_PATIENT_SOCIAL_SECURITY_NO)
            .kemrPatientQualificationCheck(UPDATED_KEMR_PATIENT_QUALIFICATION_CHECK)
            .kemrPatientAddress(UPDATED_KEMR_PATIENT_ADDRESS)
            .kemrPatientNurseMemo(UPDATED_KEMR_PATIENT_NURSE_MEMO)
            .kemrPatientCellphone(UPDATED_KEMR_PATIENT_CELLPHONE)
            .kemrPatientLandline(UPDATED_KEMR_PATIENT_LANDLINE);
        return kemrPatient;
    }

    @BeforeEach
    public void initTest() {
        kemrPatient = createEntity(em);
    }

    @Test
    @Transactional
    void createKemrPatient() throws Exception {
        int databaseSizeBeforeCreate = kemrPatientRepository.findAll().size();
        // Create the KemrPatient
        restKemrPatientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPatient)))
            .andExpect(status().isCreated());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeCreate + 1);
        KemrPatient testKemrPatient = kemrPatientList.get(kemrPatientList.size() - 1);
        assertThat(testKemrPatient.getKemrPatientName()).isEqualTo(DEFAULT_KEMR_PATIENT_NAME);
        assertThat(testKemrPatient.getKemrPatientSex()).isEqualTo(DEFAULT_KEMR_PATIENT_SEX);
        assertThat(testKemrPatient.getKemrPatientBirthday()).isEqualTo(DEFAULT_KEMR_PATIENT_BIRTHDAY);
        assertThat(testKemrPatient.getKemrPatientRegistrationDate()).isEqualTo(DEFAULT_KEMR_PATIENT_REGISTRATION_DATE);
        assertThat(testKemrPatient.getKemrPatientSocialSecurityNo()).isEqualTo(DEFAULT_KEMR_PATIENT_SOCIAL_SECURITY_NO);
        assertThat(testKemrPatient.getKemrPatientQualificationCheck()).isEqualTo(DEFAULT_KEMR_PATIENT_QUALIFICATION_CHECK);
        assertThat(testKemrPatient.getKemrPatientAddress()).isEqualTo(DEFAULT_KEMR_PATIENT_ADDRESS);
        assertThat(testKemrPatient.getKemrPatientNurseMemo()).isEqualTo(DEFAULT_KEMR_PATIENT_NURSE_MEMO);
        assertThat(testKemrPatient.getKemrPatientCellphone()).isEqualTo(DEFAULT_KEMR_PATIENT_CELLPHONE);
        assertThat(testKemrPatient.getKemrPatientLandline()).isEqualTo(DEFAULT_KEMR_PATIENT_LANDLINE);
    }

    @Test
    @Transactional
    void createKemrPatientWithExistingId() throws Exception {
        // Create the KemrPatient with an existing ID
        kemrPatient.setId(1L);

        int databaseSizeBeforeCreate = kemrPatientRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKemrPatientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPatient)))
            .andExpect(status().isBadRequest());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkKemrPatientNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrPatientRepository.findAll().size();
        // set the field null
        kemrPatient.setKemrPatientName(null);

        // Create the KemrPatient, which fails.

        restKemrPatientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPatient)))
            .andExpect(status().isBadRequest());

        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrPatientSexIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrPatientRepository.findAll().size();
        // set the field null
        kemrPatient.setKemrPatientSex(null);

        // Create the KemrPatient, which fails.

        restKemrPatientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPatient)))
            .andExpect(status().isBadRequest());

        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrPatientBirthdayIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrPatientRepository.findAll().size();
        // set the field null
        kemrPatient.setKemrPatientBirthday(null);

        // Create the KemrPatient, which fails.

        restKemrPatientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPatient)))
            .andExpect(status().isBadRequest());

        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrPatientRegistrationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrPatientRepository.findAll().size();
        // set the field null
        kemrPatient.setKemrPatientRegistrationDate(null);

        // Create the KemrPatient, which fails.

        restKemrPatientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPatient)))
            .andExpect(status().isBadRequest());

        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrPatientSocialSecurityNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrPatientRepository.findAll().size();
        // set the field null
        kemrPatient.setKemrPatientSocialSecurityNo(null);

        // Create the KemrPatient, which fails.

        restKemrPatientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPatient)))
            .andExpect(status().isBadRequest());

        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrPatientQualificationCheckIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrPatientRepository.findAll().size();
        // set the field null
        kemrPatient.setKemrPatientQualificationCheck(null);

        // Create the KemrPatient, which fails.

        restKemrPatientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPatient)))
            .andExpect(status().isBadRequest());

        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllKemrPatients() throws Exception {
        // Initialize the database
        kemrPatientRepository.saveAndFlush(kemrPatient);

        // Get all the kemrPatientList
        restKemrPatientMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kemrPatient.getId().intValue())))
            .andExpect(jsonPath("$.[*].kemrPatientName").value(hasItem(DEFAULT_KEMR_PATIENT_NAME)))
            .andExpect(jsonPath("$.[*].kemrPatientSex").value(hasItem(DEFAULT_KEMR_PATIENT_SEX)))
            .andExpect(jsonPath("$.[*].kemrPatientBirthday").value(hasItem(DEFAULT_KEMR_PATIENT_BIRTHDAY.toString())))
            .andExpect(jsonPath("$.[*].kemrPatientRegistrationDate").value(hasItem(DEFAULT_KEMR_PATIENT_REGISTRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].kemrPatientSocialSecurityNo").value(hasItem(DEFAULT_KEMR_PATIENT_SOCIAL_SECURITY_NO)))
            .andExpect(jsonPath("$.[*].kemrPatientQualificationCheck").value(hasItem(DEFAULT_KEMR_PATIENT_QUALIFICATION_CHECK)))
            .andExpect(jsonPath("$.[*].kemrPatientAddress").value(hasItem(DEFAULT_KEMR_PATIENT_ADDRESS)))
            .andExpect(jsonPath("$.[*].kemrPatientNurseMemo").value(hasItem(DEFAULT_KEMR_PATIENT_NURSE_MEMO)))
            .andExpect(jsonPath("$.[*].kemrPatientCellphone").value(hasItem(DEFAULT_KEMR_PATIENT_CELLPHONE)))
            .andExpect(jsonPath("$.[*].kemrPatientLandline").value(hasItem(DEFAULT_KEMR_PATIENT_LANDLINE)));
    }

    @Test
    @Transactional
    void getKemrPatient() throws Exception {
        // Initialize the database
        kemrPatientRepository.saveAndFlush(kemrPatient);

        // Get the kemrPatient
        restKemrPatientMockMvc
            .perform(get(ENTITY_API_URL_ID, kemrPatient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kemrPatient.getId().intValue()))
            .andExpect(jsonPath("$.kemrPatientName").value(DEFAULT_KEMR_PATIENT_NAME))
            .andExpect(jsonPath("$.kemrPatientSex").value(DEFAULT_KEMR_PATIENT_SEX))
            .andExpect(jsonPath("$.kemrPatientBirthday").value(DEFAULT_KEMR_PATIENT_BIRTHDAY.toString()))
            .andExpect(jsonPath("$.kemrPatientRegistrationDate").value(DEFAULT_KEMR_PATIENT_REGISTRATION_DATE.toString()))
            .andExpect(jsonPath("$.kemrPatientSocialSecurityNo").value(DEFAULT_KEMR_PATIENT_SOCIAL_SECURITY_NO))
            .andExpect(jsonPath("$.kemrPatientQualificationCheck").value(DEFAULT_KEMR_PATIENT_QUALIFICATION_CHECK))
            .andExpect(jsonPath("$.kemrPatientAddress").value(DEFAULT_KEMR_PATIENT_ADDRESS))
            .andExpect(jsonPath("$.kemrPatientNurseMemo").value(DEFAULT_KEMR_PATIENT_NURSE_MEMO))
            .andExpect(jsonPath("$.kemrPatientCellphone").value(DEFAULT_KEMR_PATIENT_CELLPHONE))
            .andExpect(jsonPath("$.kemrPatientLandline").value(DEFAULT_KEMR_PATIENT_LANDLINE));
    }

    @Test
    @Transactional
    void getNonExistingKemrPatient() throws Exception {
        // Get the kemrPatient
        restKemrPatientMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingKemrPatient() throws Exception {
        // Initialize the database
        kemrPatientRepository.saveAndFlush(kemrPatient);

        int databaseSizeBeforeUpdate = kemrPatientRepository.findAll().size();

        // Update the kemrPatient
        KemrPatient updatedKemrPatient = kemrPatientRepository.findById(kemrPatient.getId()).get();
        // Disconnect from session so that the updates on updatedKemrPatient are not directly saved in db
        em.detach(updatedKemrPatient);
        updatedKemrPatient
            .kemrPatientName(UPDATED_KEMR_PATIENT_NAME)
            .kemrPatientSex(UPDATED_KEMR_PATIENT_SEX)
            .kemrPatientBirthday(UPDATED_KEMR_PATIENT_BIRTHDAY)
            .kemrPatientRegistrationDate(UPDATED_KEMR_PATIENT_REGISTRATION_DATE)
            .kemrPatientSocialSecurityNo(UPDATED_KEMR_PATIENT_SOCIAL_SECURITY_NO)
            .kemrPatientQualificationCheck(UPDATED_KEMR_PATIENT_QUALIFICATION_CHECK)
            .kemrPatientAddress(UPDATED_KEMR_PATIENT_ADDRESS)
            .kemrPatientNurseMemo(UPDATED_KEMR_PATIENT_NURSE_MEMO)
            .kemrPatientCellphone(UPDATED_KEMR_PATIENT_CELLPHONE)
            .kemrPatientLandline(UPDATED_KEMR_PATIENT_LANDLINE);

        restKemrPatientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKemrPatient.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKemrPatient))
            )
            .andExpect(status().isOk());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeUpdate);
        KemrPatient testKemrPatient = kemrPatientList.get(kemrPatientList.size() - 1);
        assertThat(testKemrPatient.getKemrPatientName()).isEqualTo(UPDATED_KEMR_PATIENT_NAME);
        assertThat(testKemrPatient.getKemrPatientSex()).isEqualTo(UPDATED_KEMR_PATIENT_SEX);
        assertThat(testKemrPatient.getKemrPatientBirthday()).isEqualTo(UPDATED_KEMR_PATIENT_BIRTHDAY);
        assertThat(testKemrPatient.getKemrPatientRegistrationDate()).isEqualTo(UPDATED_KEMR_PATIENT_REGISTRATION_DATE);
        assertThat(testKemrPatient.getKemrPatientSocialSecurityNo()).isEqualTo(UPDATED_KEMR_PATIENT_SOCIAL_SECURITY_NO);
        assertThat(testKemrPatient.getKemrPatientQualificationCheck()).isEqualTo(UPDATED_KEMR_PATIENT_QUALIFICATION_CHECK);
        assertThat(testKemrPatient.getKemrPatientAddress()).isEqualTo(UPDATED_KEMR_PATIENT_ADDRESS);
        assertThat(testKemrPatient.getKemrPatientNurseMemo()).isEqualTo(UPDATED_KEMR_PATIENT_NURSE_MEMO);
        assertThat(testKemrPatient.getKemrPatientCellphone()).isEqualTo(UPDATED_KEMR_PATIENT_CELLPHONE);
        assertThat(testKemrPatient.getKemrPatientLandline()).isEqualTo(UPDATED_KEMR_PATIENT_LANDLINE);
    }

    @Test
    @Transactional
    void putNonExistingKemrPatient() throws Exception {
        int databaseSizeBeforeUpdate = kemrPatientRepository.findAll().size();
        kemrPatient.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrPatientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kemrPatient.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrPatient))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKemrPatient() throws Exception {
        int databaseSizeBeforeUpdate = kemrPatientRepository.findAll().size();
        kemrPatient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrPatientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrPatient))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKemrPatient() throws Exception {
        int databaseSizeBeforeUpdate = kemrPatientRepository.findAll().size();
        kemrPatient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrPatientMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrPatient)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKemrPatientWithPatch() throws Exception {
        // Initialize the database
        kemrPatientRepository.saveAndFlush(kemrPatient);

        int databaseSizeBeforeUpdate = kemrPatientRepository.findAll().size();

        // Update the kemrPatient using partial update
        KemrPatient partialUpdatedKemrPatient = new KemrPatient();
        partialUpdatedKemrPatient.setId(kemrPatient.getId());

        partialUpdatedKemrPatient.kemrPatientName(UPDATED_KEMR_PATIENT_NAME).kemrPatientAddress(UPDATED_KEMR_PATIENT_ADDRESS);

        restKemrPatientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrPatient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrPatient))
            )
            .andExpect(status().isOk());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeUpdate);
        KemrPatient testKemrPatient = kemrPatientList.get(kemrPatientList.size() - 1);
        assertThat(testKemrPatient.getKemrPatientName()).isEqualTo(UPDATED_KEMR_PATIENT_NAME);
        assertThat(testKemrPatient.getKemrPatientSex()).isEqualTo(DEFAULT_KEMR_PATIENT_SEX);
        assertThat(testKemrPatient.getKemrPatientBirthday()).isEqualTo(DEFAULT_KEMR_PATIENT_BIRTHDAY);
        assertThat(testKemrPatient.getKemrPatientRegistrationDate()).isEqualTo(DEFAULT_KEMR_PATIENT_REGISTRATION_DATE);
        assertThat(testKemrPatient.getKemrPatientSocialSecurityNo()).isEqualTo(DEFAULT_KEMR_PATIENT_SOCIAL_SECURITY_NO);
        assertThat(testKemrPatient.getKemrPatientQualificationCheck()).isEqualTo(DEFAULT_KEMR_PATIENT_QUALIFICATION_CHECK);
        assertThat(testKemrPatient.getKemrPatientAddress()).isEqualTo(UPDATED_KEMR_PATIENT_ADDRESS);
        assertThat(testKemrPatient.getKemrPatientNurseMemo()).isEqualTo(DEFAULT_KEMR_PATIENT_NURSE_MEMO);
        assertThat(testKemrPatient.getKemrPatientCellphone()).isEqualTo(DEFAULT_KEMR_PATIENT_CELLPHONE);
        assertThat(testKemrPatient.getKemrPatientLandline()).isEqualTo(DEFAULT_KEMR_PATIENT_LANDLINE);
    }

    @Test
    @Transactional
    void fullUpdateKemrPatientWithPatch() throws Exception {
        // Initialize the database
        kemrPatientRepository.saveAndFlush(kemrPatient);

        int databaseSizeBeforeUpdate = kemrPatientRepository.findAll().size();

        // Update the kemrPatient using partial update
        KemrPatient partialUpdatedKemrPatient = new KemrPatient();
        partialUpdatedKemrPatient.setId(kemrPatient.getId());

        partialUpdatedKemrPatient
            .kemrPatientName(UPDATED_KEMR_PATIENT_NAME)
            .kemrPatientSex(UPDATED_KEMR_PATIENT_SEX)
            .kemrPatientBirthday(UPDATED_KEMR_PATIENT_BIRTHDAY)
            .kemrPatientRegistrationDate(UPDATED_KEMR_PATIENT_REGISTRATION_DATE)
            .kemrPatientSocialSecurityNo(UPDATED_KEMR_PATIENT_SOCIAL_SECURITY_NO)
            .kemrPatientQualificationCheck(UPDATED_KEMR_PATIENT_QUALIFICATION_CHECK)
            .kemrPatientAddress(UPDATED_KEMR_PATIENT_ADDRESS)
            .kemrPatientNurseMemo(UPDATED_KEMR_PATIENT_NURSE_MEMO)
            .kemrPatientCellphone(UPDATED_KEMR_PATIENT_CELLPHONE)
            .kemrPatientLandline(UPDATED_KEMR_PATIENT_LANDLINE);

        restKemrPatientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrPatient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrPatient))
            )
            .andExpect(status().isOk());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeUpdate);
        KemrPatient testKemrPatient = kemrPatientList.get(kemrPatientList.size() - 1);
        assertThat(testKemrPatient.getKemrPatientName()).isEqualTo(UPDATED_KEMR_PATIENT_NAME);
        assertThat(testKemrPatient.getKemrPatientSex()).isEqualTo(UPDATED_KEMR_PATIENT_SEX);
        assertThat(testKemrPatient.getKemrPatientBirthday()).isEqualTo(UPDATED_KEMR_PATIENT_BIRTHDAY);
        assertThat(testKemrPatient.getKemrPatientRegistrationDate()).isEqualTo(UPDATED_KEMR_PATIENT_REGISTRATION_DATE);
        assertThat(testKemrPatient.getKemrPatientSocialSecurityNo()).isEqualTo(UPDATED_KEMR_PATIENT_SOCIAL_SECURITY_NO);
        assertThat(testKemrPatient.getKemrPatientQualificationCheck()).isEqualTo(UPDATED_KEMR_PATIENT_QUALIFICATION_CHECK);
        assertThat(testKemrPatient.getKemrPatientAddress()).isEqualTo(UPDATED_KEMR_PATIENT_ADDRESS);
        assertThat(testKemrPatient.getKemrPatientNurseMemo()).isEqualTo(UPDATED_KEMR_PATIENT_NURSE_MEMO);
        assertThat(testKemrPatient.getKemrPatientCellphone()).isEqualTo(UPDATED_KEMR_PATIENT_CELLPHONE);
        assertThat(testKemrPatient.getKemrPatientLandline()).isEqualTo(UPDATED_KEMR_PATIENT_LANDLINE);
    }

    @Test
    @Transactional
    void patchNonExistingKemrPatient() throws Exception {
        int databaseSizeBeforeUpdate = kemrPatientRepository.findAll().size();
        kemrPatient.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrPatientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kemrPatient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrPatient))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKemrPatient() throws Exception {
        int databaseSizeBeforeUpdate = kemrPatientRepository.findAll().size();
        kemrPatient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrPatientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrPatient))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKemrPatient() throws Exception {
        int databaseSizeBeforeUpdate = kemrPatientRepository.findAll().size();
        kemrPatient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrPatientMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(kemrPatient))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrPatient in the database
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKemrPatient() throws Exception {
        // Initialize the database
        kemrPatientRepository.saveAndFlush(kemrPatient);

        int databaseSizeBeforeDelete = kemrPatientRepository.findAll().size();

        // Delete the kemrPatient
        restKemrPatientMockMvc
            .perform(delete(ENTITY_API_URL_ID, kemrPatient.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KemrPatient> kemrPatientList = kemrPatientRepository.findAll();
        assertThat(kemrPatientList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
