package com.forensicai.cases;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/legal")
public class LegalCompareController {

    private static final List<Map<String, Object>> COMPARATIVE_RECORDS = List.of(
        Map.of(
            "ipcSection", "Section 302",
            "ipcTitle", "Punishment for Murder",
            "bnsSection", "Section 103",
            "bnsTitle", "Punishment for Murder",
            "natureOfChange", "Substantive Retained; Section 103(2) explicitly adds death/life imprisonment for mob lynching / hate murders by 5 or more persons.",
            "statutoryStatus", "CURRENT",
            "ipcText", "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.",
            "bnsText", "(1) Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine. (2) Mob lynching group murder punished with death or life imprisonment.",
            "sourceUrl", "https://www.indiacode.nic.in/handle/123456789/20062",
            "effectiveDate", "2024-07-01"
        ),
        Map.of(
            "ipcSection", "Section 379",
            "ipcTitle", "Punishment for Theft",
            "bnsSection", "Section 303(2) & Section 304",
            "bnsTitle", "Punishment for Theft & Snatching",
            "natureOfChange", "Disaggregated: BNS 303(2) introduces community service for first-time petty theft (< ₹5,000), while BNS 304 creates a standalone offense for Snatching.",
            "statutoryStatus", "CURRENT",
            "ipcText", "Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.",
            "bnsText", "BNS 303(2): 3 years or fine or community service (< ₹5,000). BNS 304: Snatching carries up to 3 years imprisonment + fine.",
            "sourceUrl", "https://www.indiacode.nic.in/handle/123456789/20062",
            "effectiveDate", "2024-07-01"
        ),
        Map.of(
            "ipcSection", "Section 397",
            "ipcTitle", "Robbery or Dacoity with Attempt to Cause Death or Grievous Hurt",
            "bnsSection", "Section 311",
            "bnsTitle", "Robbery or Dacoity with Attempt to Cause Death or Grievous Hurt",
            "natureOfChange", "Substantive retained: 7-year mandatory minimum sentence when weapon used or grievous hurt caused. Guided by Phool Kumar doctrine (AIR 1975 SC 905).",
            "statutoryStatus", "CURRENT",
            "ipcText", "If at the time of committing robbery or dacoity, offender uses any deadly weapon, imprisonment shall not be less than seven years.",
            "bnsText", "If at the time of committing robbery or dacoity, offender uses any deadly weapon or causes grievous hurt, imprisonment shall not be less than seven years.",
            "sourceUrl", "https://www.indiacode.nic.in/handle/123456789/20062",
            "effectiveDate", "2024-07-01"
        ),
        Map.of(
            "ipcSection", "Section 323",
            "ipcTitle", "Punishment for Voluntarily Causing Hurt",
            "bnsSection", "Section 115(2)",
            "bnsTitle", "Punishment for Voluntarily Causing Hurt",
            "natureOfChange", "Fine ceiling increased to ₹10,000 and Court empowered to award community service in lieu of imprisonment.",
            "statutoryStatus", "CURRENT",
            "ipcText", "Imprisonment up to one year, or fine up to one thousand rupees, or both.",
            "bnsText", "Imprisonment up to one year, or fine up to ten thousand rupees, or both, or with community service.",
            "sourceUrl", "https://www.indiacode.nic.in/handle/123456789/20062",
            "effectiveDate", "2024-07-01"
        ),
        Map.of(
            "ipcSection", "Section 420",
            "ipcTitle", "Cheating and Dishonestly Inducing Delivery of Property",
            "bnsSection", "Section 318(4)",
            "bnsTitle", "Cheating and Dishonestly Inducing Delivery of Property",
            "natureOfChange", "Re-indexed from Section 420 to Section 318(4). Retains 7-year imprisonment and fine.",
            "statutoryStatus", "CURRENT",
            "ipcText", "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property shall be punished with imprisonment up to seven years and fine.",
            "bnsText", "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property shall be punished with imprisonment up to seven years and fine.",
            "sourceUrl", "https://www.indiacode.nic.in/handle/123456789/20062",
            "effectiveDate", "2024-07-01"
        )
    );

    @GetMapping("/compare")
    public ResponseEntity<Map<String, Object>> compare(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String section
    ) {
        String filter = (section != null ? section : (query != null ? query : "")).toLowerCase();
        List<Map<String, Object>> filtered = COMPARATIVE_RECORDS.stream()
                .filter(r -> filter.isEmpty() ||
                        ((String) r.get("ipcSection")).toLowerCase().contains(filter) ||
                        ((String) r.get("bnsSection")).toLowerCase().contains(filter) ||
                        ((String) r.get("bnsTitle")).toLowerCase().contains(filter) ||
                        ((String) r.get("natureOfChange")).toLowerCase().contains(filter))
                .toList();

        return ResponseEntity.ok(Map.of(
                "total", filtered.size(),
                "comparisons", filtered
        ));
    }
}
