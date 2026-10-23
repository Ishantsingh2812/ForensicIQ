package com.forensicai.cases;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "cases")
public class CaseEntity {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "user_id", length = 64)
    private String userId;

    private String title;

    @Column(length = 16, nullable = false)
    private String framework;

    @Column(name = "scenario_hash", length = 64)
    private String scenarioHash;

    @Column(name = "status_json", columnDefinition = "TEXT")
    private String statusJson;

    @Column(name = "sections_json", columnDefinition = "TEXT")
    private String sectionsJson;

    @Column(name = "ingredients_json", columnDefinition = "TEXT")
    private String ingredientsJson;

    @Column(name = "forensic_evidence_json", columnDefinition = "TEXT")
    private String forensicEvidenceJson;

    @Column(name = "defense_critique_json", columnDefinition = "TEXT")
    private String defenseCritiqueJson;

    @Column(name = "extracted_facts_json", columnDefinition = "TEXT")
    private String extractedFactsJson;

    @Column(name = "sources_json", columnDefinition = "TEXT")
    private String sourcesJson;

    @Column(columnDefinition = "TEXT")
    private String disclaimer;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();

    public CaseEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getFramework() { return framework; }
    public void setFramework(String framework) { this.framework = framework; }

    public String getScenarioHash() { return scenarioHash; }
    public void setScenarioHash(String scenarioHash) { this.scenarioHash = scenarioHash; }

    public String getStatusJson() { return statusJson; }
    public void setStatusJson(String statusJson) { this.statusJson = statusJson; }

    public String getSectionsJson() { return sectionsJson; }
    public void setSectionsJson(String sectionsJson) { this.sectionsJson = sectionsJson; }

    public String getIngredientsJson() { return ingredientsJson; }
    public void setIngredientsJson(String ingredientsJson) { this.ingredientsJson = ingredientsJson; }

    public String getForensicEvidenceJson() { return forensicEvidenceJson; }
    public void setForensicEvidenceJson(String forensicEvidenceJson) { this.forensicEvidenceJson = forensicEvidenceJson; }

    public String getDefenseCritiqueJson() { return defenseCritiqueJson; }
    public void setDefenseCritiqueJson(String defenseCritiqueJson) { this.defenseCritiqueJson = defenseCritiqueJson; }

    public String getExtractedFactsJson() { return extractedFactsJson; }
    public void setExtractedFactsJson(String extractedFactsJson) { this.extractedFactsJson = extractedFactsJson; }

    public String getSourcesJson() { return sourcesJson; }
    public void setSourcesJson(String sourcesJson) { this.sourcesJson = sourcesJson; }

    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
