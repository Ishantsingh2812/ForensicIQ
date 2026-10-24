package com.forensicai.evidence;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

public class EvidenceDTOs {

    public record PhotoResponse(
        String id,
        String fileName,
        String fileUrl,
        String contentType,
        Long fileSize,
        Integer width,
        Integer height,
        Instant createdAt,
        List<AnnotationResponse> annotations
    ) {}

    public record CreateAnnotationRequest(
        @NotBlank(message = "Marker label is required (e.g. E1)")
        String markerLabel,

        @NotBlank(message = "Title is required")
        String title,

        @NotBlank(message = "Category is required")
        String category,

        @NotNull(message = "Coordinate X is required")
        @DecimalMin(value = "0.0", message = "Coordinate X must be between 0.0 and 1.0")
        @DecimalMax(value = "1.0", message = "Coordinate X must be between 0.0 and 1.0")
        Double coordinateX,

        @NotNull(message = "Coordinate Y is required")
        @DecimalMin(value = "0.0", message = "Coordinate Y must be between 0.0 and 1.0")
        @DecimalMax(value = "1.0", message = "Coordinate Y must be between 0.0 and 1.0")
        Double coordinateY,

        String notes,
        String visualHypothesis,
        String statutoryRelevance
    ) {}

    public record AnnotationResponse(
        String id,
        String photoId,
        String markerLabel,
        String title,
        String category,
        Double coordinateX,
        Double coordinateY,
        String notes,
        String visualHypothesis,
        String statutoryRelevance,
        Instant createdAt,
        Instant updatedAt
    ) {}
}
