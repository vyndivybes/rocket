-- Learner-owned dialogue history. Must apply to staging D1 before enabling UI.
CREATE TABLE IF NOT EXISTS dialogue_turns (
 id TEXT PRIMARY KEY,
 student_id TEXT NOT NULL,
 role TEXT NOT NULL CHECK(role IN ('student','saathi')),
 text TEXT NOT NULL,
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_dialogue_owner_time ON dialogue_turns(student_id,created_at DESC,id DESC);
