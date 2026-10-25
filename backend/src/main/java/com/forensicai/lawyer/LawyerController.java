package com.forensicai.lawyer;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lawyers")
public class LawyerController {

    private final LawyerService lawyerService;

    public LawyerController(LawyerService lawyerService) {
        this.lawyerService = lawyerService;
    }

    @GetMapping
    public ResponseEntity<LawyerDTOs.LawyerSearchResponse> searchLawyers(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String legalIssue,
            @RequestParam(required = false) Boolean isLegalAid,
            @RequestParam(required = false) String language
    ) {
        LawyerDTOs.LawyerSearchResponse response = lawyerService.searchLawyers(
                city, legalIssue, isLegalAid, language
        );
        return ResponseEntity.ok(response);
    }
}
