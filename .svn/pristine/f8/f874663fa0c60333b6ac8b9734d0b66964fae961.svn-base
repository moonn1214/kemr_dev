package com.jysoft.jyemr.domain;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A KemrPatient.
 */
@Entity
@Table(name = "kemr_patient")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class KemrPatient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 10)
    @Column(name = "kemr_patient_name", length = 10, nullable = false)
    private String kemrPatientName;

    @NotNull
    @Size(max = 1)
    @Column(name = "kemr_patient_sex", length = 1, nullable = false)
    private String kemrPatientSex;

    @NotNull
    @Column(name = "kemr_patient_birthday", nullable = false)
    private LocalDate kemrPatientBirthday;

    @NotNull
    @Column(name = "kemr_patient_registration_date", nullable = false)
    private Instant kemrPatientRegistrationDate;

    @NotNull
    @Size(max = 20)
    @Column(name = "kemr_patient_social_seurity_no", length = 20, nullable = false)
    private String kemrPatientSocialSeurityNo;

    @NotNull
    @Size(max = 1)
    @Column(name = "kemr_patient_qualification_check", length = 1, nullable = false)
    private String kemrPatientQualificationCheck;

    @Size(max = 50)
    @Column(name = "kemr_patient_address", length = 50)
    private String kemrPatientAddress;

    @Size(max = 50)
    @Column(name = "kemr_patient_nurse_memo", length = 50)
    private String kemrPatientNurseMemo;

    @Size(max = 20)
    @Column(name = "kemr_patient_cellphone", length = 20)
    private String kemrPatientCellphone;

    @Size(max = 20)
    @Column(name = "kemr_patient_landline", length = 20)
    private String kemrPatientLandline;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KemrPatient id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKemrPatientName() {
        return this.kemrPatientName;
    }

    public KemrPatient kemrPatientName(String kemrPatientName) {
        this.setKemrPatientName(kemrPatientName);
        return this;
    }

    public void setKemrPatientName(String kemrPatientName) {
        this.kemrPatientName = kemrPatientName;
    }

    public String getKemrPatientSex() {
        return this.kemrPatientSex;
    }

    public KemrPatient kemrPatientSex(String kemrPatientSex) {
        this.setKemrPatientSex(kemrPatientSex);
        return this;
    }

    public void setKemrPatientSex(String kemrPatientSex) {
        this.kemrPatientSex = kemrPatientSex;
    }

    public LocalDate getKemrPatientBirthday() {
        return this.kemrPatientBirthday;
    }

    public KemrPatient kemrPatientBirthday(LocalDate kemrPatientBirthday) {
        this.setKemrPatientBirthday(kemrPatientBirthday);
        return this;
    }

    public void setKemrPatientBirthday(LocalDate kemrPatientBirthday) {
        this.kemrPatientBirthday = kemrPatientBirthday;
    }

    public Instant getKemrPatientRegistrationDate() {
        return this.kemrPatientRegistrationDate;
    }

    public KemrPatient kemrPatientRegistrationDate(Instant kemrPatientRegistrationDate) {
        this.setKemrPatientRegistrationDate(kemrPatientRegistrationDate);
        return this;
    }

    public void setKemrPatientRegistrationDate(Instant kemrPatientRegistrationDate) {
        this.kemrPatientRegistrationDate = kemrPatientRegistrationDate;
    }

    public String getKemrPatientSocialSeurityNo() {
        return this.kemrPatientSocialSeurityNo;
    }

    public KemrPatient kemrPatientSocialSeurityNo(String kemrPatientSocialSeurityNo) {
        this.setKemrPatientSocialSeurityNo(kemrPatientSocialSeurityNo);
        return this;
    }

    public void setKemrPatientSocialSeurityNo(String kemrPatientSocialSeurityNo) {
        this.kemrPatientSocialSeurityNo = kemrPatientSocialSeurityNo;
    }

    public String getKemrPatientQualificationCheck() {
        return this.kemrPatientQualificationCheck;
    }

    public KemrPatient kemrPatientQualificationCheck(String kemrPatientQualificationCheck) {
        this.setKemrPatientQualificationCheck(kemrPatientQualificationCheck);
        return this;
    }

    public void setKemrPatientQualificationCheck(String kemrPatientQualificationCheck) {
        this.kemrPatientQualificationCheck = kemrPatientQualificationCheck;
    }

    public String getKemrPatientAddress() {
        return this.kemrPatientAddress;
    }

    public KemrPatient kemrPatientAddress(String kemrPatientAddress) {
        this.setKemrPatientAddress(kemrPatientAddress);
        return this;
    }

    public void setKemrPatientAddress(String kemrPatientAddress) {
        this.kemrPatientAddress = kemrPatientAddress;
    }

    public String getKemrPatientNurseMemo() {
        return this.kemrPatientNurseMemo;
    }

    public KemrPatient kemrPatientNurseMemo(String kemrPatientNurseMemo) {
        this.setKemrPatientNurseMemo(kemrPatientNurseMemo);
        return this;
    }

    public void setKemrPatientNurseMemo(String kemrPatientNurseMemo) {
        this.kemrPatientNurseMemo = kemrPatientNurseMemo;
    }

    public String getKemrPatientCellphone() {
        return this.kemrPatientCellphone;
    }

    public KemrPatient kemrPatientCellphone(String kemrPatientCellphone) {
        this.setKemrPatientCellphone(kemrPatientCellphone);
        return this;
    }

    public void setKemrPatientCellphone(String kemrPatientCellphone) {
        this.kemrPatientCellphone = kemrPatientCellphone;
    }

    public String getKemrPatientLandline() {
        return this.kemrPatientLandline;
    }

    public KemrPatient kemrPatientLandline(String kemrPatientLandline) {
        this.setKemrPatientLandline(kemrPatientLandline);
        return this;
    }

    public void setKemrPatientLandline(String kemrPatientLandline) {
        this.kemrPatientLandline = kemrPatientLandline;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KemrPatient)) {
            return false;
        }
        return id != null && id.equals(((KemrPatient) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KemrPatient{" +
            "id=" + getId() +
            ", kemrPatientName='" + getKemrPatientName() + "'" +
            ", kemrPatientSex='" + getKemrPatientSex() + "'" +
            ", kemrPatientBirthday='" + getKemrPatientBirthday() + "'" +
            ", kemrPatientRegistrationDate='" + getKemrPatientRegistrationDate() + "'" +
            ", kemrPatientSocialSeurityNo='" + getKemrPatientSocialSeurityNo() + "'" +
            ", kemrPatientQualificationCheck='" + getKemrPatientQualificationCheck() + "'" +
            ", kemrPatientAddress='" + getKemrPatientAddress() + "'" +
            ", kemrPatientNurseMemo='" + getKemrPatientNurseMemo() + "'" +
            ", kemrPatientCellphone='" + getKemrPatientCellphone() + "'" +
            ", kemrPatientLandline='" + getKemrPatientLandline() + "'" +
            "}";
    }
}
