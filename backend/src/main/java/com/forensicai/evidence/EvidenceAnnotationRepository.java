package com.forensicai.evidence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvidenceAnnotationRepository extends JpaRepository<EvidenceAnnotationEntity, String> {
    List<EvidenceAnnotationEntity> findByPhotoIdOrderByMarkerLabelAsc(String photoId);
}
