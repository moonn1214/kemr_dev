package com.jysoft.jyemr.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A KemrInstitution.
 */
@Entity
@Table(name = "kemr_institution")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class KemrInstitution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "kemr_institution_id", length = 20, nullable = false, unique = true)
    private String kemrInstitutionId;

    @NotNull
    @Size(max = 60)
    @Column(name = "kemr_institution_password", length = 60, nullable = false)
    private String kemrInstitutionPassword;

    @NotNull
    @Size(max = 20)
    @Column(name = "kemr_institution_name", length = 20, nullable = false)
    private String kemrInstitutionName;

    @Size(max = 10)
    @Column(name = "kemr_institution_department", length = 10)
    private String kemrInstitutionDepartment;

    @Size(max = 10)
    @Column(name = "kemr_institution_position", length = 10)
    private String kemrInstitutionPosition;

    @NotNull
    @Size(max = 20)
    @Column(name = "kemr_institution_manager", length = 20, nullable = false)
    private String kemrInstitutionManager;

    @NotNull
    @Size(max = 20)
    @Column(name = "kemr_institution_cellphone", length = 20, nullable = false)
    private String kemrInstitutionCellphone;

    @NotNull
    @Size(max = 40)
    @Column(name = "kemr_institution_email", length = 40, nullable = false)
    private String kemrInstitutionEmail;

    @Size(max = 40)
    @Column(name = "kemr_institution_website", length = 40)
    private String kemrInstitutionWebsite;

    @NotNull
    @Column(name = "kemr_institution_agree", nullable = false)
    private Instant kemrInstitutionAgree;

    @NotNull
    @Size(max = 1)
    @Column(name = "kemr_institution_status", length = 1, nullable = false)
    private String kemrInstitutionStatus;

    @Column(name = "kemr_institution_modification")
    private Instant kemrInstitutionModification;

    @Column(name = "kemr_institution_withdrawal")
    private Instant kemrInstitutionWithdrawal;

    @Size(max = 20)
    @Column(name = "kemr_institution_landline", length = 20)
    private String kemrInstitutionLandline;

    @Column(name = "kemr_institution_fail")
    private Integer kemrInstitutionFail;

    @Column(name = "kemr_institution_failtime")
    private Instant kemrInstitutionFailtime;

    @Size(max = 10)
    @Column(name = "kemr_institution_number", length = 10)
    private String kemrInstitutionNumber;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KemrInstitution id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKemrInstitutionId() {
        return this.kemrInstitutionId;
    }

    public KemrInstitution kemrInstitutionId(String kemrInstitutionId) {
        this.setKemrInstitutionId(kemrInstitutionId);
        return this;
    }

    public void setKemrInstitutionId(String kemrInstitutionId) {
        this.kemrInstitutionId = kemrInstitutionId;
    }

    public String getKemrInstitutionPassword() {
        return this.kemrInstitutionPassword;
    }

    public KemrInstitution kemrInstitutionPassword(String kemrInstitutionPassword) {
        this.setKemrInstitutionPassword(kemrInstitutionPassword);
        return this;
    }

    public void setKemrInstitutionPassword(String kemrInstitutionPassword) {
        this.kemrInstitutionPassword = kemrInstitutionPassword;
    }

    public String getKemrInstitutionName() {
        return this.kemrInstitutionName;
    }

    public KemrInstitution kemrInstitutionName(String kemrInstitutionName) {
        this.setKemrInstitutionName(kemrInstitutionName);
        return this;
    }

    public void setKemrInstitutionName(String kemrInstitutionName) {
        this.kemrInstitutionName = kemrInstitutionName;
    }

    public String getKemrInstitutionDepartment() {
        return this.kemrInstitutionDepartment;
    }

    public KemrInstitution kemrInstitutionDepartment(String kemrInstitutionDepartment) {
        this.setKemrInstitutionDepartment(kemrInstitutionDepartment);
        return this;
    }

    public void setKemrInstitutionDepartment(String kemrInstitutionDepartment) {
        this.kemrInstitutionDepartment = kemrInstitutionDepartment;
    }

    public String getKemrInstitutionPosition() {
        return this.kemrInstitutionPosition;
    }

    public KemrInstitution kemrInstitutionPosition(String kemrInstitutionPosition) {
        this.setKemrInstitutionPosition(kemrInstitutionPosition);
        return this;
    }

    public void setKemrInstitutionPosition(String kemrInstitutionPosition) {
        this.kemrInstitutionPosition = kemrInstitutionPosition;
    }

    public String getKemrInstitutionManager() {
        return this.kemrInstitutionManager;
    }

    public KemrInstitution kemrInstitutionManager(String kemrInstitutionManager) {
        this.setKemrInstitutionManager(kemrInstitutionManager);
        return this;
    }

    public void setKemrInstitutionManager(String kemrInstitutionManager) {
        this.kemrInstitutionManager = kemrInstitutionManager;
    }

    public String getKemrInstitutionCellphone() {
        return this.kemrInstitutionCellphone;
    }

    public KemrInstitution kemrInstitutionCellphone(String kemrInstitutionCellphone) {
        this.setKemrInstitutionCellphone(kemrInstitutionCellphone);
        return this;
    }

    public void setKemrInstitutionCellphone(String kemrInstitutionCellphone) {
        this.kemrInstitutionCellphone = kemrInstitutionCellphone;
    }

    public String getKemrInstitutionEmail() {
        return this.kemrInstitutionEmail;
    }

    public KemrInstitution kemrInstitutionEmail(String kemrInstitutionEmail) {
        this.setKemrInstitutionEmail(kemrInstitutionEmail);
        return this;
    }

    public void setKemrInstitutionEmail(String kemrInstitutionEmail) {
        this.kemrInstitutionEmail = kemrInstitutionEmail;
    }

    public String getKemrInstitutionWebsite() {
        return this.kemrInstitutionWebsite;
    }

    public KemrInstitution kemrInstitutionWebsite(String kemrInstitutionWebsite) {
        this.setKemrInstitutionWebsite(kemrInstitutionWebsite);
        return this;
    }

    public void setKemrInstitutionWebsite(String kemrInstitutionWebsite) {
        this.kemrInstitutionWebsite = kemrInstitutionWebsite;
    }

    public Instant getKemrInstitutionAgree() {
        return this.kemrInstitutionAgree;
    }

    public KemrInstitution kemrInstitutionAgree(Instant kemrInstitutionAgree) {
        this.setKemrInstitutionAgree(kemrInstitutionAgree);
        return this;
    }

    public void setKemrInstitutionAgree(Instant kemrInstitutionAgree) {
        this.kemrInstitutionAgree = kemrInstitutionAgree;
    }

    public String getKemrInstitutionStatus() {
        return this.kemrInstitutionStatus;
    }

    public KemrInstitution kemrInstitutionStatus(String kemrInstitutionStatus) {
        this.setKemrInstitutionStatus(kemrInstitutionStatus);
        return this;
    }

    public void setKemrInstitutionStatus(String kemrInstitutionStatus) {
        this.kemrInstitutionStatus = kemrInstitutionStatus;
    }

    public Instant getKemrInstitutionModification() {
        return this.kemrInstitutionModification;
    }

    public KemrInstitution kemrInstitutionModification(Instant kemrInstitutionModification) {
        this.setKemrInstitutionModification(kemrInstitutionModification);
        return this;
    }

    public void setKemrInstitutionModification(Instant kemrInstitutionModification) {
        this.kemrInstitutionModification = kemrInstitutionModification;
    }

    public Instant getKemrInstitutionWithdrawal() {
        return this.kemrInstitutionWithdrawal;
    }

    public KemrInstitution kemrInstitutionWithdrawal(Instant kemrInstitutionWithdrawal) {
        this.setKemrInstitutionWithdrawal(kemrInstitutionWithdrawal);
        return this;
    }

    public void setKemrInstitutionWithdrawal(Instant kemrInstitutionWithdrawal) {
        this.kemrInstitutionWithdrawal = kemrInstitutionWithdrawal;
    }

    public String getKemrInstitutionLandline() {
        return this.kemrInstitutionLandline;
    }

    public KemrInstitution kemrInstitutionLandline(String kemrInstitutionLandline) {
        this.setKemrInstitutionLandline(kemrInstitutionLandline);
        return this;
    }

    public void setKemrInstitutionLandline(String kemrInstitutionLandline) {
        this.kemrInstitutionLandline = kemrInstitutionLandline;
    }

    public Integer getKemrInstitutionFail() {
        return this.kemrInstitutionFail;
    }

    public KemrInstitution kemrInstitutionFail(Integer kemrInstitutionFail) {
        this.setKemrInstitutionFail(kemrInstitutionFail);
        return this;
    }

    public void setKemrInstitutionFail(Integer kemrInstitutionFail) {
        this.kemrInstitutionFail = kemrInstitutionFail;
    }

    public Instant getKemrInstitutionFailtime() {
        return this.kemrInstitutionFailtime;
    }

    public KemrInstitution kemrInstitutionFailtime(Instant kemrInstitutionFailtime) {
        this.setKemrInstitutionFailtime(kemrInstitutionFailtime);
        return this;
    }

    public void setKemrInstitutionFailtime(Instant kemrInstitutionFailtime) {
        this.kemrInstitutionFailtime = kemrInstitutionFailtime;
    }

    public String getKemrInstitutionNumber() {
        return this.kemrInstitutionNumber;
    }

    public KemrInstitution kemrInstitutionNumber(String kemrInstitutionNumber) {
        this.setKemrInstitutionNumber(kemrInstitutionNumber);
        return this;
    }

    public void setKemrInstitutionNumber(String kemrInstitutionNumber) {
        this.kemrInstitutionNumber = kemrInstitutionNumber;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KemrInstitution)) {
            return false;
        }
        return id != null && id.equals(((KemrInstitution) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KemrInstitution{" +
            "id=" + getId() +
            ", kemrInstitutionId='" + getKemrInstitutionId() + "'" +
            ", kemrInstitutionPassword='" + getKemrInstitutionPassword() + "'" +
            ", kemrInstitutionName='" + getKemrInstitutionName() + "'" +
            ", kemrInstitutionDepartment='" + getKemrInstitutionDepartment() + "'" +
            ", kemrInstitutionPosition='" + getKemrInstitutionPosition() + "'" +
            ", kemrInstitutionManager='" + getKemrInstitutionManager() + "'" +
            ", kemrInstitutionCellphone='" + getKemrInstitutionCellphone() + "'" +
            ", kemrInstitutionEmail='" + getKemrInstitutionEmail() + "'" +
            ", kemrInstitutionWebsite='" + getKemrInstitutionWebsite() + "'" +
            ", kemrInstitutionAgree='" + getKemrInstitutionAgree() + "'" +
            ", kemrInstitutionStatus='" + getKemrInstitutionStatus() + "'" +
            ", kemrInstitutionModification='" + getKemrInstitutionModification() + "'" +
            ", kemrInstitutionWithdrawal='" + getKemrInstitutionWithdrawal() + "'" +
            ", kemrInstitutionLandline='" + getKemrInstitutionLandline() + "'" +
            ", kemrInstitutionFail=" + getKemrInstitutionFail() +
            ", kemrInstitutionFailtime='" + getKemrInstitutionFailtime() + "'" +
            ", kemrInstitutionNumber='" + getKemrInstitutionNumber() + "'" +
            "}";
    }
}
