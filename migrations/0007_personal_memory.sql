-- Learner-owned, actively saved memories. No conversation logging, no parent/admin access.
CREATE TABLE IF NOT EXISTS personal_memories(
 id TEXT PRIMARY KEY,
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 category TEXT NOT NULL CHECK(category IN ('goal','learning','preference','interest')),
 text TEXT NOT NULL CHECK(length(text) BETWEEN 10 AND 240),
 use_in_chat INTEGER NOT NULL DEFAULT 0 CHECK(use_in_chat IN (0,1)),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS personal_memories_owner ON personal_memories(student_id, updated_at);
