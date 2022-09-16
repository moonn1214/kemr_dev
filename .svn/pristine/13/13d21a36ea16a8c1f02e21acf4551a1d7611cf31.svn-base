package com.jysoft.jyemr.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jysoft.jyemr.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KemrMedicalTreatmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KemrMedicalTreatment.class);
        KemrMedicalTreatment kemrMedicalTreatment1 = new KemrMedicalTreatment();
        kemrMedicalTreatment1.setId(1L);
        KemrMedicalTreatment kemrMedicalTreatment2 = new KemrMedicalTreatment();
        kemrMedicalTreatment2.setId(kemrMedicalTreatment1.getId());
        assertThat(kemrMedicalTreatment1).isEqualTo(kemrMedicalTreatment2);
        kemrMedicalTreatment2.setId(2L);
        assertThat(kemrMedicalTreatment1).isNotEqualTo(kemrMedicalTreatment2);
        kemrMedicalTreatment1.setId(null);
        assertThat(kemrMedicalTreatment1).isNotEqualTo(kemrMedicalTreatment2);
    }
}
