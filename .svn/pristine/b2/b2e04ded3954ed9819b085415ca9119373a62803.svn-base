package com.jysoft.jyemr.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jysoft.jyemr.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KemrMedicineTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KemrMedicine.class);
        KemrMedicine kemrMedicine1 = new KemrMedicine();
        kemrMedicine1.setId(1L);
        KemrMedicine kemrMedicine2 = new KemrMedicine();
        kemrMedicine2.setId(kemrMedicine1.getId());
        assertThat(kemrMedicine1).isEqualTo(kemrMedicine2);
        kemrMedicine2.setId(2L);
        assertThat(kemrMedicine1).isNotEqualTo(kemrMedicine2);
        kemrMedicine1.setId(null);
        assertThat(kemrMedicine1).isNotEqualTo(kemrMedicine2);
    }
}
