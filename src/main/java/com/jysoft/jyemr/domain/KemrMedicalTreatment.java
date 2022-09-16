package com.jysoft.jyemr.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A KemrMedicalTreatment.
 */
@Entity
@Table(name = "kemr_medical_treatment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class KemrMedicalTreatment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 200)
    @Column(name = "kemr_medical_treatment_doctor_note", length = 200)
    private String kemrMedicalTreatmentDoctorNote;

    @Size(max = 50)
    @Column(name = "kemr_medical_treatment_nurse_message", length = 50)
    private String kemrMedicalTreatmentNurseMessage;

    @Column(name = "kemr_medical_treatment_date")
    private Instant kemrMedicalTreatmentDate;

    @ManyToOne
    private KemrPatient kemrPatient;

    @ManyToOne
    private KemrDoctor kemrDoctor;

    @ManyToOne
    private KemrDiagnosis kemrDiagnosis;

    @ManyToOne
    private KemrTreatment kemrTreatment;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KemrMedicalTreatment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKemrMedicalTreatmentDoctorNote() {
        return this.kemrMedicalTreatmentDoctorNote;
    }

    public KemrMedicalTreatment kemrMedicalTreatmentDoctorNote(String kemrMedicalTreatmentDoctorNote) {
        this.setKemrMedicalTreatmentDoctorNote(kemrMedicalTreatmentDoctorNote);
        return this;
    }

    public void setKemrMedicalTreatmentDoctorNote(String kemrMedicalTreatmentDoctorNote) {
        this.kemrMedicalTreatmentDoctorNote = kemrMedicalTreatmentDoctorNote;
    }

    public String getKemrMedicalTreatmentNurseMessage() {
        return this.kemrMedicalTreatmentNurseMessage;
    }

    public KemrMedicalTreatment kemrMedicalTreatmentNurseMessage(String kemrMedicalTreatmentNurseMessage) {
        this.setKemrMedicalTreatmentNurseMessage(kemrMedicalTreatmentNurseMessage);
        return this;
    }

    public void setKemrMedicalTreatmentNurseMessage(String kemrMedicalTreatmentNurseMessage) {
        this.kemrMedicalTreatmentNurseMessage = kemrMedicalTreatmentNurseMessage;
    }

    public Instant getKemrMedicalTreatmentDate() {
        return this.kemrMedicalTreatmentDate;
    }

    public KemrMedicalTreatment kemrMedicalTreatmentDate(Instant kemrMedicalTreatmentDate) {
        this.setKemrMedicalTreatmentDate(kemrMedicalTreatmentDate);
        return this;
    }

    public void setKemrMedicalTreatmentDate(Instant kemrMedicalTreatmentDate) {
        this.kemrMedicalTreatmentDate = kemrMedicalTreatmentDate;
    }

    public KemrPatient getKemrPatient() {
        return this.kemrPatient;
    }

    public void setKemrPatient(KemrPatient kemrPatient) {
        this.kemrPatient = kemrPatient;
    }

    public KemrMedicalTreatment kemrPatient(KemrPatient kemrPatient) {
        this.setKemrPatient(kemrPatient);
        return this;
    }

    public KemrDoctor getKemrDoctor() {
        return this.kemrDoctor;
    }

    public void setKemrDoctor(KemrDoctor kemrDoctor) {
        this.kemrDoctor = kemrDoctor;
    }

    public KemrMedicalTreatment kemrDoctor(KemrDoctor kemrDoctor) {
        this.setKemrDoctor(kemrDoctor);
        return this;
    }

    public KemrDiagnosis getKemrDiagnosis() {
        return this.kemrDiagnosis;
    }

    public void setKemrDiagnosis(KemrDiagnosis kemrDiagnosis) {
        this.kemrDiagnosis = kemrDiagnosis;
    }

    public KemrMedicalTreatment kemrDiagnosis(KemrDiagnosis kemrDiagnosis) {
        this.setKemrDiagnosis(kemrDiagnosis);
        return this;
    }

    public KemrTreatment getKemrTreatment() {
        return this.kemrTreatment;
    }

    public void setKemrTreatment(KemrTreatment kemrTreatment) {
        this.kemrTreatment = kemrTreatment;
    }

    public KemrMedicalTreatment kemrTreatment(KemrTreatment kemrTreatment) {
        this.setKemrTreatment(kemrTreatment);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KemrMedicalTreatment)) {
            return false;
        }
        return id != null && id.equals(((KemrMedicalTreatment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KemrMedicalTreatment{" +
            "id=" + getId() +
            ", kemrMedicalTreatmentDoctorNote='" + getKemrMedicalTreatmentDoctorNote() + "'" +
            ", kemrMedicalTreatmentNurseMessage='" + getKemrMedicalTreatmentNurseMessage() + "'" +
            ", kemrMedicalTreatmentDate='" + getKemrMedicalTreatmentDate() + "'" +
            "}";
    }
}
