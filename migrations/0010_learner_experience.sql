-- Additive, learner-owned experience preferences and non-executing requests.
-- Never auto-migrate student chat histories, credentials or guardian records.
CREATE TABLE IF NOT EXISTS learner_experience (
 student_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 preferences_json TEXT NOT NULL,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS learner_upgrade_requests (
 id TEXT PRIMARY KEY,
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 idea TEXT NOT NULL CHECK(length(idea) BETWEEN 12 AND 300),
 status TEXT NOT NULL DEFAULT 'PROPOSED' CHECK(status IN ('PROPOSED')),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS upgrade_requests_by_learner ON learner_upgrade_requests(student_id,created_at);
