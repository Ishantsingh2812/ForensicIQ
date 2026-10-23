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

    @Column(nullable = false, length = 64)
    private String category;

    @Column(nullable = false, length = 32)
    private String difficulty;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String summary;

    @Column(nullable = false)
    private String jurisdiction;

    @Column(name = "case_date", nullable = false)
    private LocalDate caseDate;

    @Column(name = "facts_timeline_json", columnDefinition = "TEXT")
    private String factsTimelineJson;

    @Column(name = "sections_applied_json", columnDefinition = "TEXT")
    private String sectionsAppliedJson;

    @Column(name = "evidence_list_json", columnDefinition = "TEXT")
    private String evidenceListJson;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String outcome;

    public CaseStudyEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getJurisdiction() { return jurisdiction; }
    public void setJurisdiction(String jurisdiction) { this.jurisdiction = jurisdiction; }

    public LocalDate getCaseDate() { return caseDate; }
    public void setCaseDate(LocalDate caseDate) { this.caseDate = caseDate; }

    public String getFactsTimelineJson() { return factsTimelineJson; }
    public void setFactsTimelineJson(String factsTimelineJson) { this.factsTimelineJson = factsTimelineJson; }

    public String getSectionsAppliedJson() { return sectionsAppliedJson; }
    public void setSectionsAppliedJson(String sectionsAppliedJson) { this.sectionsAppliedJson = sectionsAppliedJson; }

    public String getEvidenceListJson() { return evidenceListJson; }
    public void setEvidenceListJson(String evidenceListJson) { this.evidenceListJson = evidenceListJson; }

    public String getOutcome() { return outcome; }
    public void setOutcome(String outcome) { this.outcome = outcome; }
}
