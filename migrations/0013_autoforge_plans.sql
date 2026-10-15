-- Learner-authored AI skill plans. Plans are inert metadata; no generated executable plugins.
CREATE TABLE IF NOT EXISTS learner_autoforge_plans (
 skill_id TEXT PRIMARY KEY REFERENCES learner_skills(id) ON DELETE CASCADE,
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 triggers_json TEXT NOT NULL,
 steps_json TEXT NOT NULL,
 sample TEXT NOT NULL,
 preflight_checks INTEGER NOT NULL CHECK(preflight_checks >= 5),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS learner_autoforge_owner ON learner_autoforge_plans(student_id,created_at);
