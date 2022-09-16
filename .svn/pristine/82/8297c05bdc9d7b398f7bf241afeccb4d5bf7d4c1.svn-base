package com.jysoft.jyemr.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jysoft.jyemr.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KemrPatientTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KemrPatient.class);
        KemrPatient kemrPatient1 = new KemrPatient();
        kemrPatient1.setId(1L);
        KemrPatient kemrPatient2 = new KemrPatient();
        kemrPatient2.setId(kemrPatient1.getId());
        assertThat(kemrPatient1).isEqualTo(kemrPatient2);
        kemrPatient2.setId(2L);
        assertThat(kemrPatient1).isNotEqualTo(kemrPatient2);
        kemrPatient1.setId(null);
        assertThat(kemrPatient1).isNotEqualTo(kemrPatient2);
    }
}
