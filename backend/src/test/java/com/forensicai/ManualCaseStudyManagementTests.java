package com.forensicai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forensicai.casestudy.CaseStudyDTOs;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ManualCaseStudyManagementTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("1. Public anonymous users only see PUBLISHED case studies (drafts excluded)")
    public void testPublicUserOnlySeesPublished() throws Exception {
        mockMvc.perform(get("/api/case-studies")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[*].status", everyItem(is("PUBLISHED"))));
    }

    @Test
    @DisplayName("2. Anonymous unauthenticated user cannot create case study (returns 401 or 403)")
    public void testAnonymousCannotCreateCaseStudy() throws Exception {
        CaseStudyDTOs.CreateCaseStudyRequest req = new CaseStudyDTOs.CreateCaseStudyRequest(
                "Unauthorized Test Case",
                "Robbery",
                "This should be blocked due to lack of authentication token."
        );

        mockMvc.perform(post("/api/case-studies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("3. Student role is blocked from creating case studies (returns 403 Forbidden)")
    @WithMockUser(username = "student@forensicai.in", roles = {"STUDENT"})
    public void testStudentBlockedFromCreatingCaseStudy() throws Exception {
        CaseStudyDTOs.CreateCaseStudyRequest req = new CaseStudyDTOs.CreateCaseStudyRequest(
                "Student Forbidden Case",
                "Assault & Bodily Harm",
                "Student user trying to publish or author case study."
        );

        mockMvc.perform(post("/api/case-studies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("4. Instructor / Admin creates Draft case study, updates it, publishes it, and deletes it")
    @WithMockUser(username = "instructor@forensicai.in", roles = {"INSTRUCTOR"})
    public void testCompleteCaseStudyLifecycle() throws Exception {
        // Step A: Create as Draft
        CaseStudyDTOs.CreateCaseStudyRequest createReq = new CaseStudyDTOs.CreateCaseStudyRequest(
                "State of Maharashtra v. Automated Test Suspect",
                "Robbery",
                "Detailed summary of an armed highway interception testing lifecycle management.",
                "Intermediate",
                "Criminal Appeal",
                "Bombay High Court",
                "Bombay High Court",
                LocalDate.of(2023, 11, 15),
                "2023-11-15",
                2023,
                "(2023) 4 BomCR 891",
                "https://judgments.ecourts.gov.in/pdfsearch/index.php",
                "Bombay High Court Registry",
                "CRL.A. 412/2023",
                "physical, digital",
                "DECIDED",
                "DRAFT", // saved as DRAFT
                "Detailed factual background of vehicular robbery.",
                "Suspects brandished country-made firearms and seized gold bullion from transport van.",
                "Ballistic matching of recovered cartridges to firearm seized from accused.",
                "Court held that recovery under Section 27 Evidence Act complied with statutory standards.",
                "Conviction upheld under Section 397 IPC / Section 311 BNS.",
                "Sentence of 7 years rigorous imprisonment affirmed.",
                "Evidentiary integrity of seal impressions is crucial.",
                "Distinguished from simple theft where no deadly weapon was shown or produced.",
                "VERIFIED_OFFICIAL_RECORD",
                List.of(Map.of("time", "Day 1, 02:00 AM", "event", "Highway vehicle stopped")),
                List.of("Whether Section 397 IPC applies when weapon is brandished without firing"),
                List.of(Map.of("act", "BNS", "section", "Section 311", "title", "Robbery with attempt to cause death or grievous hurt")),
                List.of(Map.of("item", "Country pistol", "category", "physical", "probativeValue", "Weapon of offense")),
                List.of(Map.of("party", "Defense", "argument", "No gunshot residue recovered from accused's hands")),
                List.of("Brandishing a weapon constitutes use under Section 397"),
                List.of(Map.of("ipc", "Section 397", "bns", "Section 311", "difference", "Minimum 7 years imprisonment")),
                List.of("Phool Kumar v. Delhi Administration"),
                null
        );

        MvcResult createResult = mockMvc.perform(post("/api/case-studies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.slug", notNullValue()))
                .andExpect(jsonPath("$.title", is("State of Maharashtra v. Automated Test Suspect")))
                .andExpect(jsonPath("$.status", is("DRAFT")))
                .andExpect(jsonPath("$.citation", is("(2023) 4 BomCR 891")))
                .andExpect(jsonPath("$.judgmentUrl", startsWith("https://")))
                .andReturn();

        String responseBody = createResult.getResponse().getContentAsString();
        CaseStudyDTOs.CaseStudyResponse createdCase = objectMapper.readValue(responseBody, CaseStudyDTOs.CaseStudyResponse.class);
        String caseId = createdCase.id();

        // Step B: Verify Draft is accessible to instructor
        mockMvc.perform(get("/api/case-studies/" + caseId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(caseId)))
                .andExpect(jsonPath("$.status", is("DRAFT")));

        // Step C: Update fields
        CaseStudyDTOs.UpdateCaseStudyRequest updateReq = new CaseStudyDTOs.UpdateCaseStudyRequest(
                "State of Maharashtra v. Automated Test Suspect (Updated Title)",
                "Robbery",
                "Updated summary description with extended legal analysis."
        );

        mockMvc.perform(put("/api/case-studies/" + caseId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", containsString("(Updated Title)")));

        // Step D: Publish the case study
        CaseStudyDTOs.StatusUpdateRequest publishReq = new CaseStudyDTOs.StatusUpdateRequest("PUBLISHED");
        mockMvc.perform(patch("/api/case-studies/" + caseId + "/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(publishReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("PUBLISHED")));

        // Step E: Unpublish back to Draft
        CaseStudyDTOs.StatusUpdateRequest unpublishReq = new CaseStudyDTOs.StatusUpdateRequest("DRAFT");
        mockMvc.perform(patch("/api/case-studies/" + caseId + "/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(unpublishReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("DRAFT")));

        // Step F: Delete the case study
        mockMvc.perform(delete("/api/case-studies/" + caseId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)));

        // Step G: Verify it is gone
        mockMvc.perform(get("/api/case-studies/" + caseId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("5. Server validates required fields and rejects blank title with 400 Bad Request")
    @WithMockUser(username = "admin@forensicai.in", roles = {"ADMIN"})
    public void testValidationRejectionForBlankTitle() throws Exception {
        CaseStudyDTOs.CreateCaseStudyRequest req = new CaseStudyDTOs.CreateCaseStudyRequest(
                "", // Blank title!
                "Robbery",
                "Summary with sufficient length for test."
        );

        mockMvc.perform(post("/api/case-studies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("6. Server validates judgment URL and rejects non-http/https protocol")
    @WithMockUser(username = "admin@forensicai.in", roles = {"ADMIN"})
    public void testValidationRejectionForInvalidUrl() throws Exception {
        CaseStudyDTOs.CreateCaseStudyRequest req = new CaseStudyDTOs.CreateCaseStudyRequest(
                "Valid Title",
                "Robbery",
                "Summary with sufficient length for test.",
                "ftp://malicious-file-download.com/test" // Invalid protocol!
        );

        mockMvc.perform(post("/api/case-studies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("7. Pagination endpoint GET /api/case-studies/page returns structured metadata")
    public void testPaginationEndpoint() throws Exception {
        mockMvc.perform(get("/api/case-studies/page")
                .param("page", "0")
                .param("size", "2")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items", hasSize(lessThanOrEqualTo(2))))
                .andExpect(jsonPath("$.totalItems", greaterThanOrEqualTo(1)))
                .andExpect(jsonPath("$.page", is(0)))
                .andExpect(jsonPath("$.pageSize", is(2)))
                .andExpect(jsonPath("$.totalPages", greaterThanOrEqualTo(1)));
    }
}
