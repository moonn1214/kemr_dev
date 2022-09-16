package com.jysoft.jyemr.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jysoft.jyemr.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KemrTreatmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KemrTreatment.class);
        KemrTreatment kemrTreatment1 = new KemrTreatment();
        kemrTreatment1.setId(1L);
        KemrTreatment kemrTreatment2 = new KemrTreatment();
        kemrTreatment2.setId(kemrTreatment1.getId());
        assertThat(kemrTreatment1).isEqualTo(kemrTreatment2);
        kemrTreatment2.setId(2L);
        assertThat(kemrTreatment1).isNotEqualTo(kemrTreatment2);
        kemrTreatment1.setId(null);
        assertThat(kemrTreatment1).isNotEqualTo(kemrTreatment2);
    }
}
