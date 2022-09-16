package com.jysoft.jyemr.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A KemrDoctor.
 */
@Entity
@Table(name = "kemr_doctor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class KemrDoctor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "kemr_doctor_name", length = 20, nullable = false)
    private String kemrDoctorName;

    @NotNull
    @Size(max = 20)
    @Column(name = "kemr_doctor_field", length = 20, nullable = false)
    private String kemrDoctorField;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KemrDoctor id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKemrDoctorName() {
        return this.kemrDoctorName;
    }

    public KemrDoctor kemrDoctorName(String kemrDoctorName) {
        this.setKemrDoctorName(kemrDoctorName);
        return this;
    }

    public void setKemrDoctorName(String kemrDoctorName) {
        this.kemrDoctorName = kemrDoctorName;
    }

    public String getKemrDoctorField() {
        return this.kemrDoctorField;
    }

    public KemrDoctor kemrDoctorField(String kemrDoctorField) {
        this.setKemrDoctorField(kemrDoctorField);
        return this;
    }

    public void setKemrDoctorField(String kemrDoctorField) {
        this.kemrDoctorField = kemrDoctorField;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KemrDoctor)) {
            return false;
        }
        return id != null && id.equals(((KemrDoctor) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KemrDoctor{" +
            "id=" + getId() +
            ", kemrDoctorName='" + getKemrDoctorName() + "'" +
            ", kemrDoctorField='" + getKemrDoctorField() + "'" +
            "}";
    }
}
