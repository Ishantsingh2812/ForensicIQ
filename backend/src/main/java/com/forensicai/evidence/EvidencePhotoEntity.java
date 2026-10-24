package com.forensicai.evidence;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "evidence_photos")
public class EvidencePhotoEntity {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "user_id", length = 64)
    private String userId;

    @Column(name = "case_id", length = 64)
    private String caseId;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "file_path", nullable = false, length = 500)
    private String filePath;

    @Column(name = "content_type", nullable = false, length = 64)
    private String contentType;

    @Column(name = "file_size", nullable = false)
    private Long fileSize;

    @Column(name = "image_width")
    private Integer imageWidth;

    @Column(name = "image_height")
    private Integer imageHeight;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @OneToMany(mappedBy = "photo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<EvidenceAnnotationEntity> annotations = new ArrayList<>();

    public EvidencePhotoEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }

    public Integer getImageWidth() { return imageWidth; }
    public void setImageWidth(Integer imageWidth) { this.imageWidth = imageWidth; }

    public Integer getImageHeight() { return imageHeight; }
    public void setImageHeight(Integer imageHeight) { this.imageHeight = imageHeight; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public List<EvidenceAnnotationEntity> getAnnotations() { return annotations; }
    public void setAnnotations(List<EvidenceAnnotationEntity> annotations) { this.annotations = annotations; }
}
