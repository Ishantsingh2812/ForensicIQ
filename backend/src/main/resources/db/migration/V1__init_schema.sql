-- ForensicAI Initial PostgreSQL Schema Migration
-- Designed for Indian Criminal Law Analysis (IPC & BNS 2023)

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'STUDENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cases (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255),
    framework VARCHAR(16) NOT NULL DEFAULT 'BOTH',
    scenario_hash VARCHAR(64),
    status_json JSONB,
    sections_json JSONB,
    ingredients_json JSONB,
    forensic_evidence_json JSONB,
    defense_critique_json JSONB,
    extracted_facts_json JSONB,
    sources_json JSONB,
    disclaimer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS case_studies (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    difficulty VARCHAR(32) NOT NULL,
    summary TEXT NOT NULL,
    jurisdiction VARCHAR(255) NOT NULL,
    case_date DATE NOT NULL,
    facts_timeline_json JSONB,
    sections_applied_json JSONB,
    evidence_list_json JSONB,
    outcome TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- STRICT PRIVACY RULE: Never store raw scenario text in audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(64),
    user_email VARCHAR(255),
    action VARCHAR(64) NOT NULL,
    case_id VARCHAR(64),
    ip_address VARCHAR(64),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feedback (
    id BIGSERIAL PRIMARY KEY,
    case_id VARCHAR(64),
    user_id VARCHAR(64),
    rating VARCHAR(16) NOT NULL,
    category VARCHAR(64),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cases_user_id ON cases(user_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON case_studies(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);

-- Seed Default Admin & Demo Personas (BCrypt hashes for 'Password123!')
INSERT INTO users (id, email, password_hash, name, role)
VALUES 
    ('usr-admin-1', 'admin@forensicai.in', '$2a$10$wK1cZbV5/W6w/oE/Gg2RCOg7bM55V0v29.k8K3vP1XyO3V8x0XqO.', 'Chief Forensic Admin', 'ADMIN'),
    ('usr-inst-1', 'instructor@nludelhi.ac.in', '$2a$10$wK1cZbV5/W6w/oE/Gg2RCOg7bM55V0v29.k8K3vP1XyO3V8x0XqO.', 'Prof. Radhika Sen', 'INSTRUCTOR'),
    ('usr-stud-1', 'student@policeacademy.gov.in', '$2a$10$wK1cZbV5/W6w/oE/Gg2RCOg7bM55V0v29.k8K3vP1XyO3V8x0XqO.', 'Cadet Vikram Sharma', 'STUDENT')
ON CONFLICT (email) DO NOTHING;
