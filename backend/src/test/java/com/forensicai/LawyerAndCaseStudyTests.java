package com.forensicai;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class LawyerAndCaseStudyTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Case Studies: GET /api/case-studies returns seeded landmark cases with 16 analytical fields")
    public void testGetAllCaseStudies() throws Exception {
        mockMvc.perform(get("/api/case-studies")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(4))))
                .andExpect(jsonPath("$[0].title", notNullValue()))
                .andExpect(jsonPath("$[0].court", notNullValue()))
                .andExpect(jsonPath("$[0].citation", notNullValue()))
                .andExpect(jsonPath("$[0].judgmentUrl", startsWith("https://")))
                .andExpect(jsonPath("$[0].verificationStatus", is("VERIFIED_OFFICIAL_RECORD")));
    }

    @Test
    @DisplayName("Case Studies: Filter by category Robbery returns Phool Kumar case")
    public void testFilterCaseStudiesByCategory() throws Exception {
        mockMvc.perform(get("/api/case-studies")
                .param("category", "Robbery")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].title", containsString("Phool Kumar")));
    }

    @Test
    @DisplayName("Case Studies: Filter by court and decision year")
    public void testFilterCaseStudiesByCourtAndYear() throws Exception {
        mockMvc.perform(get("/api/case-studies")
                .param("court", "Supreme Court of India")
                .param("year", "1966")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].title", containsString("Veeda Menezes")));
    }

    @Test
    @DisplayName("Lawyers: GET /api/lawyers returns structured recommendations with dynamic accurate counters")
    public void testGetLawyersDefault() throws Exception {
        mockMvc.perform(get("/api/lawyers")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalListings", greaterThanOrEqualTo(5)))
                .andExpect(jsonPath("$.uniqueLawyers", greaterThanOrEqualTo(5)))
                .andExpect(jsonPath("$.verifiedCount", greaterThanOrEqualTo(5)))
                .andExpect(jsonPath("$.isLegalAidAvailable", is(true)))
                .andExpect(jsonPath("$.nalsaHelpline", is("15100")))
                .andExpect(jsonPath("$.nalsaPortalUrl", is("https://nalsa.gov.in/")))
                .andExpect(jsonPath("$.countExplanation", containsString("matching lawyer listings found")))
                .andExpect(jsonPath("$.listings", hasSize(greaterThanOrEqualTo(5))))
                .andExpect(jsonPath("$.listings[0].name", notNullValue()))
                .andExpect(jsonPath("$.listings[0].barCouncilEnrollment", notNullValue()))
                .andExpect(jsonPath("$.listings[0].verificationStatus", is("VERIFIED_OFFICIAL_RECORD")));
    }

    @Test
    @DisplayName("Lawyers: Filter by city Delhi and legal aid panel")
    public void testGetLawyersFilterDelhiLegalAid() throws Exception {
        mockMvc.perform(get("/api/lawyers")
                .param("city", "Delhi")
                .param("isLegalAid", "true")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.listings", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$.listings[0].city", is("Delhi")))
                .andExpect(jsonPath("$.listings[0].isLegalAid", is(true)))
                .andExpect(jsonPath("$.isLegalAidAvailable", is(true)))
                .andExpect(jsonPath("$.countExplanation", containsString("in Delhi")));
    }

    @Test
    @DisplayName("Lawyers: Filter by specific issue Assault returns matching criminal defense advocates")
    public void testGetLawyersFilterIssueAssault() throws Exception {
        mockMvc.perform(get("/api/lawyers")
                .param("legalIssue", "Assault")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.listings", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$.totalListings", greaterThanOrEqualTo(1)));
    }
}
