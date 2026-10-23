package com.forensicai.cases;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forensicai.ai.AiClient;
import com.forensicai.ai.AiDTOs;
import com.forensicai.auth.UserEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.List;

@Service
public class CaseService {

    private final CaseRepository caseRepository;
    private final AiClient aiClient;
    private final ObjectMapper objectMapper;

    public CaseService(CaseRepository caseRepository, AiClient aiClient, ObjectMapper objectMapper) {
        this.caseRepository = caseRepository;
        this.aiClient = aiClient;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public AiDTOs.AiAnalyzeResponse analyzeAndSave(CaseDTOs.AnalyzeRequest request, UserEntity user) {
        String framework = request.framework() != null ? request.framework() : "BOTH";
        AiDTOs.AiAnalyzeResponse aiResponse = aiClient.analyzeScenario(request.scenario(), framework);

        try {
            CaseEntity entity = new CaseEntity();
            entity.setId(aiResponse.caseId());
            entity.setUserId(user != null ? user.getId() : null);
            entity.setTitle(aiResponse.title());
            entity.setFramework(framework);
            entity.setScenarioHash(hashScenario(request.scenario()));
            entity.setStatusJson(objectMapper.writeValueAsString(aiResponse.status()));
            entity.setSectionsJson(objectMapper.writeValueAsString(aiResponse.sections()));
            entity.setIngredientsJson(objectMapper.writeValueAsString(aiResponse.ingredients()));
            entity.setForensicEvidenceJson(objectMapper.writeValueAsString(aiResponse.forensicEvidence()));
            entity.setDefenseCritiqueJson(objectMapper.writeValueAsString(aiResponse.defenseCritique()));
            entity.setExtractedFactsJson(objectMapper.writeValueAsString(aiResponse.extractedFacts()));
            entity.setSourcesJson(objectMapper.writeValueAsString(aiResponse.sources()));
            entity.setDisclaimer(aiResponse.disclaimer());

            caseRepository.save(entity);
        } catch (Exception e) {
            // Log but don't fail response if persistence encounters an issue
            System.err.println("Failed to serialize or persist case entity: " + e.getMessage());
        }

        return aiResponse;
    }

    public List<CaseEntity> getUserCases(String userId) {
        return caseRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public CaseEntity getCaseById(String id) {
        return caseRepository.findById(id).orElse(null);
    }

    private String hashScenario(String text) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(text.getBytes());
            return HexFormat.of().formatHex(digest);
        } catch (Exception e) {
            return "hash-fallback";
        }
    }
}
