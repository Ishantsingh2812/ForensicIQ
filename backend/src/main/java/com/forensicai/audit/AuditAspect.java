package com.forensicai.audit;

import com.forensicai.ai.AiDTOs;
import com.forensicai.auth.UserEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class AuditAspect {

    private static final Logger log = LoggerFactory.getLogger(AuditAspect.class);

    private final AuditLogRepository auditLogRepository;

    public AuditAspect(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @AfterReturning(
            pointcut = "execution(* com.forensicai.cases.CaseService.analyzeAndSave(..)) && args(request, user)",
            returning = "result"
    )
    public void auditCaseAnalysis(JoinPoint joinPoint, Object request, UserEntity user, AiDTOs.AiAnalyzeResponse result) {
        String clientIp = getClientIp();
        String userId = user != null ? user.getId() : "GUEST";
        String userEmail = user != null ? user.getEmail() : "guest@forensicai.in";
        String caseId = result != null ? result.caseId() : "UNKNOWN";

        // IMPORTANT: NEVER store the raw scenario text in audit logs
        log.info("AUDIT: User {} [{}] executed ANALYZE_CASE. Case ID: {}. IP: {}", userId, userEmail, caseId, clientIp);

        AuditLogEntity auditEntry = new AuditLogEntity(
                userId,
                userEmail,
                "ANALYZE_CASE",
                caseId,
                clientIp
        );
        auditLogRepository.save(auditEntry);
    }

    @AfterReturning(
            pointcut = "execution(* com.forensicai.cases.CaseController.exportPdf(..)) && args(caseId, user, ..)"
    )
    public void auditPdfExport(JoinPoint joinPoint, String caseId, UserEntity user) {
        String clientIp = getClientIp();
        String userId = user != null ? user.getId() : "GUEST";
        String userEmail = user != null ? user.getEmail() : "guest@forensicai.in";

        log.info("AUDIT: User {} [{}] executed EXPORT_PDF. Case ID: {}. IP: {}", userId, userEmail, caseId, clientIp);

        AuditLogEntity auditEntry = new AuditLogEntity(
                userId,
                userEmail,
                "EXPORT_PDF",
                caseId,
                clientIp
        );
        auditLogRepository.save(auditEntry);
    }

    private String getClientIp() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attrs == null) return "127.0.0.1";
        HttpServletRequest request = attrs.getRequest();
        String xf = request.getHeader("X-Forwarded-For");
        if (xf != null && !xf.isEmpty()) {
            return xf.split(",")[0];
        }
        return request.getRemoteAddr();
    }
}
