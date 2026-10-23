package com.forensicai.ai;

import java.util.List;
import java.util.Map;

public class AiDTOs {

    public record AiAnalyzeRequest(
        String scenario,
        String framework,
        String requestId
    ) {}

    public record SectionDTO(
        String act,
        String section,
        String title,
        String punishment,
        String bnsEquivalent,
        double confidence
    ) {}

    public record StatusDTO(
        boolean bailable,
        boolean cognizable,
        boolean compoundable,
        String triableBy
    ) {}

    public record IngredientDTO(
        String id,
        String element,
        List<String> matchedFacts,
        String satisfied
    ) {}

    public record ForensicEvidenceDTO(
        String category,
        String item,
        String priority,
        String notes
    ) {}

    public record DefenseCritiqueDTO(
        String argument,
        String weakness,
        String counter
    ) {}

    public record SourceCitationDTO(
        String id,
        String label,
        String snippet,
        double score
    ) {}

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
        String disclaimer
    ) {}
}
