-- Student academic preferences: no name, school, date of birth, contact or chat transcript.
CREATE TABLE IF NOT EXISTS study_profiles (
 student_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 stream TEXT NOT NULL CHECK (stream IN ('Science','Commerce','Humanities','Mixed')),
 subjects_json TEXT NOT NULL,
 daily_minutes INTEGER NOT NULL CHECK (daily_minutes IN (20,30,45,60)),
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- Answer choice is graded in-memory and never persisted. Keep only aggregate results.
CREATE TABLE IF NOT EXISTS practice_progress (
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 lesson_id TEXT NOT NULL,
 attempts INTEGER NOT NULL DEFAULT 0,
 correct INTEGER NOT NULL DEFAULT 0,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(student_id,lesson_id)
);
CREATE INDEX IF NOT EXISTS practice_by_student ON practice_progress(student_id);
