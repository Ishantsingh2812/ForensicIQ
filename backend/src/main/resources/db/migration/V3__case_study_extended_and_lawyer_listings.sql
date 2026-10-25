-- V3__case_study_extended_and_lawyer_listings.sql
-- Comprehensive additions for Case Study Management and Verified Lawyer Listings

-- 1. Upgrade case_studies table with extended judicial and management columns
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS case_type VARCHAR(64) DEFAULT 'Criminal Precedent';
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS overview TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS court VARCHAR(128) DEFAULT 'Supreme Court of India';
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS decision_year INTEGER;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS citation VARCHAR(128);
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS judgment_url VARCHAR(512);
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS evidence_type VARCHAR(64) DEFAULT 'physical, documentary';
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS case_status VARCHAR(64) DEFAULT 'DECIDED';
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS background_facts TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS issues_before_court_json TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS party_arguments_json TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS court_reasoning TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS final_order TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS legal_principles_json TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS ipc_bns_comparison_json TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS related_cases_json TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS pedagogical_takeaways TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS fact_finding_distinction TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS verification_status VARCHAR(64) DEFAULT 'VERIFIED_OFFICIAL_RECORD';
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS status VARCHAR(32) DEFAULT 'PUBLISHED';
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS case_reference VARCHAR(128);
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS source_name VARCHAR(256);
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS investigation_findings TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS media_json TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS created_by VARCHAR(128);

-- Ensure JSONB columns from V1 can be read as TEXT by Hibernate JPA without conversion errors
ALTER TABLE case_studies ALTER COLUMN facts_timeline_json TYPE TEXT USING facts_timeline_json::text;
ALTER TABLE case_studies ALTER COLUMN sections_applied_json TYPE TEXT USING sections_applied_json::text;
ALTER TABLE case_studies ALTER COLUMN evidence_list_json TYPE TEXT USING evidence_list_json::text;

CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_court ON case_studies(court);
CREATE INDEX IF NOT EXISTS idx_case_studies_decision_year ON case_studies(decision_year);

-- 2. Create lawyer_listings table for judicial precedent lawyer recommendations
CREATE TABLE IF NOT EXISTS lawyer_listings (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    bar_council_enrollment VARCHAR(64),
    qualification VARCHAR(255),
    city VARCHAR(64) NOT NULL,
    district VARCHAR(64),
    state VARCHAR(64),
    practice_areas_json TEXT,
    languages_json TEXT,
    is_legal_aid BOOLEAN NOT NULL DEFAULT FALSE,
    verified_status VARCHAR(64) DEFAULT 'STATE_BAR_VERIFIED',
    contact_phone VARCHAR(32),
    contact_email VARCHAR(128),
    office_address TEXT,
    years_experience INT DEFAULT 5,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lawyers_city ON lawyer_listings(city);
CREATE INDEX IF NOT EXISTS idx_lawyers_legal_aid ON lawyer_listings(is_legal_aid);
