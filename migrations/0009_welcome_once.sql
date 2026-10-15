-- One-time introduction acknowledged by the learner. Never auto-dismiss on view.
CREATE TABLE IF NOT EXISTS student_welcome_ack (
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 version TEXT NOT NULL,
 dismissed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(student_id,version)
);
