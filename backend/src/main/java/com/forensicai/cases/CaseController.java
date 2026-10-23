package com.forensicai.cases;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forensicai.ai.AiDTOs;
import com.forensicai.auth.UserEntity;
import com.forensicai.report.PdfReportService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cases")
public class CaseController {

    private final CaseService caseService;
    private final PdfReportService pdfReportService;
    private final ObjectMapper objectMapper;

    public CaseController(CaseService caseService, PdfReportService pdfReportService, ObjectMapper objectMapper) {
        this.caseService = caseService;
        this.pdfReportService = pdfReportService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AiDTOs.AiAnalyzeResponse> analyzeScenario(
            @Valid @RequestBody CaseDTOs.AnalyzeRequest request,
            @AuthenticationPrincipal UserEntity user
    ) {
        AiDTOs.AiAnalyzeResponse result = caseService.analyzeAndSave(request, user);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<List<CaseEntity>> getMyCases(@AuthenticationPrincipal UserEntity user) {
        if (user == null) {
            return ResponseEntity.ok(List.of());
        }
        return ResponseEntity.ok(caseService.getUserCases(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaseEntity> getCaseById(
            @PathVariable String id,
            @AuthenticationPrincipal UserEntity user
    ) {
        CaseEntity caseEntity = caseService.getCaseById(id);
        if (caseEntity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(caseEntity);
    }

    @PostMapping("/{id}/report")
    public ResponseEntity<byte[]> exportPdf(
            @PathVariable String id,
            @AuthenticationPrincipal UserEntity user
    ) {
        CaseEntity caseEntity = caseService.getCaseById(id);
        if (caseEntity == null) {
            // Build fallback or sample if case ID not in database
            AiDTOs.AiAnalyzeResponse dummy = new AiDTOs.AiAnalyzeResponse(
                    id,
                    java.time.Instant.now().toString(),
                    "Indian Criminal Law Assessment Dossier",
                    List.of(
                            new AiDTOs.SectionDTO("BNS", "Section 309(4)", "Robbery with attempt to cause death or grievous hurt", "RI not less than 7 years", "IPC Section 397", 0.94)
                    ),
                    new AiDTOs.StatusDTO(false, true, false, "Court of Session"),
                    List.of(
                            new AiDTOs.IngredientDTO("ing-1", "Commission of robbery with deadly weapon", List.of("Reported in scenario narrative"), "yes")
                    ),
                    List.of(
                            new AiDTOs.ForensicEvidenceDTO("physical", "Spent cartridge casing", "high", "Forward to FSL Ballistics Division under Form IV")
                    ),
                    List.of(
                            new AiDTOs.DefenseCritiqueDTO("Identification Parade Reliability", "Ambient lighting conditions questionable", "Verify contemporaneous CCTV and tower dump")
                    ),
                    java.util.Map.of("facts", List.of("Scenario facts parsed")),
                    List.of(
                            new AiDTOs.SourceCitationDTO("bns-309", "BNS Section 309", "Whoever commits robbery...", 0.94)
                    ),
                    "Educational analysis only. Not legal advice. Consult a licensed advocate."
            );
            byte[] pdfBytes = pdfReportService.generateCaseReport(dummy);
            return buildPdfResponse(id, pdfBytes);
        }

        try {
            AiDTOs.AiAnalyzeResponse caseData = new AiDTOs.AiAnalyzeResponse(
                    caseEntity.getId(),
                    caseEntity.getCreatedAt().toString(),
                    caseEntity.getTitle(),
                    objectMapper.readValue(caseEntity.getSectionsJson(), objectMapper.getTypeFactory().constructCollectionType(List.class, AiDTOs.SectionDTO.class)),
                    objectMapper.readValue(caseEntity.getStatusJson(), AiDTOs.StatusDTO.class),
                    objectMapper.readValue(caseEntity.getIngredientsJson(), objectMapper.getTypeFactory().constructCollectionType(List.class, AiDTOs.IngredientDTO.class)),
                    objectMapper.readValue(caseEntity.getForensicEvidenceJson(), objectMapper.getTypeFactory().constructCollectionType(List.class, AiDTOs.ForensicEvidenceDTO.class)),
                    objectMapper.readValue(caseEntity.getDefenseCritiqueJson(), objectMapper.getTypeFactory().constructCollectionType(List.class, AiDTOs.DefenseCritiqueDTO.class)),
                    objectMapper.readValue(caseEntity.getExtractedFactsJson(), objectMapper.getTypeFactory().constructMapType(java.util.Map.class, String.class, List.class)),
                    objectMapper.readValue(caseEntity.getSourcesJson(), objectMapper.getTypeFactory().constructCollectionType(List.class, AiDTOs.SourceCitationDTO.class)),
                    caseEntity.getDisclaimer()
            );

            byte[] pdfBytes = pdfReportService.generateCaseReport(caseData);
            return buildPdfResponse(id, pdfBytes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    private ResponseEntity<byte[]> buildPdfResponse(String id, byte[] pdfBytes) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "ForensicAI-Report-" + id + ".pdf");
        headers.setContentLength(pdfBytes.length);
        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }
}
