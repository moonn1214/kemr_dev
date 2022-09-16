package com.jysoft.jyemr.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.jysoft.jyemr.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class KemrReservationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KemrReservation.class);
        KemrReservation kemrReservation1 = new KemrReservation();
        kemrReservation1.setId(1L);
        KemrReservation kemrReservation2 = new KemrReservation();
        kemrReservation2.setId(kemrReservation1.getId());
        assertThat(kemrReservation1).isEqualTo(kemrReservation2);
        kemrReservation2.setId(2L);
        assertThat(kemrReservation1).isNotEqualTo(kemrReservation2);
        kemrReservation1.setId(null);
        assertThat(kemrReservation1).isNotEqualTo(kemrReservation2);
    }
}
