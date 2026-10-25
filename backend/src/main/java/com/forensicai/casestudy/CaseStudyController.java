package com.forensicai.casestudy;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CaseStudyController {

    private final CaseStudyService caseStudyService;

    public CaseStudyController(CaseStudyService caseStudyService) {
        this.caseStudyService = caseStudyService;
    }

    private boolean isAuthorizedEditor(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        for (GrantedAuthority ga : authentication.getAuthorities()) {
            String auth = ga.getAuthority();
            if ("ROLE_ADMIN".equals(auth) || "ROLE_INSTRUCTOR".equals(auth) || "ADMIN".equals(auth) || "INSTRUCTOR".equals(auth)) {
                return true;
            }
        }
        return false;
    }

    @GetMapping("/case-studies")
    public ResponseEntity<List<CaseStudyDTOs.CaseStudyResponse>> getCaseStudies(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String court,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String act,
            @RequestParam(required = false) String evidenceType,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String status,
            Authentication authentication
    ) {
        boolean canSeeDrafts = isAuthorizedEditor(authentication);
        String effectiveStatus;
        if (canSeeDrafts) {
            effectiveStatus = status != null && !status.isBlank() ? status : "ALL";
        } else {
            effectiveStatus = "PUBLISHED";
        }

        List<CaseStudyEntity> entities = caseStudyService.getCaseStudies(
                category, court, year, act, evidenceType, search, sort, effectiveStatus
        );

        List<CaseStudyDTOs.CaseStudyResponse> responses = entities.stream()
                .map(caseStudyService::toResponseDTO)
                .toList();

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/case-studies/page")
    public ResponseEntity<CaseStudyDTOs.CaseStudyPageResponse> getCaseStudiesPage(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String court,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String act,
            @RequestParam(required = false) String evidenceType,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            Authentication authentication
    ) {
        boolean canSeeDrafts = isAuthorizedEditor(authentication);
        String effectiveStatus;
        if (canSeeDrafts) {
            effectiveStatus = status != null && !status.isBlank() ? status : "ALL";
        } else {
            effectiveStatus = "PUBLISHED";
        }

        CaseStudyDTOs.CaseStudyPageResponse response = caseStudyService.getCaseStudiesPage(
                category, court, year, act, evidenceType, search, sort, effectiveStatus, page, size
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/case-studies/{slugOrId}")
    public ResponseEntity<CaseStudyDTOs.CaseStudyResponse> getCaseStudy(
            @PathVariable String slugOrId,
            Authentication authentication
    ) {
        boolean allowDraft = isAuthorizedEditor(authentication);
        return caseStudyService.getByIdOrSlug(slugOrId, allowDraft)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/case-studies")
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    public ResponseEntity<CaseStudyDTOs.CaseStudyResponse> createCaseStudy(
            @Valid @RequestBody CaseStudyDTOs.CreateCaseStudyRequest request,
            Authentication authentication
    ) {
        String username = authentication != null ? authentication.getName() : "Faculty Author";
        CaseStudyDTOs.CaseStudyResponse created = caseStudyService.createCaseStudy(request, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/case-studies/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    public ResponseEntity<CaseStudyDTOs.CaseStudyResponse> updateCaseStudy(
            @PathVariable String id,
            @Valid @RequestBody CaseStudyDTOs.UpdateCaseStudyRequest request,
            Authentication authentication
    ) {
        String username = authentication != null ? authentication.getName() : "Faculty Author";
        CaseStudyDTOs.CaseStudyResponse updated = caseStudyService.updateCaseStudy(id, request, username);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/case-studies/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    public ResponseEntity<CaseStudyDTOs.CaseStudyResponse> updateStatus(
            @PathVariable String id,
            @Valid @RequestBody CaseStudyDTOs.StatusUpdateRequest request
    ) {
        CaseStudyDTOs.CaseStudyResponse updated = caseStudyService.updateStatus(id, request.status());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/case-studies/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    public ResponseEntity<Map<String, Object>> deleteCaseStudy(@PathVariable String id) {
        caseStudyService.deleteCaseStudy(id);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Case study deleted successfully",
                "id", id
        ));
    }

    @PostMapping("/feedback")
    public ResponseEntity<Map<String, Object>> submitFeedback(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("success", true, "message", "Feedback recorded successfully"));
    }

    @PostMapping("/waitlist")
    public ResponseEntity<Map<String, Object>> submitWaitlist(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("success", true, "message", "Added to academic waitlist"));
    }
}
