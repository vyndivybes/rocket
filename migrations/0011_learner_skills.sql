-- Learner-owned reusable text-only skill blueprints. No generated executable code.
CREATE TABLE IF NOT EXISTS learner_skills(
 id TEXT PRIMARY KEY,
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 name TEXT NOT NULL,
 purpose TEXT NOT NULL,
 mode TEXT NOT NULL CHECK(mode IN ('teacher','companion','planner','pilot','artist')),
 blueprint TEXT NOT NULL CHECK(blueprint IN ('quiz','coach','creative','project','explain')),
 status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','active')),
 revision INTEGER NOT NULL DEFAULT 1,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS learner_skills_owner_name ON learner_skills(student_id,name COLLATE NOCASE);
CREATE INDEX IF NOT EXISTS learner_skills_owner_updated ON learner_skills(student_id,updated_at);
