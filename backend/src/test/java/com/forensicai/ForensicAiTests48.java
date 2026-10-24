package com.forensicai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forensicai.ai.AiClient;
import com.forensicai.ai.AiDTOs;
import com.forensicai.auth.Role;
import com.forensicai.auth.UserEntity;
import com.forensicai.auth.UserRepository;
import com.forensicai.cases.CaseDTOs;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ForensicAiTests48 {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AiClient aiClient;

    @MockBean
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        UserEntity studentUser = new UserEntity(
                "USER-STUDENT-01",
                "student@forensicai.in",
                "hashedpwd",
                "Cadet Sharma",
                Role.STUDENT
        );
        Mockito.when(userRepository.findById("USER-STUDENT-01")).thenReturn(Optional.of(studentUser));
        Mockito.when(userRepository.findByEmail("student@forensicai.in")).thenReturn(Optional.of(studentUser));
    }

    @Test
    @DisplayName("TC-37: POST /api/cases/analyze with valid payload returns HTTP 200 and JSON contract")
    @WithMockUser(username = "student@forensicai.in", roles = {"STUDENT"})
    void tc37_analyzeValidPayloadReturns200AndContract() throws Exception {
        AiDTOs.AiAnalyzeResponse mockResponse = new AiDTOs.AiAnalyzeResponse(
                "CASE-TEST-1234",
                Instant.now().toString(),
                "Snatching & Street Robbery Assessment",
                List.of(new AiDTOs.SectionDTO("BNS", "304", "Snatching", "Up to 3 years", "IPC 379/356", 0.92)),
                new AiDTOs.StatusDTO(false, true, false, "Magistrate First Class"),
                List.of(new AiDTOs.IngredientDTO("ing-1", "Sudden or quickly seizing moveable property", List.of("snatched handbag"), "yes")),
                List.of(new AiDTOs.ForensicEvidenceDTO("digital", "CCTV video footage of motorcycle escape route", "high", "Hash-verified under BSA")),
                List.of(new AiDTOs.DefenseCritiqueDTO("Identification of masked riders", "Witness line-up missing", "Conduct TIP")),
                Map.of("facts", List.of("Motorcycle snatching", "Lady victim")),
                List.of(new AiDTOs.SourceCitationDTO("bns-304", "BNS Section 304", "Whoever commits snatching...", 0.92)),
                "Educational analysis only. Not legal advice.",
                0.92,
                "MEDIUM",
                "State Jurisdiction - Judicial Magistrate First Class"
        );

        Mockito.when(aiClient.analyzeScenario(anyString(), anyString())).thenReturn(mockResponse);

        CaseDTOs.AnalyzeRequest request = new CaseDTOs.AnalyzeRequest(
                "Two men on a motorcycle snatched a handbag from a lady in the evening.",
                "BOTH"
        );

        mockMvc.perform(post("/api/cases/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.caseId", notNullValue()))
                .andExpect(jsonPath("$.sections", notNullValue()))
                .andExpect(jsonPath("$.forensicEvidence", notNullValue()))
                .andExpect(jsonPath("$.jurisdiction", notNullValue()))
                .andExpect(jsonPath("$.severityAssessment", notNullValue()))
                .andExpect(jsonPath("$.predictionConfidence", notNullValue()));
    }

    @Test
    @DisplayName("TC-38: POST /api/cases/analyze with blank scenario returns HTTP 400 Bad Request")
    @WithMockUser(username = "student@forensicai.in", roles = {"STUDENT"})
    void tc38_blankScenarioReturns400() throws Exception {
        CaseDTOs.AnalyzeRequest request = new CaseDTOs.AnalyzeRequest("", "BOTH");

        mockMvc.perform(post("/api/cases/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.scenario", anyOf(
                        containsString("Scenario description cannot be blank"),
                        containsString("Scenario must be between 5 and 5,000 characters")
                )));
    }

    @Test
    @DisplayName("TC-39: GET /api/cases without JWT token returns HTTP 401 or 403")
    void tc39_unauthenticatedAccessToCasesReturns401Or403() throws Exception {
        mockMvc.perform(get("/api/cases"))
                .andExpect(result -> {
                    int status = result.getResponse().getStatus();
                    if (status != 401 && status != 403) {
                        throw new AssertionError("Expected 401 or 403 but got " + status);
                    }
                });
    }

    @Test
    @DisplayName("TC-40: GET /api/admin/audit-logs with STUDENT role returns HTTP 403 Forbidden")
    @WithMockUser(username = "student@forensicai.in", roles = {"STUDENT"})
    void tc40_studentBlockedFromAdminAuditReturns403() throws Exception {
        mockMvc.perform(get("/api/admin/audit-logs"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("TC-41: POST /api/evidence/photos/upload with valid JPEG returns HTTP 200 or 201")
    @WithMockUser(username = "student@forensicai.in", roles = {"STUDENT"})
    void tc41_validJpegUploadReturnsSuccess() throws Exception {
        MockMultipartFile validImage = new MockMultipartFile(
                "file",
                "crime_scene_bullet.jpg",
                "image/jpeg",
                new byte[]{(byte) 0xFF, (byte) 0xD8, (byte) 0xFF, (byte) 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46}
        );

        mockMvc.perform(multipart("/api/evidence/photos/upload").file(validImage))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.fileName", is("crime_scene_bullet.jpg")));
    }

    @Test
    @DisplayName("TC-42: POST /api/evidence/photos/upload with executable returns HTTP 400 Bad Request")
    @WithMockUser(username = "student@forensicai.in", roles = {"STUDENT"})
    void tc42_invalidExecutableUploadReturns400() throws Exception {
        MockMultipartFile invalidExe = new MockMultipartFile(
                "file",
                "exploit.exe",
                "application/x-msdownload",
                "MZMALICIOUSPAYLOAD".getBytes()
        );

        mockMvc.perform(multipart("/api/evidence/photos/upload").file(invalidExe))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail", containsString("Invalid file type")));
    }
}
