package com.forensicai.casestudy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class CaseStudyDTOs {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record CreateCaseStudyRequest(
            @NotBlank(message = "Title is required")
            @Size(min = 3, max = 256, message = "Title must be between 3 and 256 characters")
            String title,

            @NotBlank(message = "Category is required")
            String category,

            @NotBlank(message = "Summary is required")
            @Size(min = 10, message = "Summary must be at least 10 characters")
            String summary,

            String difficulty,
            String caseType,
            String jurisdiction,
            String court,
            LocalDate caseDate,
            String date,
            Integer decisionYear,
            String citation,
            String judgmentUrl,
            String sourceName,
            String caseReference,
            String evidenceType,
            String caseStatus,
            String status, // "DRAFT" or "PUBLISHED"
            String overview,
            String backgroundFacts,
            String investigationFindings,
            String courtReasoning,
            String outcome,
            String finalOrder,
            String pedagogicalTakeaways,
            String factFindingDistinction,
            String verificationStatus,
            List<Map<String, String>> factsTimeline,
            List<String> issuesBeforeCourt,
            List<Map<String, String>> sectionsApplied,
            List<Map<String, String>> evidenceList,
            List<Map<String, String>> partyArguments,
            List<String> legalPrinciples,
            List<Map<String, String>> ipcBnsComparison,
            List<String> relatedCases,
            List<Map<String, String>> mediaList
    ) {
        public CreateCaseStudyRequest(String title, String category, String summary) {
            this(title, category, summary, null, null, null, null, null, null, null, null, null, null, null, null, null, "DRAFT", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        }

        public CreateCaseStudyRequest(String title, String category, String summary, String judgmentUrl) {
            this(title, category, summary, null, null, null, null, null, null, null, null, judgmentUrl, null, null, null, null, "DRAFT", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record UpdateCaseStudyRequest(
            String title,
            String category,
            String summary,
            String difficulty,
            String caseType,
            String jurisdiction,
            String court,
            LocalDate caseDate,
            String date,
            Integer decisionYear,
            String citation,
            String judgmentUrl,
            String sourceName,
            String caseReference,
            String evidenceType,
            String caseStatus,
            String status, // "DRAFT" or "PUBLISHED"
            String overview,
            String backgroundFacts,
            String investigationFindings,
            String courtReasoning,
            String outcome,
            String finalOrder,
            String pedagogicalTakeaways,
            String factFindingDistinction,
            String verificationStatus,
            List<Map<String, String>> factsTimeline,
            List<String> issuesBeforeCourt,
            List<Map<String, String>> sectionsApplied,
            List<Map<String, String>> evidenceList,
            List<Map<String, String>> partyArguments,
            List<String> legalPrinciples,
            List<Map<String, String>> ipcBnsComparison,
            List<String> relatedCases,
            List<Map<String, String>> mediaList
    ) {
        public UpdateCaseStudyRequest(String title, String category, String summary) {
            this(title, category, summary, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record StatusUpdateRequest(
            @NotBlank(message = "Status is required")
            String status
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record CaseStudyResponse(
            String id,
            String slug,
            String title,
            String caseType,
            String category,
            String difficulty,
            String summary,
            String overview,
            String jurisdiction,
            String court,
            LocalDate caseDate,
            String date,
            Integer decisionYear,
            String citation,
            String judgmentUrl,
            String sourceName,
            String caseReference,
            String evidenceType,
            String caseStatus,
            String status,
            String backgroundFacts,
            String investigationFindings,
            String courtReasoning,
            String outcome,
            String finalOrder,
            String pedagogicalTakeaways,
            String factFindingDistinction,
            String verificationStatus,
            String createdBy,
            Instant createdAt,
            Instant updatedAt,
            List<Map<String, String>> factsTimeline,
            List<String> issuesBeforeCourt,
            List<Map<String, String>> sectionsApplied,
            List<Map<String, String>> evidenceList,
            List<Map<String, String>> partyArguments,
            List<String> legalPrinciples,
            List<Map<String, String>> ipcBnsComparison,
            List<String> relatedCases,
            List<Map<String, String>> mediaList
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record CaseStudyPageResponse(
            List<CaseStudyResponse> items,
            long totalItems,
            int page,
            int pageSize,
            int totalPages
    ) {}
}
