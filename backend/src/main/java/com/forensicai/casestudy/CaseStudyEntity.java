package com.forensicai.casestudy;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "case_studies")
public class CaseStudyEntity {

    @Id
    @Column(length = 64)
    private String id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Column(name = "case_type", length = 64)
    private String caseType = "Criminal Precedent";

    @Column(nullable = false, length = 64)
    private String category;

    @Column(nullable = false, length = 32)
    private String difficulty;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @Column(nullable = false)
    private String jurisdiction;

    @Column(length = 128)
    private String court = "Supreme Court of India";

    @Column(name = "case_date", nullable = false)
    private LocalDate caseDate;

    @Column(name = "decision_year")
    private Integer decisionYear;

    @Column(name = "citation", length = 128)
    private String citation;

    @Column(name = "judgment_url", length = 512)
    private String judgmentUrl;

    @Column(name = "evidence_type", length = 64)
    private String evidenceType = "physical, documentary";

    @Column(name = "case_status", length = 64)
    private String caseStatus = "DECIDED";

    @Column(name = "background_facts", columnDefinition = "TEXT")
    private String backgroundFacts;

    @Column(name = "facts_timeline_json", columnDefinition = "TEXT")
    private String factsTimelineJson;

    @Column(name = "issues_before_court_json", columnDefinition = "TEXT")
    private String issuesBeforeCourtJson;

    @Column(name = "sections_applied_json", columnDefinition = "TEXT")
    private String sectionsAppliedJson;

    @Column(name = "evidence_list_json", columnDefinition = "TEXT")
    private String evidenceListJson;

    @Column(name = "party_arguments_json", columnDefinition = "TEXT")
    private String partyArgumentsJson;

    @Column(name = "court_reasoning", columnDefinition = "TEXT")
    private String courtReasoning;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String outcome;

    @Column(name = "final_order", columnDefinition = "TEXT")
    private String finalOrder;

    @Column(name = "legal_principles_json", columnDefinition = "TEXT")
    private String legalPrinciplesJson;

    @Column(name = "ipc_bns_comparison_json", columnDefinition = "TEXT")
    private String ipcBnsComparisonJson;

    @Column(name = "related_cases_json", columnDefinition = "TEXT")
    private String relatedCasesJson;

    @Column(name = "pedagogical_takeaways", columnDefinition = "TEXT")
    private String pedagogicalTakeaways;

    @Column(name = "fact_finding_distinction", columnDefinition = "TEXT")
    private String factFindingDistinction;

    @Column(name = "verification_status", length = 64)
    private String verificationStatus = "VERIFIED_OFFICIAL_RECORD";

    @Column(name = "status", length = 32, nullable = false)
    private String status = "PUBLISHED"; // "DRAFT" or "PUBLISHED"

    @Column(name = "case_reference", length = 128)
    private String caseReference;

    @Column(name = "source_name", length = 256)
    private String sourceName;

    @Column(name = "investigation_findings", columnDefinition = "TEXT")
    private String investigationFindings;

    @Column(name = "media_json", columnDefinition = "TEXT")
    private String mediaJson;

    @Column(name = "created_at")
    private java.time.Instant createdAt;

    @Column(name = "updated_at")
    private java.time.Instant updatedAt;

    @Column(name = "created_by", length = 128)
    private String createdBy;

    @PrePersist
    public void onPrePersist() {
        if (createdAt == null) {
            createdAt = java.time.Instant.now();
        }
        if (updatedAt == null) {
            updatedAt = java.time.Instant.now();
        }
        if (status == null || status.isBlank()) {
            status = "PUBLISHED";
        }
    }

    @PreUpdate
    public void onPreUpdate() {
        updatedAt = java.time.Instant.now();
    }

    public CaseStudyEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCaseType() { return caseType; }
    public void setCaseType(String caseType) { this.caseType = caseType; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getOverview() { return overview; }
    public void setOverview(String overview) { this.overview = overview; }

    public String getJurisdiction() { return jurisdiction; }
    public void setJurisdiction(String jurisdiction) { this.jurisdiction = jurisdiction; }

    public String getCourt() { return court; }
    public void setCourt(String court) { this.court = court; }

    public LocalDate getCaseDate() { return caseDate; }
    public void setCaseDate(LocalDate caseDate) {
        this.caseDate = caseDate;
        if (caseDate != null) {
            this.decisionYear = caseDate.getYear();
        }
    }

    public Integer getDecisionYear() { return decisionYear; }
    public void setDecisionYear(Integer decisionYear) { this.decisionYear = decisionYear; }

    public String getCitation() { return citation; }
    public void setCitation(String citation) { this.citation = citation; }

    public String getJudgmentUrl() { return judgmentUrl; }
    public void setJudgmentUrl(String judgmentUrl) { this.judgmentUrl = judgmentUrl; }

    public String getEvidenceType() { return evidenceType; }
    public void setEvidenceType(String evidenceType) { this.evidenceType = evidenceType; }

    public String getCaseStatus() { return caseStatus; }
    public void setCaseStatus(String caseStatus) { this.caseStatus = caseStatus; }

    public String getBackgroundFacts() { return backgroundFacts; }
    public void setBackgroundFacts(String backgroundFacts) { this.backgroundFacts = backgroundFacts; }

    public String getFactsTimelineJson() { return factsTimelineJson; }
    public void setFactsTimelineJson(String factsTimelineJson) { this.factsTimelineJson = factsTimelineJson; }

    public String getIssuesBeforeCourtJson() { return issuesBeforeCourtJson; }
    public void setIssuesBeforeCourtJson(String issuesBeforeCourtJson) { this.issuesBeforeCourtJson = issuesBeforeCourtJson; }

    public String getSectionsAppliedJson() { return sectionsAppliedJson; }
    public void setSectionsAppliedJson(String sectionsAppliedJson) { this.sectionsAppliedJson = sectionsAppliedJson; }

    public String getEvidenceListJson() { return evidenceListJson; }
    public void setEvidenceListJson(String evidenceListJson) { this.evidenceListJson = evidenceListJson; }

    public String getPartyArgumentsJson() { return partyArgumentsJson; }
    public void setPartyArgumentsJson(String partyArgumentsJson) { this.partyArgumentsJson = partyArgumentsJson; }

    public String getCourtReasoning() { return courtReasoning; }
    public void setCourtReasoning(String courtReasoning) { this.courtReasoning = courtReasoning; }

    public String getOutcome() { return outcome; }
    public void setOutcome(String outcome) { this.outcome = outcome; }

    public String getFinalOrder() { return finalOrder; }
    public void setFinalOrder(String finalOrder) { this.finalOrder = finalOrder; }

    public String getLegalPrinciplesJson() { return legalPrinciplesJson; }
    public void setLegalPrinciplesJson(String legalPrinciplesJson) { this.legalPrinciplesJson = legalPrinciplesJson; }

    public String getIpcBnsComparisonJson() { return ipcBnsComparisonJson; }
    public void setIpcBnsComparisonJson(String ipcBnsComparisonJson) { this.ipcBnsComparisonJson = ipcBnsComparisonJson; }

    public String getRelatedCasesJson() { return relatedCasesJson; }
    public void setRelatedCasesJson(String relatedCasesJson) { this.relatedCasesJson = relatedCasesJson; }

    public String getPedagogicalTakeaways() { return pedagogicalTakeaways; }
    public void setPedagogicalTakeaways(String pedagogicalTakeaways) { this.pedagogicalTakeaways = pedagogicalTakeaways; }

    public String getFactFindingDistinction() { return factFindingDistinction; }
    public void setFactFindingDistinction(String factFindingDistinction) { this.factFindingDistinction = factFindingDistinction; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCaseReference() { return caseReference; }
    public void setCaseReference(String caseReference) { this.caseReference = caseReference; }

    public String getSourceName() { return sourceName; }
    public void setSourceName(String sourceName) { this.sourceName = sourceName; }

    public String getInvestigationFindings() { return investigationFindings; }
    public void setInvestigationFindings(String investigationFindings) { this.investigationFindings = investigationFindings; }

    public String getMediaJson() { return mediaJson; }
    public void setMediaJson(String mediaJson) { this.mediaJson = mediaJson; }

    public java.time.Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(java.time.Instant createdAt) { this.createdAt = createdAt; }

    public java.time.Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(java.time.Instant updatedAt) { this.updatedAt = updatedAt; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
}
