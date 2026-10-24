-- V2__photo_evidence_annotations.sql
-- Crime Scene Photo Evidence & Normalized Coordinate Annotations

CREATE TABLE IF NOT EXISTS evidence_photos (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    case_id VARCHAR(64) REFERENCES cases(id) ON DELETE SET NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    content_type VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    image_width INT DEFAULT 0,
    image_height INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evidence_annotations (
    id VARCHAR(64) PRIMARY KEY,
    photo_id VARCHAR(64) NOT NULL REFERENCES evidence_photos(id) ON DELETE CASCADE,
    marker_label VARCHAR(32) NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    coordinate_x DOUBLE PRECISION NOT NULL,
    coordinate_y DOUBLE PRECISION NOT NULL,
    notes TEXT,
    visual_hypothesis TEXT,
    statutory_relevance VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_evidence_annotations_photo_id ON evidence_annotations(photo_id);
