package com.forensicai.casestudy;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;

@Service
public class CaseStudyService {

    private final CaseStudyRepository caseStudyRepository;
    private final ObjectMapper objectMapper;

    public CaseStudyService(CaseStudyRepository caseStudyRepository, ObjectMapper objectMapper) {
        this.caseStudyRepository = caseStudyRepository;
        this.objectMapper = objectMapper;
    }

    public List<CaseStudyEntity> getCaseStudies(
            String category,
            String court,
            Integer year,
            String act,
            String evidenceType,
            String search,
            String sort
    ) {
        return getCaseStudies(category, court, year, act, evidenceType, search, sort, "PUBLISHED");
    }

    public List<CaseStudyEntity> getCaseStudies(
            String category,
            String court,
            Integer year,
            String act,
            String evidenceType,
            String search,
            String sort,
            String status
    ) {
        List<CaseStudyEntity> list = caseStudyRepository.findAll();

        return list.stream()
                .filter(c -> {
                    // Status filter: DRAFT, PUBLISHED, or ALL
                    if (status != null && !status.equalsIgnoreCase("ALL") && !status.isBlank()) {
                        String entityStatus = c.getStatus() != null ? c.getStatus() : "PUBLISHED";
                        if (!entityStatus.equalsIgnoreCase(status)) return false;
                    }

                    if (category != null && !category.equalsIgnoreCase("All") && !category.isBlank()) {
                        if (!c.getCategory().equalsIgnoreCase(category)) return false;
                    }
                    if (court != null && !court.equalsIgnoreCase("All") && !court.isBlank()) {
                        if (c.getCourt() == null || !c.getCourt().toLowerCase().contains(court.toLowerCase())) return false;
                    }
                    if (year != null && year > 0) {
                        if (c.getDecisionYear() == null || !c.getDecisionYear().equals(year)) return false;
                    }
                    if (act != null && !act.equalsIgnoreCase("All") && !act.isBlank()) {
                        String actLower = act.toLowerCase();
                        boolean matchAct = (c.getSectionsAppliedJson() != null && c.getSectionsAppliedJson().toLowerCase().contains(actLower)) ||
                                           (c.getIpcBnsComparisonJson() != null && c.getIpcBnsComparisonJson().toLowerCase().contains(actLower));
                        if (!matchAct) return false;
                    }
                    if (evidenceType != null && !evidenceType.equalsIgnoreCase("All") && !evidenceType.isBlank()) {
                        String evLower = evidenceType.toLowerCase();
                        boolean matchEv = (c.getEvidenceType() != null && c.getEvidenceType().toLowerCase().contains(evLower)) ||
                                          (c.getEvidenceListJson() != null && c.getEvidenceListJson().toLowerCase().contains(evLower));
                        if (!matchEv) return false;
                    }
                    if (search != null && !search.isBlank()) {
                        String q = search.toLowerCase();
                        boolean matchSearch =
                                (c.getTitle() != null && c.getTitle().toLowerCase().contains(q)) ||
                                (c.getSummary() != null && c.getSummary().toLowerCase().contains(q)) ||
                                (c.getCitation() != null && c.getCitation().toLowerCase().contains(q)) ||
                                (c.getJurisdiction() != null && c.getJurisdiction().toLowerCase().contains(q)) ||
                                (c.getCourt() != null && c.getCourt().toLowerCase().contains(q)) ||
                                (c.getCaseReference() != null && c.getCaseReference().toLowerCase().contains(q)) ||
                                (c.getBackgroundFacts() != null && c.getBackgroundFacts().toLowerCase().contains(q)) ||
                                (c.getCourtReasoning() != null && c.getCourtReasoning().toLowerCase().contains(q)) ||
                                (c.getSectionsAppliedJson() != null && c.getSectionsAppliedJson().toLowerCase().contains(q));
                        if (!matchSearch) return false;
                    }
                    return true;
                })
                .sorted((a, b) -> {
                    if ("oldest".equalsIgnoreCase(sort)) {
                        LocalDate d1 = a.getCaseDate() != null ? a.getCaseDate() : LocalDate.of(1900, 1, 1);
                        LocalDate d2 = b.getCaseDate() != null ? b.getCaseDate() : LocalDate.of(1900, 1, 1);
                        return d1.compareTo(d2);
                    }
                    if ("title".equalsIgnoreCase(sort)) {
                        return a.getTitle().compareToIgnoreCase(b.getTitle());
                    }
                    // Default newest
                    LocalDate d1 = a.getCaseDate() != null ? a.getCaseDate() : LocalDate.of(1900, 1, 1);
                    LocalDate d2 = b.getCaseDate() != null ? b.getCaseDate() : LocalDate.of(1900, 1, 1);
                    return d2.compareTo(d1);
                })
                .toList();
    }

    public CaseStudyDTOs.CaseStudyPageResponse getCaseStudiesPage(
            String category,
            String court,
            Integer year,
            String act,
            String evidenceType,
            String search,
            String sort,
            String status,
            int page,
            int size
    ) {
        List<CaseStudyEntity> filtered = getCaseStudies(category, court, year, act, evidenceType, search, sort, status);
        int totalItems = filtered.size();
        int pageSize = size > 0 ? size : 12;
        int currentPage = Math.max(0, page);
        int totalPages = (int) Math.ceil((double) totalItems / pageSize);

        int fromIndex = Math.min(currentPage * pageSize, totalItems);
        int toIndex = Math.min(fromIndex + pageSize, totalItems);

        List<CaseStudyDTOs.CaseStudyResponse> pagedResponses = filtered.subList(fromIndex, toIndex)
                .stream()
                .map(this::toResponseDTO)
                .toList();

        return new CaseStudyDTOs.CaseStudyPageResponse(
                pagedResponses,
                totalItems,
                currentPage,
                pageSize,
                totalPages
        );
    }

    public Optional<CaseStudyEntity> getBySlug(String slug) {
        return caseStudyRepository.findBySlug(slug);
    }

    public Optional<CaseStudyDTOs.CaseStudyResponse> getByIdOrSlug(String idOrSlug, boolean allowDraft) {
        Optional<CaseStudyEntity> entityOpt = caseStudyRepository.findBySlug(idOrSlug);
        if (entityOpt.isEmpty()) {
            entityOpt = caseStudyRepository.findById(idOrSlug);
        }

        if (entityOpt.isEmpty()) {
            return Optional.empty();
        }

        CaseStudyEntity entity = entityOpt.get();
        if (!allowDraft && "DRAFT".equalsIgnoreCase(entity.getStatus())) {
            return Optional.empty();
        }

        return Optional.of(toResponseDTO(entity));
    }

    @Transactional
    public CaseStudyDTOs.CaseStudyResponse createCaseStudy(CaseStudyDTOs.CreateCaseStudyRequest req, String username) {
        validateUrlIfPresent(req.judgmentUrl());

        CaseStudyEntity entity = new CaseStudyEntity();
        String uniqueId = "CS-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        entity.setId(uniqueId);

        String generatedSlug = generateSlug(req.title());
        entity.setSlug(generatedSlug);

        entity.setTitle(req.title().trim());
        entity.setCategory(req.category().trim());
        entity.setSummary(req.summary().trim());
        entity.setDifficulty(req.difficulty() != null && !req.difficulty().isBlank() ? req.difficulty() : "Intermediate");
        entity.setCaseType(req.caseType() != null && !req.caseType().isBlank() ? req.caseType() : "Criminal Precedent");
        entity.setJurisdiction(req.jurisdiction() != null && !req.jurisdiction().isBlank() ? req.jurisdiction() : "Indian Judicial System");
        entity.setCourt(req.court() != null && !req.court().isBlank() ? req.court() : "Supreme Court of India");
        
        LocalDate caseDate = req.caseDate();
        if (caseDate == null && req.decisionYear() != null && req.decisionYear() > 1800) {
            caseDate = LocalDate.of(req.decisionYear(), 1, 1);
        } else if (caseDate == null) {
            caseDate = LocalDate.now();
        }
        entity.setCaseDate(caseDate);
        entity.setDecisionYear(req.decisionYear() != null ? req.decisionYear() : caseDate.getYear());

        entity.setCitation(req.citation());
        entity.setJudgmentUrl(req.judgmentUrl());
        entity.setSourceName(req.sourceName());
        entity.setCaseReference(req.caseReference());
        entity.setEvidenceType(req.evidenceType() != null && !req.evidenceType().isBlank() ? req.evidenceType() : "physical, documentary");
        entity.setCaseStatus(req.caseStatus() != null && !req.caseStatus().isBlank() ? req.caseStatus() : "DECIDED");
        
        String publicationStatus = req.status() != null && req.status().equalsIgnoreCase("DRAFT") ? "DRAFT" : "PUBLISHED";
        entity.setStatus(publicationStatus);

        entity.setOverview(req.overview() != null && !req.overview().isBlank() ? req.overview() : req.summary());
        entity.setBackgroundFacts(req.backgroundFacts());
        entity.setInvestigationFindings(req.investigationFindings());
        entity.setCourtReasoning(req.courtReasoning());
        entity.setOutcome(req.outcome() != null && !req.outcome().isBlank() ? req.outcome() : "Order reserved / Judgment pronounced");
        entity.setFinalOrder(req.finalOrder());
        entity.setPedagogicalTakeaways(req.pedagogicalTakeaways());
        entity.setFactFindingDistinction(req.factFindingDistinction());
        entity.setVerificationStatus(req.verificationStatus() != null && !req.verificationStatus().isBlank() ? req.verificationStatus() : "MANUAL_ENTRY");

        entity.setCreatedBy(username != null ? username : "System Administrator");
        entity.setCreatedAt(Instant.now());
        entity.setUpdatedAt(Instant.now());

        // Serialized JSON fields
        entity.setFactsTimelineJson(toJson(req.factsTimeline()));
        entity.setIssuesBeforeCourtJson(toJson(req.issuesBeforeCourt()));
        entity.setSectionsAppliedJson(toJson(req.sectionsApplied()));
        entity.setEvidenceListJson(toJson(req.evidenceList()));
        entity.setPartyArgumentsJson(toJson(req.partyArguments()));
        entity.setLegalPrinciplesJson(toJson(req.legalPrinciples()));
        entity.setIpcBnsComparisonJson(toJson(req.ipcBnsComparison()));
        entity.setRelatedCasesJson(toJson(req.relatedCases()));
        entity.setMediaJson(toJson(req.mediaList()));

        CaseStudyEntity saved = caseStudyRepository.save(entity);
        return toResponseDTO(saved);
    }

    @Transactional
    public CaseStudyDTOs.CaseStudyResponse updateCaseStudy(String id, CaseStudyDTOs.UpdateCaseStudyRequest req, String username) {
        CaseStudyEntity entity = caseStudyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Case study not found with id: " + id));

        validateUrlIfPresent(req.judgmentUrl());

        if (req.title() != null && !req.title().isBlank()) {
            entity.setTitle(req.title().trim());
        }
        if (req.category() != null && !req.category().isBlank()) {
            entity.setCategory(req.category().trim());
        }
        if (req.summary() != null && !req.summary().isBlank()) {
            entity.setSummary(req.summary().trim());
        }
        if (req.difficulty() != null) entity.setDifficulty(req.difficulty());
        if (req.caseType() != null) entity.setCaseType(req.caseType());
        if (req.jurisdiction() != null) entity.setJurisdiction(req.jurisdiction());
        if (req.court() != null) entity.setCourt(req.court());
        
        if (req.caseDate() != null) {
            entity.setCaseDate(req.caseDate());
            entity.setDecisionYear(req.caseDate().getYear());
        } else if (req.decisionYear() != null) {
            entity.setDecisionYear(req.decisionYear());
        }

        if (req.citation() != null) entity.setCitation(req.citation());
        if (req.judgmentUrl() != null) entity.setJudgmentUrl(req.judgmentUrl());
        if (req.sourceName() != null) entity.setSourceName(req.sourceName());
        if (req.caseReference() != null) entity.setCaseReference(req.caseReference());
        if (req.evidenceType() != null) entity.setEvidenceType(req.evidenceType());
        if (req.caseStatus() != null) entity.setCaseStatus(req.caseStatus());
        if (req.status() != null && (req.status().equalsIgnoreCase("DRAFT") || req.status().equalsIgnoreCase("PUBLISHED"))) {
            entity.setStatus(req.status().toUpperCase());
        }
        if (req.overview() != null) entity.setOverview(req.overview());
        if (req.backgroundFacts() != null) entity.setBackgroundFacts(req.backgroundFacts());
        if (req.investigationFindings() != null) entity.setInvestigationFindings(req.investigationFindings());
        if (req.courtReasoning() != null) entity.setCourtReasoning(req.courtReasoning());
        if (req.outcome() != null) entity.setOutcome(req.outcome());
        if (req.finalOrder() != null) entity.setFinalOrder(req.finalOrder());
        if (req.pedagogicalTakeaways() != null) entity.setPedagogicalTakeaways(req.pedagogicalTakeaways());
        if (req.factFindingDistinction() != null) entity.setFactFindingDistinction(req.factFindingDistinction());
        if (req.verificationStatus() != null) entity.setVerificationStatus(req.verificationStatus());

        if (req.factsTimeline() != null) entity.setFactsTimelineJson(toJson(req.factsTimeline()));
        if (req.issuesBeforeCourt() != null) entity.setIssuesBeforeCourtJson(toJson(req.issuesBeforeCourt()));
        if (req.sectionsApplied() != null) entity.setSectionsAppliedJson(toJson(req.sectionsApplied()));
        if (req.evidenceList() != null) entity.setEvidenceListJson(toJson(req.evidenceList()));
        if (req.partyArguments() != null) entity.setPartyArgumentsJson(toJson(req.partyArguments()));
        if (req.legalPrinciples() != null) entity.setLegalPrinciplesJson(toJson(req.legalPrinciples()));
        if (req.ipcBnsComparison() != null) entity.setIpcBnsComparisonJson(toJson(req.ipcBnsComparison()));
        if (req.relatedCases() != null) entity.setRelatedCasesJson(toJson(req.relatedCases()));
        if (req.mediaList() != null) entity.setMediaJson(toJson(req.mediaList()));

        entity.setUpdatedAt(Instant.now());

        CaseStudyEntity saved = caseStudyRepository.save(entity);
        return toResponseDTO(saved);
    }

    @Transactional
    public CaseStudyDTOs.CaseStudyResponse updateStatus(String id, String newStatus) {
        if (!"DRAFT".equalsIgnoreCase(newStatus) && !"PUBLISHED".equalsIgnoreCase(newStatus)) {
            throw new IllegalArgumentException("Status must be either 'DRAFT' or 'PUBLISHED'");
        }

        CaseStudyEntity entity = caseStudyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Case study not found with id: " + id));

        entity.setStatus(newStatus.toUpperCase());
        entity.setUpdatedAt(Instant.now());
        CaseStudyEntity saved = caseStudyRepository.save(entity);
        return toResponseDTO(saved);
    }

    @Transactional
    public void deleteCaseStudy(String id) {
        if (!caseStudyRepository.existsById(id)) {
            // Also check by slug
            Optional<CaseStudyEntity> bySlug = caseStudyRepository.findBySlug(id);
            if (bySlug.isPresent()) {
                caseStudyRepository.delete(bySlug.get());
                return;
            }
            throw new IllegalArgumentException("Case study not found with id: " + id);
        }
        caseStudyRepository.deleteById(id);
    }

    public CaseStudyDTOs.CaseStudyResponse toResponseDTO(CaseStudyEntity c) {
        String dateStr = c.getCaseDate() != null ? c.getCaseDate().toString() : (c.getDecisionYear() != null ? c.getDecisionYear() + "-01-01" : "2024-01-01");
        return new CaseStudyDTOs.CaseStudyResponse(
                c.getId(),
                c.getSlug(),
                c.getTitle(),
                c.getCaseType(),
                c.getCategory(),
                c.getDifficulty(),
                c.getSummary(),
                c.getOverview(),
                c.getJurisdiction(),
                c.getCourt(),
                c.getCaseDate(),
                dateStr,
                c.getDecisionYear(),
                c.getCitation(),
                c.getJudgmentUrl(),
                c.getSourceName(),
                c.getCaseReference(),
                c.getEvidenceType(),
                c.getCaseStatus(),
                c.getStatus() != null ? c.getStatus() : "PUBLISHED",
                c.getBackgroundFacts(),
                c.getInvestigationFindings(),
                c.getCourtReasoning(),
                c.getOutcome(),
                c.getFinalOrder(),
                c.getPedagogicalTakeaways(),
                c.getFactFindingDistinction(),
                c.getVerificationStatus(),
                c.getCreatedBy(),
                c.getCreatedAt(),
                c.getUpdatedAt(),
                fromJson(c.getFactsTimelineJson(), new TypeReference<List<Map<String, String>>>() {}),
                fromJson(c.getIssuesBeforeCourtJson(), new TypeReference<List<String>>() {}),
                fromJson(c.getSectionsAppliedJson(), new TypeReference<List<Map<String, String>>>() {}),
                fromJson(c.getEvidenceListJson(), new TypeReference<List<Map<String, String>>>() {}),
                fromJson(c.getPartyArgumentsJson(), new TypeReference<List<Map<String, String>>>() {}),
                fromJson(c.getLegalPrinciplesJson(), new TypeReference<List<String>>() {}),
                fromJson(c.getIpcBnsComparisonJson(), new TypeReference<List<Map<String, String>>>() {}),
                fromJson(c.getRelatedCasesJson(), new TypeReference<List<String>>() {}),
                fromJson(c.getMediaJson(), new TypeReference<List<Map<String, String>>>() {})
        );
    }

    private void validateUrlIfPresent(String url) {
        if (url != null && !url.isBlank()) {
            try {
                URI uri = URI.create(url.trim());
                String scheme = uri.getScheme();
                if (scheme == null || (!scheme.equalsIgnoreCase("http") && !scheme.equalsIgnoreCase("https"))) {
                    throw new IllegalArgumentException("Source judgment URL must start with http:// or https://");
                }
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid source judgment URL: " + e.getMessage());
            }
        }
    }

    private String generateSlug(String title) {
        String base = title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .trim();
        if (base.length() > 60) {
            base = base.substring(0, 60);
        }
        String candidate = base + "-" + UUID.randomUUID().toString().substring(0, 6);
        while (caseStudyRepository.findBySlug(candidate).isPresent()) {
            candidate = base + "-" + UUID.randomUUID().toString().substring(0, 6);
        }
        return candidate;
    }

    private String toJson(Object obj) {
        if (obj == null) return null;
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return null;
        }
    }

    private <T> T fromJson(String json, TypeReference<T> ref) {
        if (json == null || json.isBlank()) return null;
        try {
            return objectMapper.readValue(json, ref);
        } catch (Exception e) {
            return null;
        }
    }
}
