package com.forensicai.evidence;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "evidence_annotations")
public class EvidenceAnnotationEntity {

    @Id
    @Column(length = 64)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "photo_id", nullable = false)
    @JsonIgnore
    private EvidencePhotoEntity photo;

    @Column(name = "marker_label", nullable = false, length = 32)
    private String markerLabel;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 64)
    private String category;

    @Column(name = "coordinate_x", nullable = false)
    private Double coordinateX;

    @Column(name = "coordinate_y", nullable = false)
    private Double coordinateY;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "visual_hypothesis", columnDefinition = "TEXT")
    private String visualHypothesis;

    @Column(name = "statutory_relevance")
    private String statutoryRelevance;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    public EvidenceAnnotationEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public EvidencePhotoEntity getPhoto() { return photo; }
    public void setPhoto(EvidencePhotoEntity photo) { this.photo = photo; }

    public String getMarkerLabel() { return markerLabel; }
    public void setMarkerLabel(String markerLabel) { this.markerLabel = markerLabel; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getCoordinateX() { return coordinateX; }
    public void setCoordinateX(Double coordinateX) { this.coordinateX = coordinateX; }

    public Double getCoordinateY() { return coordinateY; }
    public void setCoordinateY(Double coordinateY) { this.coordinateY = coordinateY; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getVisualHypothesis() { return visualHypothesis; }
    public void setVisualHypothesis(String visualHypothesis) { this.visualHypothesis = visualHypothesis; }

    public String getStatutoryRelevance() { return statutoryRelevance; }
    public void setStatutoryRelevance(String statutoryRelevance) { this.statutoryRelevance = statutoryRelevance; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
