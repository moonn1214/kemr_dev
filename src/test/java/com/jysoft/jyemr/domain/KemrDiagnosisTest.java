package com.jysoft.jyemr.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jysoft.jyemr.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KemrDiagnosisTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KemrDiagnosis.class);
        KemrDiagnosis kemrDiagnosis1 = new KemrDiagnosis();
        kemrDiagnosis1.setId(1L);
        KemrDiagnosis kemrDiagnosis2 = new KemrDiagnosis();
        kemrDiagnosis2.setId(kemrDiagnosis1.getId());
        assertThat(kemrDiagnosis1).isEqualTo(kemrDiagnosis2);
        kemrDiagnosis2.setId(2L);
        assertThat(kemrDiagnosis1).isNotEqualTo(kemrDiagnosis2);
        kemrDiagnosis1.setId(null);
        assertThat(kemrDiagnosis1).isNotEqualTo(kemrDiagnosis2);
    }
}
