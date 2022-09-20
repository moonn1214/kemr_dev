package com.jysoft.jyemr.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jysoft.jyemr.IntegrationTest;
import com.jysoft.jyemr.domain.KemrInstitution;
import com.jysoft.jyemr.repository.KemrInstitutionRepository;
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
 * Integration tests for the {@link KemrInstitutionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KemrInstitutionResourceIT {

    private static final String DEFAULT_KEMR_INSTITUTION_ID = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_ID = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_INSTITUTION_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_INSTITUTION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_INSTITUTION_DEPARTMENT = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_DEPARTMENT = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_INSTITUTION_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_POSITION = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_INSTITUTION_MANAGER = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_MANAGER = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_INSTITUTION_CELLPHONE = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_CELLPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_INSTITUTION_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_KEMR_INSTITUTION_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_WEBSITE = "BBBBBBBBBB";

    private static final Instant DEFAULT_KEMR_INSTITUTION_AGREE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_KEMR_INSTITUTION_AGREE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_KEMR_INSTITUTION_STATUS = "A";
    private static final String UPDATED_KEMR_INSTITUTION_STATUS = "B";

    private static final Instant DEFAULT_KEMR_INSTITUTION_MODIFICATION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_KEMR_INSTITUTION_MODIFICATION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_KEMR_INSTITUTION_WITHDRAWAL = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_KEMR_INSTITUTION_WITHDRAWAL = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_KEMR_INSTITUTION_LANDLINE = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_LANDLINE = "BBBBBBBBBB";

    private static final Integer DEFAULT_KEMR_INSTITUTION_FAIL = 1;
    private static final Integer UPDATED_KEMR_INSTITUTION_FAIL = 2;

    private static final Instant DEFAULT_KEMR_INSTITUTION_FAILTIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_KEMR_INSTITUTION_FAILTIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_KEMR_INSTITUTION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_KEMR_INSTITUTION_NUMBER = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/kemr-institutions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private KemrInstitutionRepository kemrInstitutionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKemrInstitutionMockMvc;

    private KemrInstitution kemrInstitution;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrInstitution createEntity(EntityManager em) {
        KemrInstitution kemrInstitution = new KemrInstitution()
            .kemrInstitutionId(DEFAULT_KEMR_INSTITUTION_ID)
            .kemrInstitutionPassword(DEFAULT_KEMR_INSTITUTION_PASSWORD)
            .kemrInstitutionName(DEFAULT_KEMR_INSTITUTION_NAME)
            .kemrInstitutionDepartment(DEFAULT_KEMR_INSTITUTION_DEPARTMENT)
            .kemrInstitutionPosition(DEFAULT_KEMR_INSTITUTION_POSITION)
            .kemrInstitutionManager(DEFAULT_KEMR_INSTITUTION_MANAGER)
            .kemrInstitutionCellphone(DEFAULT_KEMR_INSTITUTION_CELLPHONE)
            .kemrInstitutionEmail(DEFAULT_KEMR_INSTITUTION_EMAIL)
            .kemrInstitutionWebsite(DEFAULT_KEMR_INSTITUTION_WEBSITE)
            .kemrInstitutionAgree(DEFAULT_KEMR_INSTITUTION_AGREE)
            .kemrInstitutionStatus(DEFAULT_KEMR_INSTITUTION_STATUS)
            .kemrInstitutionModification(DEFAULT_KEMR_INSTITUTION_MODIFICATION)
            .kemrInstitutionWithdrawal(DEFAULT_KEMR_INSTITUTION_WITHDRAWAL)
            .kemrInstitutionLandline(DEFAULT_KEMR_INSTITUTION_LANDLINE)
            .kemrInstitutionFail(DEFAULT_KEMR_INSTITUTION_FAIL)
            .kemrInstitutionFailtime(DEFAULT_KEMR_INSTITUTION_FAILTIME)
            .kemrInstitutionNumber(DEFAULT_KEMR_INSTITUTION_NUMBER);
        return kemrInstitution;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KemrInstitution createUpdatedEntity(EntityManager em) {
        KemrInstitution kemrInstitution = new KemrInstitution()
            .kemrInstitutionId(UPDATED_KEMR_INSTITUTION_ID)
            .kemrInstitutionPassword(UPDATED_KEMR_INSTITUTION_PASSWORD)
            .kemrInstitutionName(UPDATED_KEMR_INSTITUTION_NAME)
            .kemrInstitutionDepartment(UPDATED_KEMR_INSTITUTION_DEPARTMENT)
            .kemrInstitutionPosition(UPDATED_KEMR_INSTITUTION_POSITION)
            .kemrInstitutionManager(UPDATED_KEMR_INSTITUTION_MANAGER)
            .kemrInstitutionCellphone(UPDATED_KEMR_INSTITUTION_CELLPHONE)
            .kemrInstitutionEmail(UPDATED_KEMR_INSTITUTION_EMAIL)
            .kemrInstitutionWebsite(UPDATED_KEMR_INSTITUTION_WEBSITE)
            .kemrInstitutionAgree(UPDATED_KEMR_INSTITUTION_AGREE)
            .kemrInstitutionStatus(UPDATED_KEMR_INSTITUTION_STATUS)
            .kemrInstitutionModification(UPDATED_KEMR_INSTITUTION_MODIFICATION)
            .kemrInstitutionWithdrawal(UPDATED_KEMR_INSTITUTION_WITHDRAWAL)
            .kemrInstitutionLandline(UPDATED_KEMR_INSTITUTION_LANDLINE)
            .kemrInstitutionFail(UPDATED_KEMR_INSTITUTION_FAIL)
            .kemrInstitutionFailtime(UPDATED_KEMR_INSTITUTION_FAILTIME)
            .kemrInstitutionNumber(UPDATED_KEMR_INSTITUTION_NUMBER);
        return kemrInstitution;
    }

    @BeforeEach
    public void initTest() {
        kemrInstitution = createEntity(em);
    }

    @Test
    @Transactional
    void createKemrInstitution() throws Exception {
        int databaseSizeBeforeCreate = kemrInstitutionRepository.findAll().size();
        // Create the KemrInstitution
        restKemrInstitutionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isCreated());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeCreate + 1);
        KemrInstitution testKemrInstitution = kemrInstitutionList.get(kemrInstitutionList.size() - 1);
        assertThat(testKemrInstitution.getKemrInstitutionId()).isEqualTo(DEFAULT_KEMR_INSTITUTION_ID);
        assertThat(testKemrInstitution.getKemrInstitutionPassword()).isEqualTo(DEFAULT_KEMR_INSTITUTION_PASSWORD);
        assertThat(testKemrInstitution.getKemrInstitutionName()).isEqualTo(DEFAULT_KEMR_INSTITUTION_NAME);
        assertThat(testKemrInstitution.getKemrInstitutionDepartment()).isEqualTo(DEFAULT_KEMR_INSTITUTION_DEPARTMENT);
        assertThat(testKemrInstitution.getKemrInstitutionPosition()).isEqualTo(DEFAULT_KEMR_INSTITUTION_POSITION);
        assertThat(testKemrInstitution.getKemrInstitutionManager()).isEqualTo(DEFAULT_KEMR_INSTITUTION_MANAGER);
        assertThat(testKemrInstitution.getKemrInstitutionCellphone()).isEqualTo(DEFAULT_KEMR_INSTITUTION_CELLPHONE);
        assertThat(testKemrInstitution.getKemrInstitutionEmail()).isEqualTo(DEFAULT_KEMR_INSTITUTION_EMAIL);
        assertThat(testKemrInstitution.getKemrInstitutionWebsite()).isEqualTo(DEFAULT_KEMR_INSTITUTION_WEBSITE);
        assertThat(testKemrInstitution.getKemrInstitutionAgree()).isEqualTo(DEFAULT_KEMR_INSTITUTION_AGREE);
        assertThat(testKemrInstitution.getKemrInstitutionStatus()).isEqualTo(DEFAULT_KEMR_INSTITUTION_STATUS);
        assertThat(testKemrInstitution.getKemrInstitutionModification()).isEqualTo(DEFAULT_KEMR_INSTITUTION_MODIFICATION);
        assertThat(testKemrInstitution.getKemrInstitutionWithdrawal()).isEqualTo(DEFAULT_KEMR_INSTITUTION_WITHDRAWAL);
        assertThat(testKemrInstitution.getKemrInstitutionLandline()).isEqualTo(DEFAULT_KEMR_INSTITUTION_LANDLINE);
        assertThat(testKemrInstitution.getKemrInstitutionFail()).isEqualTo(DEFAULT_KEMR_INSTITUTION_FAIL);
        assertThat(testKemrInstitution.getKemrInstitutionFailtime()).isEqualTo(DEFAULT_KEMR_INSTITUTION_FAILTIME);
        assertThat(testKemrInstitution.getKemrInstitutionNumber()).isEqualTo(DEFAULT_KEMR_INSTITUTION_NUMBER);
    }

    @Test
    @Transactional
    void createKemrInstitutionWithExistingId() throws Exception {
        // Create the KemrInstitution with an existing ID
        kemrInstitution.setId(1L);

        int databaseSizeBeforeCreate = kemrInstitutionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKemrInstitutionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkKemrInstitutionIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrInstitutionRepository.findAll().size();
        // set the field null
        kemrInstitution.setKemrInstitutionId(null);

        // Create the KemrInstitution, which fails.

        restKemrInstitutionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrInstitutionPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrInstitutionRepository.findAll().size();
        // set the field null
        kemrInstitution.setKemrInstitutionPassword(null);

        // Create the KemrInstitution, which fails.

        restKemrInstitutionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrInstitutionNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrInstitutionRepository.findAll().size();
        // set the field null
        kemrInstitution.setKemrInstitutionName(null);

        // Create the KemrInstitution, which fails.

        restKemrInstitutionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrInstitutionManagerIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrInstitutionRepository.findAll().size();
        // set the field null
        kemrInstitution.setKemrInstitutionManager(null);

        // Create the KemrInstitution, which fails.

        restKemrInstitutionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrInstitutionCellphoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrInstitutionRepository.findAll().size();
        // set the field null
        kemrInstitution.setKemrInstitutionCellphone(null);

        // Create the KemrInstitution, which fails.

        restKemrInstitutionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrInstitutionEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrInstitutionRepository.findAll().size();
        // set the field null
        kemrInstitution.setKemrInstitutionEmail(null);

        // Create the KemrInstitution, which fails.

        restKemrInstitutionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrInstitutionAgreeIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrInstitutionRepository.findAll().size();
        // set the field null
        kemrInstitution.setKemrInstitutionAgree(null);

        // Create the KemrInstitution, which fails.

        restKemrInstitutionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKemrInstitutionStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = kemrInstitutionRepository.findAll().size();
        // set the field null
        kemrInstitution.setKemrInstitutionStatus(null);

        // Create the KemrInstitution, which fails.

        restKemrInstitutionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllKemrInstitutions() throws Exception {
        // Initialize the database
        kemrInstitutionRepository.saveAndFlush(kemrInstitution);

        // Get all the kemrInstitutionList
        restKemrInstitutionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kemrInstitution.getId().intValue())))
            .andExpect(jsonPath("$.[*].kemrInstitutionId").value(hasItem(DEFAULT_KEMR_INSTITUTION_ID)))
            .andExpect(jsonPath("$.[*].kemrInstitutionPassword").value(hasItem(DEFAULT_KEMR_INSTITUTION_PASSWORD)))
            .andExpect(jsonPath("$.[*].kemrInstitutionName").value(hasItem(DEFAULT_KEMR_INSTITUTION_NAME)))
            .andExpect(jsonPath("$.[*].kemrInstitutionDepartment").value(hasItem(DEFAULT_KEMR_INSTITUTION_DEPARTMENT)))
            .andExpect(jsonPath("$.[*].kemrInstitutionPosition").value(hasItem(DEFAULT_KEMR_INSTITUTION_POSITION)))
            .andExpect(jsonPath("$.[*].kemrInstitutionManager").value(hasItem(DEFAULT_KEMR_INSTITUTION_MANAGER)))
            .andExpect(jsonPath("$.[*].kemrInstitutionCellphone").value(hasItem(DEFAULT_KEMR_INSTITUTION_CELLPHONE)))
            .andExpect(jsonPath("$.[*].kemrInstitutionEmail").value(hasItem(DEFAULT_KEMR_INSTITUTION_EMAIL)))
            .andExpect(jsonPath("$.[*].kemrInstitutionWebsite").value(hasItem(DEFAULT_KEMR_INSTITUTION_WEBSITE)))
            .andExpect(jsonPath("$.[*].kemrInstitutionAgree").value(hasItem(DEFAULT_KEMR_INSTITUTION_AGREE.toString())))
            .andExpect(jsonPath("$.[*].kemrInstitutionStatus").value(hasItem(DEFAULT_KEMR_INSTITUTION_STATUS)))
            .andExpect(jsonPath("$.[*].kemrInstitutionModification").value(hasItem(DEFAULT_KEMR_INSTITUTION_MODIFICATION.toString())))
            .andExpect(jsonPath("$.[*].kemrInstitutionWithdrawal").value(hasItem(DEFAULT_KEMR_INSTITUTION_WITHDRAWAL.toString())))
            .andExpect(jsonPath("$.[*].kemrInstitutionLandline").value(hasItem(DEFAULT_KEMR_INSTITUTION_LANDLINE)))
            .andExpect(jsonPath("$.[*].kemrInstitutionFail").value(hasItem(DEFAULT_KEMR_INSTITUTION_FAIL)))
            .andExpect(jsonPath("$.[*].kemrInstitutionFailtime").value(hasItem(DEFAULT_KEMR_INSTITUTION_FAILTIME.toString())))
            .andExpect(jsonPath("$.[*].kemrInstitutionNumber").value(hasItem(DEFAULT_KEMR_INSTITUTION_NUMBER)));
    }

    @Test
    @Transactional
    void getKemrInstitution() throws Exception {
        // Initialize the database
        kemrInstitutionRepository.saveAndFlush(kemrInstitution);

        // Get the kemrInstitution
        restKemrInstitutionMockMvc
            .perform(get(ENTITY_API_URL_ID, kemrInstitution.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(kemrInstitution.getId().intValue()))
            .andExpect(jsonPath("$.kemrInstitutionId").value(DEFAULT_KEMR_INSTITUTION_ID))
            .andExpect(jsonPath("$.kemrInstitutionPassword").value(DEFAULT_KEMR_INSTITUTION_PASSWORD))
            .andExpect(jsonPath("$.kemrInstitutionName").value(DEFAULT_KEMR_INSTITUTION_NAME))
            .andExpect(jsonPath("$.kemrInstitutionDepartment").value(DEFAULT_KEMR_INSTITUTION_DEPARTMENT))
            .andExpect(jsonPath("$.kemrInstitutionPosition").value(DEFAULT_KEMR_INSTITUTION_POSITION))
            .andExpect(jsonPath("$.kemrInstitutionManager").value(DEFAULT_KEMR_INSTITUTION_MANAGER))
            .andExpect(jsonPath("$.kemrInstitutionCellphone").value(DEFAULT_KEMR_INSTITUTION_CELLPHONE))
            .andExpect(jsonPath("$.kemrInstitutionEmail").value(DEFAULT_KEMR_INSTITUTION_EMAIL))
            .andExpect(jsonPath("$.kemrInstitutionWebsite").value(DEFAULT_KEMR_INSTITUTION_WEBSITE))
            .andExpect(jsonPath("$.kemrInstitutionAgree").value(DEFAULT_KEMR_INSTITUTION_AGREE.toString()))
            .andExpect(jsonPath("$.kemrInstitutionStatus").value(DEFAULT_KEMR_INSTITUTION_STATUS))
            .andExpect(jsonPath("$.kemrInstitutionModification").value(DEFAULT_KEMR_INSTITUTION_MODIFICATION.toString()))
            .andExpect(jsonPath("$.kemrInstitutionWithdrawal").value(DEFAULT_KEMR_INSTITUTION_WITHDRAWAL.toString()))
            .andExpect(jsonPath("$.kemrInstitutionLandline").value(DEFAULT_KEMR_INSTITUTION_LANDLINE))
            .andExpect(jsonPath("$.kemrInstitutionFail").value(DEFAULT_KEMR_INSTITUTION_FAIL))
            .andExpect(jsonPath("$.kemrInstitutionFailtime").value(DEFAULT_KEMR_INSTITUTION_FAILTIME.toString()))
            .andExpect(jsonPath("$.kemrInstitutionNumber").value(DEFAULT_KEMR_INSTITUTION_NUMBER));
    }

    @Test
    @Transactional
    void getNonExistingKemrInstitution() throws Exception {
        // Get the kemrInstitution
        restKemrInstitutionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingKemrInstitution() throws Exception {
        // Initialize the database
        kemrInstitutionRepository.saveAndFlush(kemrInstitution);

        int databaseSizeBeforeUpdate = kemrInstitutionRepository.findAll().size();

        // Update the kemrInstitution
        KemrInstitution updatedKemrInstitution = kemrInstitutionRepository.findById(kemrInstitution.getId()).get();
        // Disconnect from session so that the updates on updatedKemrInstitution are not directly saved in db
        em.detach(updatedKemrInstitution);
        updatedKemrInstitution
            .kemrInstitutionId(UPDATED_KEMR_INSTITUTION_ID)
            .kemrInstitutionPassword(UPDATED_KEMR_INSTITUTION_PASSWORD)
            .kemrInstitutionName(UPDATED_KEMR_INSTITUTION_NAME)
            .kemrInstitutionDepartment(UPDATED_KEMR_INSTITUTION_DEPARTMENT)
            .kemrInstitutionPosition(UPDATED_KEMR_INSTITUTION_POSITION)
            .kemrInstitutionManager(UPDATED_KEMR_INSTITUTION_MANAGER)
            .kemrInstitutionCellphone(UPDATED_KEMR_INSTITUTION_CELLPHONE)
            .kemrInstitutionEmail(UPDATED_KEMR_INSTITUTION_EMAIL)
            .kemrInstitutionWebsite(UPDATED_KEMR_INSTITUTION_WEBSITE)
            .kemrInstitutionAgree(UPDATED_KEMR_INSTITUTION_AGREE)
            .kemrInstitutionStatus(UPDATED_KEMR_INSTITUTION_STATUS)
            .kemrInstitutionModification(UPDATED_KEMR_INSTITUTION_MODIFICATION)
            .kemrInstitutionWithdrawal(UPDATED_KEMR_INSTITUTION_WITHDRAWAL)
            .kemrInstitutionLandline(UPDATED_KEMR_INSTITUTION_LANDLINE)
            .kemrInstitutionFail(UPDATED_KEMR_INSTITUTION_FAIL)
            .kemrInstitutionFailtime(UPDATED_KEMR_INSTITUTION_FAILTIME)
            .kemrInstitutionNumber(UPDATED_KEMR_INSTITUTION_NUMBER);

        restKemrInstitutionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKemrInstitution.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedKemrInstitution))
            )
            .andExpect(status().isOk());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeUpdate);
        KemrInstitution testKemrInstitution = kemrInstitutionList.get(kemrInstitutionList.size() - 1);
        assertThat(testKemrInstitution.getKemrInstitutionId()).isEqualTo(UPDATED_KEMR_INSTITUTION_ID);
        assertThat(testKemrInstitution.getKemrInstitutionPassword()).isEqualTo(UPDATED_KEMR_INSTITUTION_PASSWORD);
        assertThat(testKemrInstitution.getKemrInstitutionName()).isEqualTo(UPDATED_KEMR_INSTITUTION_NAME);
        assertThat(testKemrInstitution.getKemrInstitutionDepartment()).isEqualTo(UPDATED_KEMR_INSTITUTION_DEPARTMENT);
        assertThat(testKemrInstitution.getKemrInstitutionPosition()).isEqualTo(UPDATED_KEMR_INSTITUTION_POSITION);
        assertThat(testKemrInstitution.getKemrInstitutionManager()).isEqualTo(UPDATED_KEMR_INSTITUTION_MANAGER);
        assertThat(testKemrInstitution.getKemrInstitutionCellphone()).isEqualTo(UPDATED_KEMR_INSTITUTION_CELLPHONE);
        assertThat(testKemrInstitution.getKemrInstitutionEmail()).isEqualTo(UPDATED_KEMR_INSTITUTION_EMAIL);
        assertThat(testKemrInstitution.getKemrInstitutionWebsite()).isEqualTo(UPDATED_KEMR_INSTITUTION_WEBSITE);
        assertThat(testKemrInstitution.getKemrInstitutionAgree()).isEqualTo(UPDATED_KEMR_INSTITUTION_AGREE);
        assertThat(testKemrInstitution.getKemrInstitutionStatus()).isEqualTo(UPDATED_KEMR_INSTITUTION_STATUS);
        assertThat(testKemrInstitution.getKemrInstitutionModification()).isEqualTo(UPDATED_KEMR_INSTITUTION_MODIFICATION);
        assertThat(testKemrInstitution.getKemrInstitutionWithdrawal()).isEqualTo(UPDATED_KEMR_INSTITUTION_WITHDRAWAL);
        assertThat(testKemrInstitution.getKemrInstitutionLandline()).isEqualTo(UPDATED_KEMR_INSTITUTION_LANDLINE);
        assertThat(testKemrInstitution.getKemrInstitutionFail()).isEqualTo(UPDATED_KEMR_INSTITUTION_FAIL);
        assertThat(testKemrInstitution.getKemrInstitutionFailtime()).isEqualTo(UPDATED_KEMR_INSTITUTION_FAILTIME);
        assertThat(testKemrInstitution.getKemrInstitutionNumber()).isEqualTo(UPDATED_KEMR_INSTITUTION_NUMBER);
    }

    @Test
    @Transactional
    void putNonExistingKemrInstitution() throws Exception {
        int databaseSizeBeforeUpdate = kemrInstitutionRepository.findAll().size();
        kemrInstitution.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrInstitutionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, kemrInstitution.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchKemrInstitution() throws Exception {
        int databaseSizeBeforeUpdate = kemrInstitutionRepository.findAll().size();
        kemrInstitution.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrInstitutionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamKemrInstitution() throws Exception {
        int databaseSizeBeforeUpdate = kemrInstitutionRepository.findAll().size();
        kemrInstitution.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrInstitutionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateKemrInstitutionWithPatch() throws Exception {
        // Initialize the database
        kemrInstitutionRepository.saveAndFlush(kemrInstitution);

        int databaseSizeBeforeUpdate = kemrInstitutionRepository.findAll().size();

        // Update the kemrInstitution using partial update
        KemrInstitution partialUpdatedKemrInstitution = new KemrInstitution();
        partialUpdatedKemrInstitution.setId(kemrInstitution.getId());

        partialUpdatedKemrInstitution
            .kemrInstitutionPassword(UPDATED_KEMR_INSTITUTION_PASSWORD)
            .kemrInstitutionEmail(UPDATED_KEMR_INSTITUTION_EMAIL)
            .kemrInstitutionWebsite(UPDATED_KEMR_INSTITUTION_WEBSITE)
            .kemrInstitutionAgree(UPDATED_KEMR_INSTITUTION_AGREE)
            .kemrInstitutionModification(UPDATED_KEMR_INSTITUTION_MODIFICATION)
            .kemrInstitutionWithdrawal(UPDATED_KEMR_INSTITUTION_WITHDRAWAL)
            .kemrInstitutionFail(UPDATED_KEMR_INSTITUTION_FAIL)
            .kemrInstitutionFailtime(UPDATED_KEMR_INSTITUTION_FAILTIME)
            .kemrInstitutionNumber(UPDATED_KEMR_INSTITUTION_NUMBER);

        restKemrInstitutionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrInstitution.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrInstitution))
            )
            .andExpect(status().isOk());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeUpdate);
        KemrInstitution testKemrInstitution = kemrInstitutionList.get(kemrInstitutionList.size() - 1);
        assertThat(testKemrInstitution.getKemrInstitutionId()).isEqualTo(DEFAULT_KEMR_INSTITUTION_ID);
        assertThat(testKemrInstitution.getKemrInstitutionPassword()).isEqualTo(UPDATED_KEMR_INSTITUTION_PASSWORD);
        assertThat(testKemrInstitution.getKemrInstitutionName()).isEqualTo(DEFAULT_KEMR_INSTITUTION_NAME);
        assertThat(testKemrInstitution.getKemrInstitutionDepartment()).isEqualTo(DEFAULT_KEMR_INSTITUTION_DEPARTMENT);
        assertThat(testKemrInstitution.getKemrInstitutionPosition()).isEqualTo(DEFAULT_KEMR_INSTITUTION_POSITION);
        assertThat(testKemrInstitution.getKemrInstitutionManager()).isEqualTo(DEFAULT_KEMR_INSTITUTION_MANAGER);
        assertThat(testKemrInstitution.getKemrInstitutionCellphone()).isEqualTo(DEFAULT_KEMR_INSTITUTION_CELLPHONE);
        assertThat(testKemrInstitution.getKemrInstitutionEmail()).isEqualTo(UPDATED_KEMR_INSTITUTION_EMAIL);
        assertThat(testKemrInstitution.getKemrInstitutionWebsite()).isEqualTo(UPDATED_KEMR_INSTITUTION_WEBSITE);
        assertThat(testKemrInstitution.getKemrInstitutionAgree()).isEqualTo(UPDATED_KEMR_INSTITUTION_AGREE);
        assertThat(testKemrInstitution.getKemrInstitutionStatus()).isEqualTo(DEFAULT_KEMR_INSTITUTION_STATUS);
        assertThat(testKemrInstitution.getKemrInstitutionModification()).isEqualTo(UPDATED_KEMR_INSTITUTION_MODIFICATION);
        assertThat(testKemrInstitution.getKemrInstitutionWithdrawal()).isEqualTo(UPDATED_KEMR_INSTITUTION_WITHDRAWAL);
        assertThat(testKemrInstitution.getKemrInstitutionLandline()).isEqualTo(DEFAULT_KEMR_INSTITUTION_LANDLINE);
        assertThat(testKemrInstitution.getKemrInstitutionFail()).isEqualTo(UPDATED_KEMR_INSTITUTION_FAIL);
        assertThat(testKemrInstitution.getKemrInstitutionFailtime()).isEqualTo(UPDATED_KEMR_INSTITUTION_FAILTIME);
        assertThat(testKemrInstitution.getKemrInstitutionNumber()).isEqualTo(UPDATED_KEMR_INSTITUTION_NUMBER);
    }

    @Test
    @Transactional
    void fullUpdateKemrInstitutionWithPatch() throws Exception {
        // Initialize the database
        kemrInstitutionRepository.saveAndFlush(kemrInstitution);

        int databaseSizeBeforeUpdate = kemrInstitutionRepository.findAll().size();

        // Update the kemrInstitution using partial update
        KemrInstitution partialUpdatedKemrInstitution = new KemrInstitution();
        partialUpdatedKemrInstitution.setId(kemrInstitution.getId());

        partialUpdatedKemrInstitution
            .kemrInstitutionId(UPDATED_KEMR_INSTITUTION_ID)
            .kemrInstitutionPassword(UPDATED_KEMR_INSTITUTION_PASSWORD)
            .kemrInstitutionName(UPDATED_KEMR_INSTITUTION_NAME)
            .kemrInstitutionDepartment(UPDATED_KEMR_INSTITUTION_DEPARTMENT)
            .kemrInstitutionPosition(UPDATED_KEMR_INSTITUTION_POSITION)
            .kemrInstitutionManager(UPDATED_KEMR_INSTITUTION_MANAGER)
            .kemrInstitutionCellphone(UPDATED_KEMR_INSTITUTION_CELLPHONE)
            .kemrInstitutionEmail(UPDATED_KEMR_INSTITUTION_EMAIL)
            .kemrInstitutionWebsite(UPDATED_KEMR_INSTITUTION_WEBSITE)
            .kemrInstitutionAgree(UPDATED_KEMR_INSTITUTION_AGREE)
            .kemrInstitutionStatus(UPDATED_KEMR_INSTITUTION_STATUS)
            .kemrInstitutionModification(UPDATED_KEMR_INSTITUTION_MODIFICATION)
            .kemrInstitutionWithdrawal(UPDATED_KEMR_INSTITUTION_WITHDRAWAL)
            .kemrInstitutionLandline(UPDATED_KEMR_INSTITUTION_LANDLINE)
            .kemrInstitutionFail(UPDATED_KEMR_INSTITUTION_FAIL)
            .kemrInstitutionFailtime(UPDATED_KEMR_INSTITUTION_FAILTIME)
            .kemrInstitutionNumber(UPDATED_KEMR_INSTITUTION_NUMBER);

        restKemrInstitutionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKemrInstitution.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedKemrInstitution))
            )
            .andExpect(status().isOk());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeUpdate);
        KemrInstitution testKemrInstitution = kemrInstitutionList.get(kemrInstitutionList.size() - 1);
        assertThat(testKemrInstitution.getKemrInstitutionId()).isEqualTo(UPDATED_KEMR_INSTITUTION_ID);
        assertThat(testKemrInstitution.getKemrInstitutionPassword()).isEqualTo(UPDATED_KEMR_INSTITUTION_PASSWORD);
        assertThat(testKemrInstitution.getKemrInstitutionName()).isEqualTo(UPDATED_KEMR_INSTITUTION_NAME);
        assertThat(testKemrInstitution.getKemrInstitutionDepartment()).isEqualTo(UPDATED_KEMR_INSTITUTION_DEPARTMENT);
        assertThat(testKemrInstitution.getKemrInstitutionPosition()).isEqualTo(UPDATED_KEMR_INSTITUTION_POSITION);
        assertThat(testKemrInstitution.getKemrInstitutionManager()).isEqualTo(UPDATED_KEMR_INSTITUTION_MANAGER);
        assertThat(testKemrInstitution.getKemrInstitutionCellphone()).isEqualTo(UPDATED_KEMR_INSTITUTION_CELLPHONE);
        assertThat(testKemrInstitution.getKemrInstitutionEmail()).isEqualTo(UPDATED_KEMR_INSTITUTION_EMAIL);
        assertThat(testKemrInstitution.getKemrInstitutionWebsite()).isEqualTo(UPDATED_KEMR_INSTITUTION_WEBSITE);
        assertThat(testKemrInstitution.getKemrInstitutionAgree()).isEqualTo(UPDATED_KEMR_INSTITUTION_AGREE);
        assertThat(testKemrInstitution.getKemrInstitutionStatus()).isEqualTo(UPDATED_KEMR_INSTITUTION_STATUS);
        assertThat(testKemrInstitution.getKemrInstitutionModification()).isEqualTo(UPDATED_KEMR_INSTITUTION_MODIFICATION);
        assertThat(testKemrInstitution.getKemrInstitutionWithdrawal()).isEqualTo(UPDATED_KEMR_INSTITUTION_WITHDRAWAL);
        assertThat(testKemrInstitution.getKemrInstitutionLandline()).isEqualTo(UPDATED_KEMR_INSTITUTION_LANDLINE);
        assertThat(testKemrInstitution.getKemrInstitutionFail()).isEqualTo(UPDATED_KEMR_INSTITUTION_FAIL);
        assertThat(testKemrInstitution.getKemrInstitutionFailtime()).isEqualTo(UPDATED_KEMR_INSTITUTION_FAILTIME);
        assertThat(testKemrInstitution.getKemrInstitutionNumber()).isEqualTo(UPDATED_KEMR_INSTITUTION_NUMBER);
    }

    @Test
    @Transactional
    void patchNonExistingKemrInstitution() throws Exception {
        int databaseSizeBeforeUpdate = kemrInstitutionRepository.findAll().size();
        kemrInstitution.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKemrInstitutionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, kemrInstitution.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchKemrInstitution() throws Exception {
        int databaseSizeBeforeUpdate = kemrInstitutionRepository.findAll().size();
        kemrInstitution.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrInstitutionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isBadRequest());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamKemrInstitution() throws Exception {
        int databaseSizeBeforeUpdate = kemrInstitutionRepository.findAll().size();
        kemrInstitution.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKemrInstitutionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(kemrInstitution))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the KemrInstitution in the database
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteKemrInstitution() throws Exception {
        // Initialize the database
        kemrInstitutionRepository.saveAndFlush(kemrInstitution);

        int databaseSizeBeforeDelete = kemrInstitutionRepository.findAll().size();

        // Delete the kemrInstitution
        restKemrInstitutionMockMvc
            .perform(delete(ENTITY_API_URL_ID, kemrInstitution.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KemrInstitution> kemrInstitutionList = kemrInstitutionRepository.findAll();
        assertThat(kemrInstitutionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
