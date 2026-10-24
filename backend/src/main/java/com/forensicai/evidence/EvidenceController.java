package com.forensicai.evidence;

import com.forensicai.auth.UserEntity;
import jakarta.validation.Valid;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/evidence")
public class EvidenceController {

    private final EvidencePhotoRepository photoRepository;
    private final EvidenceAnnotationRepository annotationRepository;
    private final EvidenceStorageService storageService;

    public EvidenceController(
            EvidencePhotoRepository photoRepository,
            EvidenceAnnotationRepository annotationRepository,
            EvidenceStorageService storageService
    ) {
        this.photoRepository = photoRepository;
        this.annotationRepository = annotationRepository;
        this.storageService = storageService;
    }

    @PostMapping(value = {"/upload", "/photos/upload"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EvidenceDTOs.PhotoResponse> uploadPhoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "caseId", required = false) String caseId,
            @AuthenticationPrincipal UserEntity user
    ) {
        EvidenceStorageService.StoredFileInfo stored = storageService.store(file);

        EvidencePhotoEntity entity = new EvidencePhotoEntity();
        entity.setId("PHOTO-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase());
        entity.setUserId(user != null ? user.getId() : null);
        entity.setCaseId(caseId);
        entity.setFileName(stored.originalName());
        entity.setFilePath(stored.storedFilename());
        entity.setContentType(stored.contentType());
        entity.setFileSize(stored.size());
        entity.setImageWidth(stored.width());
        entity.setImageHeight(stored.height());
        entity.setCreatedAt(Instant.now());

        EvidencePhotoEntity saved = photoRepository.save(entity);

        return ResponseEntity.status(HttpStatus.CREATED).body(toPhotoResponse(saved, List.of()));
    }

    @GetMapping("/photos/{photoId}/file")
    public ResponseEntity<Resource> getPhotoFile(@PathVariable String photoId) {
        EvidencePhotoEntity photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new IllegalArgumentException("Evidence photo not found: " + photoId));

        Resource resource = storageService.loadAsResource(photo.getFilePath());
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(photo.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + photo.getFileName() + "\"")
                .body(resource);
    }

    @GetMapping("/{photoId}/annotations")
    public ResponseEntity<List<EvidenceDTOs.AnnotationResponse>> getAnnotations(@PathVariable String photoId) {
        List<EvidenceAnnotationEntity> annotations = annotationRepository.findByPhotoIdOrderByMarkerLabelAsc(photoId);
        List<EvidenceDTOs.AnnotationResponse> response = annotations.stream()
                .map(this::toAnnotationResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{photoId}/annotations")
    public ResponseEntity<EvidenceDTOs.AnnotationResponse> createAnnotation(
            @PathVariable String photoId,
            @Valid @RequestBody EvidenceDTOs.CreateAnnotationRequest request
    ) {
        EvidencePhotoEntity photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new IllegalArgumentException("Photo not found: " + photoId));

        EvidenceAnnotationEntity annotation = new EvidenceAnnotationEntity();
        annotation.setId("ANN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        annotation.setPhoto(photo);
        annotation.setMarkerLabel(request.markerLabel());
        annotation.setTitle(request.title());
        annotation.setCategory(request.category());
        annotation.setCoordinateX(request.coordinateX());
        annotation.setCoordinateY(request.coordinateY());
        annotation.setNotes(request.notes());
        annotation.setVisualHypothesis(request.visualHypothesis());
        annotation.setStatutoryRelevance(request.statutoryRelevance());
        annotation.setCreatedAt(Instant.now());
        annotation.setUpdatedAt(Instant.now());

        EvidenceAnnotationEntity saved = annotationRepository.save(annotation);
        return ResponseEntity.status(HttpStatus.CREATED).body(toAnnotationResponse(saved));
    }

    @PutMapping("/annotations/{annotationId}")
    public ResponseEntity<EvidenceDTOs.AnnotationResponse> updateAnnotation(
            @PathVariable String annotationId,
            @Valid @RequestBody EvidenceDTOs.CreateAnnotationRequest request
    ) {
        EvidenceAnnotationEntity annotation = annotationRepository.findById(annotationId)
                .orElseThrow(() -> new IllegalArgumentException("Annotation not found: " + annotationId));

        annotation.setMarkerLabel(request.markerLabel());
        annotation.setTitle(request.title());
        annotation.setCategory(request.category());
        annotation.setCoordinateX(request.coordinateX());
        annotation.setCoordinateY(request.coordinateY());
        annotation.setNotes(request.notes());
        annotation.setVisualHypothesis(request.visualHypothesis());
        annotation.setStatutoryRelevance(request.statutoryRelevance());
        annotation.setUpdatedAt(Instant.now());

        EvidenceAnnotationEntity saved = annotationRepository.save(annotation);
        return ResponseEntity.ok(toAnnotationResponse(saved));
    }

    @DeleteMapping("/annotations/{annotationId}")
    public ResponseEntity<Void> deleteAnnotation(@PathVariable String annotationId) {
        if (!annotationRepository.existsById(annotationId)) {
            return ResponseEntity.notFound().build();
        }
        annotationRepository.deleteById(annotationId);
        return ResponseEntity.noContent().build();
    }

    private EvidenceDTOs.PhotoResponse toPhotoResponse(EvidencePhotoEntity p, List<EvidenceDTOs.AnnotationResponse> annotations) {
        return new EvidenceDTOs.PhotoResponse(
                p.getId(),
                p.getFileName(),
                "/api/evidence/photos/" + p.getId() + "/file",
                p.getContentType(),
                p.getFileSize(),
                p.getImageWidth(),
                p.getImageHeight(),
                p.getCreatedAt(),
                annotations
        );
    }

    private EvidenceDTOs.AnnotationResponse toAnnotationResponse(EvidenceAnnotationEntity a) {
        return new EvidenceDTOs.AnnotationResponse(
                a.getId(),
                a.getPhoto() != null ? a.getPhoto().getId() : null,
                a.getMarkerLabel(),
                a.getTitle(),
                a.getCategory(),
                a.getCoordinateX(),
                a.getCoordinateY(),
                a.getNotes(),
                a.getVisualHypothesis(),
                a.getStatutoryRelevance(),
                a.getCreatedAt(),
                a.getUpdatedAt()
        );
    }
}
