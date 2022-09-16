package com.jysoft.jyemr.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A KemrDiagnosis.
 */
@Entity
@Table(name = "kemr_diagnosis")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class KemrDiagnosis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "kemr_diagnosis_name", length = 50, nullable = false)
    private String kemrDiagnosisName;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KemrDiagnosis id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKemrDiagnosisName() {
        return this.kemrDiagnosisName;
    }

    public KemrDiagnosis kemrDiagnosisName(String kemrDiagnosisName) {
        this.setKemrDiagnosisName(kemrDiagnosisName);
        return this;
    }

    public void setKemrDiagnosisName(String kemrDiagnosisName) {
        this.kemrDiagnosisName = kemrDiagnosisName;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KemrDiagnosis)) {
            return false;
        }
        return id != null && id.equals(((KemrDiagnosis) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KemrDiagnosis{" +
            "id=" + getId() +
            ", kemrDiagnosisName='" + getKemrDiagnosisName() + "'" +
            "}";
    }
}
