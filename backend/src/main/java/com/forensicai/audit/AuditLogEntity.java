package com.forensicai.audit;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "audit_logs")
public class AuditLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_email")
    private String userEmail;

    @Column(nullable = false, length = 64)
    private String action;

    @Column(name = "case_id", length = 64)
    private String caseId;

    @Column(name = "ip_address", length = 64)
    private String ipAddress;

    @Column(nullable = false, updatable = false)
    private Instant timestamp = Instant.now();

    public AuditLogEntity() {}

    public AuditLogEntity(String userId, String userEmail, String action, String caseId, String ipAddress) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.action = action;
        this.caseId = caseId;
        this.ipAddress = ipAddress;
        this.timestamp = Instant.now();
    }

    public Long getId() { return id; }
    public String getUserId() { return userId; }
    public String getUserEmail() { return userEmail; }
    public String getAction() { return action; }
    public String getCaseId() { return caseId; }
    public String getIpAddress() { return ipAddress; }
    public Instant getTimestamp() { return timestamp; }
}
