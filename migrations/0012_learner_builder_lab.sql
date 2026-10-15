-- Student-only creative projects; no access to production routes or external accounts.
CREATE TABLE IF NOT EXISTS learner_builds (
 id TEXT PRIMARY KEY,
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 title TEXT NOT NULL,
 description TEXT NOT NULL,
 html TEXT NOT NULL,
 css TEXT NOT NULL,
 js TEXT NOT NULL,
 revision INTEGER NOT NULL DEFAULT 1,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS learner_builds_owner ON learner_builds(student_id,updated_at);
CREATE TABLE IF NOT EXISTS learner_build_versions (
 build_id TEXT NOT NULL REFERENCES learner_builds(id) ON DELETE CASCADE,
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 revision INTEGER NOT NULL,
 title TEXT NOT NULL,
 html TEXT NOT NULL,
 css TEXT NOT NULL,
 js TEXT NOT NULL,
 saved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(build_id,revision)
);
