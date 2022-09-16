package com.jysoft.jyemr.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A KemrPrescription.
 */
@Entity
@Table(name = "kemr_prescription")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class KemrPrescription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    private KemrMedicine kemrMedicine;

    @ManyToOne
    @JsonIgnoreProperties(value = { "kemrPatient", "kemrDoctor", "kemrDiagnosis", "kemrTreatment" }, allowSetters = true)
    private KemrMedicalTreatment kemrMedicalTreatment;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KemrPrescription id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public KemrMedicine getKemrMedicine() {
        return this.kemrMedicine;
    }

    public void setKemrMedicine(KemrMedicine kemrMedicine) {
        this.kemrMedicine = kemrMedicine;
    }

    public KemrPrescription kemrMedicine(KemrMedicine kemrMedicine) {
        this.setKemrMedicine(kemrMedicine);
        return this;
    }

    public KemrMedicalTreatment getKemrMedicalTreatment() {
        return this.kemrMedicalTreatment;
    }

    public void setKemrMedicalTreatment(KemrMedicalTreatment kemrMedicalTreatment) {
        this.kemrMedicalTreatment = kemrMedicalTreatment;
    }

    public KemrPrescription kemrMedicalTreatment(KemrMedicalTreatment kemrMedicalTreatment) {
        this.setKemrMedicalTreatment(kemrMedicalTreatment);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KemrPrescription)) {
            return false;
        }
        return id != null && id.equals(((KemrPrescription) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KemrPrescription{" +
            "id=" + getId() +
            "}";
    }
}
