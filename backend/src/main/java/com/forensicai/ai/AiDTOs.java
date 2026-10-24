package com.forensicai.ai;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public class AiDTOs {

    public record AiAnalyzeRequest(
        String scenario,
        String framework,
        String requestId
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record SectionDTO(
        String act,
        String section,
        String title,
        String punishment,
        String bnsEquivalent,
        double confidence
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record StatusDTO(
        boolean bailable,
        boolean cognizable,
        boolean compoundable,
        String triableBy
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record IngredientDTO(
        String id,
        String element,
        List<String> matchedFacts,
        String satisfied
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record ForensicEvidenceDTO(
        String category,
        String item,
        String priority,
        String notes
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record DefenseCritiqueDTO(
        String argument,
        String weakness,
        String counter
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record SourceCitationDTO(
        String id,
        String label,
        String snippet,
        double score
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record AiAnalyzeResponse(
        String caseId,
        String createdAt,
        String title,
        List<SectionDTO> sections,
        StatusDTO status,
        List<IngredientDTO> ingredients,
        List<ForensicEvidenceDTO> forensicEvidence,
        List<DefenseCritiqueDTO> defenseCritique,
        Map<String, List<String>> extractedFacts,
        List<SourceCitationDTO> sources,
        String disclaimer,

        @JsonProperty("predictionConfidence")
        @JsonAlias("prediction_confidence")
        Double predictionConfidence,

        @JsonProperty("severityAssessment")
        @JsonAlias("severity_assessment")
        String severityAssessment,

        @JsonProperty("jurisdiction")
        String jurisdiction
    ) {
        // Compatibility constructor without the 3 extra fields
        public AiAnalyzeResponse(
            String caseId,
            String createdAt,
            String title,
            List<SectionDTO> sections,
            StatusDTO status,
            List<IngredientDTO> ingredients,
            List<ForensicEvidenceDTO> forensicEvidence,
            List<DefenseCritiqueDTO> defenseCritique,
            Map<String, List<String>> extractedFacts,
            List<SourceCitationDTO> sources,
            String disclaimer
        ) {
            this(
                caseId, createdAt, title, sections, status, ingredients,
                forensicEvidence, defenseCritique, extractedFacts, sources, disclaimer,
                0.88, "MEDIUM", "State Jurisdiction - Judicial Magistrate First Class / Session Court"
            );
        }
    }
}
