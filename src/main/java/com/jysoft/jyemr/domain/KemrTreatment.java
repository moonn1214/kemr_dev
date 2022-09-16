package com.jysoft.jyemr.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A KemrTreatment.
 */
@Entity
@Table(name = "kemr_treatment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class KemrTreatment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "kemr_treatment_name", length = 50, nullable = false)
    private String kemrTreatmentName;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KemrTreatment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKemrTreatmentName() {
        return this.kemrTreatmentName;
    }

    public KemrTreatment kemrTreatmentName(String kemrTreatmentName) {
        this.setKemrTreatmentName(kemrTreatmentName);
        return this;
    }

    public void setKemrTreatmentName(String kemrTreatmentName) {
        this.kemrTreatmentName = kemrTreatmentName;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KemrTreatment)) {
            return false;
        }
        return id != null && id.equals(((KemrTreatment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KemrTreatment{" +
            "id=" + getId() +
            ", kemrTreatmentName='" + getKemrTreatmentName() + "'" +
            "}";
    }
}
