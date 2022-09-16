package com.jysoft.jyemr.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A KemrMedicalBill.
 */
@Entity
@Table(name = "kemr_medical_bill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class KemrMedicalBill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "kemr_medical_bill_total", nullable = false)
    private Integer kemrMedicalBillTotal;

    @NotNull
    @Column(name = "kemr_medical_bill_nhs_share", nullable = false)
    private Integer kemrMedicalBillNhsShare;

    @NotNull
    @Column(name = "kemr_medical_bill_patient_share", nullable = false)
    private Integer kemrMedicalBillPatientShare;

    @NotNull
    @Size(max = 1)
    @Column(name = "kemr_medical_bill_method", length = 1, nullable = false)
    private String kemrMedicalBillMethod;

    @NotNull
    @Size(max = 1)
    @Column(name = "kemr_medical_bill_delivery_type", length = 1, nullable = false)
    private String kemrMedicalBillDeliveryType;

    @NotNull
    @Size(max = 20)
    @Column(name = "kemr_medical_bill_cash_receipt", length = 20, nullable = false)
    private String kemrMedicalBillCashReceipt;

    @ManyToOne
    @JsonIgnoreProperties(value = { "kemrPatient", "kemrDoctor", "kemrDiagnosis", "kemrTreatment" }, allowSetters = true)
    private KemrMedicalTreatment kemrMedicalTreatment;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KemrMedicalBill id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getKemrMedicalBillTotal() {
        return this.kemrMedicalBillTotal;
    }

    public KemrMedicalBill kemrMedicalBillTotal(Integer kemrMedicalBillTotal) {
        this.setKemrMedicalBillTotal(kemrMedicalBillTotal);
        return this;
    }

    public void setKemrMedicalBillTotal(Integer kemrMedicalBillTotal) {
        this.kemrMedicalBillTotal = kemrMedicalBillTotal;
    }

    public Integer getKemrMedicalBillNhsShare() {
        return this.kemrMedicalBillNhsShare;
    }

    public KemrMedicalBill kemrMedicalBillNhsShare(Integer kemrMedicalBillNhsShare) {
        this.setKemrMedicalBillNhsShare(kemrMedicalBillNhsShare);
        return this;
    }

    public void setKemrMedicalBillNhsShare(Integer kemrMedicalBillNhsShare) {
        this.kemrMedicalBillNhsShare = kemrMedicalBillNhsShare;
    }

    public Integer getKemrMedicalBillPatientShare() {
        return this.kemrMedicalBillPatientShare;
    }

    public KemrMedicalBill kemrMedicalBillPatientShare(Integer kemrMedicalBillPatientShare) {
        this.setKemrMedicalBillPatientShare(kemrMedicalBillPatientShare);
        return this;
    }

    public void setKemrMedicalBillPatientShare(Integer kemrMedicalBillPatientShare) {
        this.kemrMedicalBillPatientShare = kemrMedicalBillPatientShare;
    }

    public String getKemrMedicalBillMethod() {
        return this.kemrMedicalBillMethod;
    }

    public KemrMedicalBill kemrMedicalBillMethod(String kemrMedicalBillMethod) {
        this.setKemrMedicalBillMethod(kemrMedicalBillMethod);
        return this;
    }

    public void setKemrMedicalBillMethod(String kemrMedicalBillMethod) {
        this.kemrMedicalBillMethod = kemrMedicalBillMethod;
    }

    public String getKemrMedicalBillDeliveryType() {
        return this.kemrMedicalBillDeliveryType;
    }

    public KemrMedicalBill kemrMedicalBillDeliveryType(String kemrMedicalBillDeliveryType) {
        this.setKemrMedicalBillDeliveryType(kemrMedicalBillDeliveryType);
        return this;
    }

    public void setKemrMedicalBillDeliveryType(String kemrMedicalBillDeliveryType) {
        this.kemrMedicalBillDeliveryType = kemrMedicalBillDeliveryType;
    }

    public String getKemrMedicalBillCashReceipt() {
        return this.kemrMedicalBillCashReceipt;
    }

    public KemrMedicalBill kemrMedicalBillCashReceipt(String kemrMedicalBillCashReceipt) {
        this.setKemrMedicalBillCashReceipt(kemrMedicalBillCashReceipt);
        return this;
    }

    public void setKemrMedicalBillCashReceipt(String kemrMedicalBillCashReceipt) {
        this.kemrMedicalBillCashReceipt = kemrMedicalBillCashReceipt;
    }

    public KemrMedicalTreatment getKemrMedicalTreatment() {
        return this.kemrMedicalTreatment;
    }

    public void setKemrMedicalTreatment(KemrMedicalTreatment kemrMedicalTreatment) {
        this.kemrMedicalTreatment = kemrMedicalTreatment;
    }

    public KemrMedicalBill kemrMedicalTreatment(KemrMedicalTreatment kemrMedicalTreatment) {
        this.setKemrMedicalTreatment(kemrMedicalTreatment);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KemrMedicalBill)) {
            return false;
        }
        return id != null && id.equals(((KemrMedicalBill) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KemrMedicalBill{" +
            "id=" + getId() +
            ", kemrMedicalBillTotal=" + getKemrMedicalBillTotal() +
            ", kemrMedicalBillNhsShare=" + getKemrMedicalBillNhsShare() +
            ", kemrMedicalBillPatientShare=" + getKemrMedicalBillPatientShare() +
            ", kemrMedicalBillMethod='" + getKemrMedicalBillMethod() + "'" +
            ", kemrMedicalBillDeliveryType='" + getKemrMedicalBillDeliveryType() + "'" +
            ", kemrMedicalBillCashReceipt='" + getKemrMedicalBillCashReceipt() + "'" +
            "}";
    }
}
