package com.jysoft.jyemr.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jysoft.jyemr.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KemrPrescriptionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KemrPrescription.class);
        KemrPrescription kemrPrescription1 = new KemrPrescription();
        kemrPrescription1.setId(1L);
        KemrPrescription kemrPrescription2 = new KemrPrescription();
        kemrPrescription2.setId(kemrPrescription1.getId());
        assertThat(kemrPrescription1).isEqualTo(kemrPrescription2);
        kemrPrescription2.setId(2L);
        assertThat(kemrPrescription1).isNotEqualTo(kemrPrescription2);
        kemrPrescription1.setId(null);
        assertThat(kemrPrescription1).isNotEqualTo(kemrPrescription2);
    }
}
