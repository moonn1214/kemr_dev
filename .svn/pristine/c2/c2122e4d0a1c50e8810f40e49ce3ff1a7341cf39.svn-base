package com.jysoft.jyemr.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A KemrReservation.
 */
@Entity
@Table(name = "kemr_reservation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class KemrReservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 1)
    @Column(name = "kemr_reservation_status", length = 1, nullable = false)
    private String kemrReservationStatus;

    @Size(max = 20)
    @Column(name = "kemr_reservation_new_patient_name", length = 20)
    private String kemrReservationNewPatientName;

    @Size(max = 20)
    @Column(name = "kemr_reservation_new_patient_phone", length = 20)
    private String kemrReservationNewPatientPhone;

    @NotNull
    @Column(name = "kemr_reservation_date", nullable = false)
    private Instant kemrReservationDate;

    @NotNull
    @Column(name = "kemr_reservation_time", nullable = false)
    private Integer kemrReservationTime;

    @ManyToOne
    private KemrPatient kemrPatient;

    @ManyToOne
    private KemrDoctor kemrDoctor;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KemrReservation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKemrReservationStatus() {
        return this.kemrReservationStatus;
    }

    public KemrReservation kemrReservationStatus(String kemrReservationStatus) {
        this.setKemrReservationStatus(kemrReservationStatus);
        return this;
    }

    public void setKemrReservationStatus(String kemrReservationStatus) {
        this.kemrReservationStatus = kemrReservationStatus;
    }

    public String getKemrReservationNewPatientName() {
        return this.kemrReservationNewPatientName;
    }

    public KemrReservation kemrReservationNewPatientName(String kemrReservationNewPatientName) {
        this.setKemrReservationNewPatientName(kemrReservationNewPatientName);
        return this;
    }

    public void setKemrReservationNewPatientName(String kemrReservationNewPatientName) {
        this.kemrReservationNewPatientName = kemrReservationNewPatientName;
    }

    public String getKemrReservationNewPatientPhone() {
        return this.kemrReservationNewPatientPhone;
    }

    public KemrReservation kemrReservationNewPatientPhone(String kemrReservationNewPatientPhone) {
        this.setKemrReservationNewPatientPhone(kemrReservationNewPatientPhone);
        return this;
    }

    public void setKemrReservationNewPatientPhone(String kemrReservationNewPatientPhone) {
        this.kemrReservationNewPatientPhone = kemrReservationNewPatientPhone;
    }

    public Instant getKemrReservationDate() {
        return this.kemrReservationDate;
    }

    public KemrReservation kemrReservationDate(Instant kemrReservationDate) {
        this.setKemrReservationDate(kemrReservationDate);
        return this;
    }

    public void setKemrReservationDate(Instant kemrReservationDate) {
        this.kemrReservationDate = kemrReservationDate;
    }

    public Integer getKemrReservationTime() {
        return this.kemrReservationTime;
    }

    public KemrReservation kemrReservationTime(Integer kemrReservationTime) {
        this.setKemrReservationTime(kemrReservationTime);
        return this;
    }

    public void setKemrReservationTime(Integer kemrReservationTime) {
        this.kemrReservationTime = kemrReservationTime;
    }

    public KemrPatient getKemrPatient() {
        return this.kemrPatient;
    }

    public void setKemrPatient(KemrPatient kemrPatient) {
        this.kemrPatient = kemrPatient;
    }

    public KemrReservation kemrPatient(KemrPatient kemrPatient) {
        this.setKemrPatient(kemrPatient);
        return this;
    }

    public KemrDoctor getKemrDoctor() {
        return this.kemrDoctor;
    }

    public void setKemrDoctor(KemrDoctor kemrDoctor) {
        this.kemrDoctor = kemrDoctor;
    }

    public KemrReservation kemrDoctor(KemrDoctor kemrDoctor) {
        this.setKemrDoctor(kemrDoctor);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KemrReservation)) {
            return false;
        }
        return id != null && id.equals(((KemrReservation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KemrReservation{" +
            "id=" + getId() +
            ", kemrReservationStatus='" + getKemrReservationStatus() + "'" +
            ", kemrReservationNewPatientName='" + getKemrReservationNewPatientName() + "'" +
            ", kemrReservationNewPatientPhone='" + getKemrReservationNewPatientPhone() + "'" +
            ", kemrReservationDate='" + getKemrReservationDate() + "'" +
            ", kemrReservationTime=" + getKemrReservationTime() +
            "}";
    }
}
