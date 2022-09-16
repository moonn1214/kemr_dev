package com.jysoft.jyemr.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jysoft.jyemr.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KemrInstitutionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KemrInstitution.class);
        KemrInstitution kemrInstitution1 = new KemrInstitution();
        kemrInstitution1.setId(1L);
        KemrInstitution kemrInstitution2 = new KemrInstitution();
        kemrInstitution2.setId(kemrInstitution1.getId());
        assertThat(kemrInstitution1).isEqualTo(kemrInstitution2);
        kemrInstitution2.setId(2L);
        assertThat(kemrInstitution1).isNotEqualTo(kemrInstitution2);
        kemrInstitution1.setId(null);
        assertThat(kemrInstitution1).isNotEqualTo(kemrInstitution2);
    }
}
