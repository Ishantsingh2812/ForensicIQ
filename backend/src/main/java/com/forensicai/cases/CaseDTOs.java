package com.forensicai.cases;

import com.forensicai.ai.AiDTOs;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CaseDTOs {

    public record AnalyzeRequest(
        @NotBlank(message = "Scenario description cannot be blank")
        @Size(min = 5, max = 5000, message = "Scenario must be between 5 and 5,000 characters")
        String scenario,

        String framework
    ) {}

    public record AnalysisResponse(
        AiDTOs.AiAnalyzeResponse result
    ) {}
}
