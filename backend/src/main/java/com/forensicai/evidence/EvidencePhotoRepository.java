package com.forensicai.evidence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvidencePhotoRepository extends JpaRepository<EvidencePhotoEntity, String> {
    List<EvidencePhotoEntity> findByUserId(String userId);
    List<EvidencePhotoEntity> findByCaseId(String caseId);
}
