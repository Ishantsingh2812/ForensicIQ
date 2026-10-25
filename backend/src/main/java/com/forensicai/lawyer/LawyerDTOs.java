package com.forensicai.lawyer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class LawyerDTOs {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record LawyerDTO(
        String id,
        String name,
        String barCouncilEnrollment,
        String qualification,
        String city,
        String district,
        String state,
        List<String> practiceAreas,
        List<String> languages,
        boolean isLegalAid,
        String legalAidOrganization,
        String officeAddress,
        String publicProfileUrl,
        String contactLink,
        String phoneHelpline,
        String verificationSource,
        String lastVerifiedDate,
        String verificationStatus
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record LawyerSearchResponse(
        int totalListings,
        int uniqueLawyers,
        int verifiedCount,
        boolean isLegalAidAvailable,
        String nalsaHelpline,
        String nalsaPortalUrl,
        String countExplanation,
        List<LawyerDTO> listings
    ) {}
}
