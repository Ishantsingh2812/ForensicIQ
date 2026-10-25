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
    public record JudicialPrecedentDTO(
        @JsonProperty("case_name") @JsonAlias("caseName") String caseName,
        String citation,
        String court,
        @JsonProperty("decision_date") @JsonAlias("decisionDate") String decisionDate,
        @JsonProperty("judgment_url") @JsonAlias("judgmentUrl") String judgmentUrl,
        @JsonProperty("material_facts") @JsonAlias("materialFacts") String materialFacts,
        @JsonProperty("legal_issues") @JsonAlias("legalIssues") List<String> legalIssues,
        @JsonProperty("statutory_provisions") @JsonAlias("statutoryProvisions") List<String> statutoryProvisions,
        @JsonProperty("court_holding_reasoning") @JsonAlias("courtHoldingReasoning") String courtHoldingReasoning,
        @JsonProperty("relevance_to_incident") @JsonAlias("relevanceToIncident") String relevanceToIncident,
        @JsonProperty("factual_legal_distinctions") @JsonAlias("factualLegalDistinctions") String factualLegalDistinctions,
        @JsonProperty("historical_vs_modern_law") @JsonAlias("historicalVsModernLaw") String historicalVsModernLaw,
        @JsonProperty("verification_status") @JsonAlias("verificationStatus") String verificationStatus
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
        String jurisdiction,

        @JsonProperty("relatedPrecedents")
        @JsonAlias({"related_precedents", "relatedPrecedents"})
        List<JudicialPrecedentDTO> relatedPrecedents
    ) {
        // Compatibility constructor without the 4 extra fields
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
                0.88, "MEDIUM", "State Jurisdiction - Judicial Magistrate First Class / Session Court",
                List.of()
            );
        }

        // Compatibility constructor with 3 extra fields
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
            String disclaimer,
            Double predictionConfidence,
            String severityAssessment,
            String jurisdiction
        ) {
            this(
                caseId, createdAt, title, sections, status, ingredients,
                forensicEvidence, defenseCritique, extractedFacts, sources, disclaimer,
                predictionConfidence, severityAssessment, jurisdiction,
                List.of()
            );
        }
    }
}
