package com.jysoft.jyemr.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jysoft.jyemr.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KemrDoctorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KemrDoctor.class);
        KemrDoctor kemrDoctor1 = new KemrDoctor();
        kemrDoctor1.setId(1L);
        KemrDoctor kemrDoctor2 = new KemrDoctor();
        kemrDoctor2.setId(kemrDoctor1.getId());
        assertThat(kemrDoctor1).isEqualTo(kemrDoctor2);
        kemrDoctor2.setId(2L);
        assertThat(kemrDoctor1).isNotEqualTo(kemrDoctor2);
        kemrDoctor1.setId(null);
        assertThat(kemrDoctor1).isNotEqualTo(kemrDoctor2);
    }
}
