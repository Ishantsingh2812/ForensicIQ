package com.forensicai.lawyer;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "lawyer_listings")
public class LawyerListingEntity {

    @Id
    @Column(length = 64)
    private String id;

    @Column(nullable = false, length = 128)
    private String name;

    @Column(name = "bar_council_enrollment", length = 64)
    private String barCouncilEnrollment;

    @Column(length = 255)
    private String qualification;

    @Column(nullable = false, length = 64)
    private String city;

    @Column(length = 64)
    private String district;

    @Column(length = 64)
    private String state;

    @Column(name = "practice_areas_json", columnDefinition = "TEXT")
    private String practiceAreasJson;

    @Column(name = "languages_json", columnDefinition = "TEXT")
    private String languagesJson;

    @Column(name = "is_legal_aid", nullable = false)
    private boolean isLegalAid = false;

    @Column(name = "legal_aid_organization", length = 128)
    private String legalAidOrganization;

    @Column(name = "office_address", columnDefinition = "TEXT")
    private String officeAddress;

    @Column(name = "public_profile_url", length = 512)
    private String publicProfileUrl;

    @Column(name = "contact_link", length = 255)
    private String contactLink;

    @Column(name = "phone_helpline", length = 64)
    private String phoneHelpline;

    @Column(name = "verification_source", length = 255)
    private String verificationSource;

    @Column(name = "last_verified_date")
    private LocalDate lastVerifiedDate;

    @Column(name = "verification_status", length = 64)
    private String verificationStatus = "VERIFIED_OFFICIAL_RECORD";

    public LawyerListingEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBarCouncilEnrollment() { return barCouncilEnrollment; }
    public void setBarCouncilEnrollment(String barCouncilEnrollment) { this.barCouncilEnrollment = barCouncilEnrollment; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPracticeAreasJson() { return practiceAreasJson; }
    public void setPracticeAreasJson(String practiceAreasJson) { this.practiceAreasJson = practiceAreasJson; }

    public String getLanguagesJson() { return languagesJson; }
    public void setLanguagesJson(String languagesJson) { this.languagesJson = languagesJson; }

    public boolean isLegalAid() { return isLegalAid; }
    public void setLegalAid(boolean legalAid) { isLegalAid = legalAid; }

    public String getLegalAidOrganization() { return legalAidOrganization; }
    public void setLegalAidOrganization(String legalAidOrganization) { this.legalAidOrganization = legalAidOrganization; }

    public String getOfficeAddress() { return officeAddress; }
    public void setOfficeAddress(String officeAddress) { this.officeAddress = officeAddress; }

    public String getPublicProfileUrl() { return publicProfileUrl; }
    public void setPublicProfileUrl(String publicProfileUrl) { this.publicProfileUrl = publicProfileUrl; }

    public String getContactLink() { return contactLink; }
    public void setContactLink(String contactLink) { this.contactLink = contactLink; }

    public String getPhoneHelpline() { return phoneHelpline; }
    public void setPhoneHelpline(String phoneHelpline) { this.phoneHelpline = phoneHelpline; }

    public String getVerificationSource() { return verificationSource; }
    public void setVerificationSource(String verificationSource) { this.verificationSource = verificationSource; }

    public LocalDate getLastVerifiedDate() { return lastVerifiedDate; }
    public void setLastVerifiedDate(LocalDate lastVerifiedDate) { this.lastVerifiedDate = lastVerifiedDate; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }
}
