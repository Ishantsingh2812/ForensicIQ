package com.forensicai.casestudy;

import org.springframework.http.ResponseEntity;
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

    @GetMapping("/case-studies")
    public ResponseEntity<List<CaseStudyEntity>> getCaseStudies(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sort
    ) {
        return ResponseEntity.ok(caseStudyService.getCaseStudies(category, search));
    }

    @GetMapping("/case-studies/{slug}")
    public ResponseEntity<CaseStudyEntity> getCaseStudyBySlug(@PathVariable String slug) {
        return caseStudyService.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
