package com.jysoft.jyemr.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jysoft.jyemr.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KemrMedicalBillTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KemrMedicalBill.class);
        KemrMedicalBill kemrMedicalBill1 = new KemrMedicalBill();
        kemrMedicalBill1.setId(1L);
        KemrMedicalBill kemrMedicalBill2 = new KemrMedicalBill();
        kemrMedicalBill2.setId(kemrMedicalBill1.getId());
        assertThat(kemrMedicalBill1).isEqualTo(kemrMedicalBill2);
        kemrMedicalBill2.setId(2L);
        assertThat(kemrMedicalBill1).isNotEqualTo(kemrMedicalBill2);
        kemrMedicalBill1.setId(null);
        assertThat(kemrMedicalBill1).isNotEqualTo(kemrMedicalBill2);
    }
}
