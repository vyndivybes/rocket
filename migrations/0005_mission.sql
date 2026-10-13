-- Dedicated Saathi storage: student only. No parent/admin read APIs, no AI conversations.
CREATE TABLE IF NOT EXISTS notes (
 id TEXT PRIMARY KEY,
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 title TEXT NOT NULL CHECK(length(title)<=120),
 body TEXT NOT NULL CHECK(length(body)<=3000),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS notes_owner ON notes(student_id,updated_at);
CREATE TABLE IF NOT EXISTS schedule_items (
 id TEXT PRIMARY KEY,
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 title TEXT NOT NULL CHECK(length(title)<=100),
 kind TEXT NOT NULL CHECK(kind IN ('study','art','movement','sport','rest','aviation','other')),
 time_local TEXT NOT NULL,
 days_json TEXT NOT NULL,
 minutes INTEGER NOT NULL CHECK(minutes BETWEEN 5 AND 120),
 enabled INTEGER NOT NULL DEFAULT 1 CHECK(enabled IN (0,1)),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS schedule_owner ON schedule_items(student_id,time_local);
