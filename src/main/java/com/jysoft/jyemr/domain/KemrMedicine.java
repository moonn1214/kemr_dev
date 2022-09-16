package com.jysoft.jyemr.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A KemrMedicine.
 */
@Entity
@Table(name = "kemr_medicine")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class KemrMedicine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "kemr_medicine_name", length = 50, nullable = false)
    private String kemrMedicineName;

    @NotNull
    @Column(name = "kemr_medicine_price", nullable = false)
    private Integer kemrMedicinePrice;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KemrMedicine id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKemrMedicineName() {
        return this.kemrMedicineName;
    }

    public KemrMedicine kemrMedicineName(String kemrMedicineName) {
        this.setKemrMedicineName(kemrMedicineName);
        return this;
    }

    public void setKemrMedicineName(String kemrMedicineName) {
        this.kemrMedicineName = kemrMedicineName;
    }

    public Integer getKemrMedicinePrice() {
        return this.kemrMedicinePrice;
    }

    public KemrMedicine kemrMedicinePrice(Integer kemrMedicinePrice) {
        this.setKemrMedicinePrice(kemrMedicinePrice);
        return this;
    }

    public void setKemrMedicinePrice(Integer kemrMedicinePrice) {
        this.kemrMedicinePrice = kemrMedicinePrice;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KemrMedicine)) {
            return false;
        }
        return id != null && id.equals(((KemrMedicine) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KemrMedicine{" +
            "id=" + getId() +
            ", kemrMedicineName='" + getKemrMedicineName() + "'" +
            ", kemrMedicinePrice=" + getKemrMedicinePrice() +
            "}";
    }
}
