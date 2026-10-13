-- Isolated Saathi D1 schema. Never use a VYNDI or VAOS database.
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK(role IN ('student','parent')),
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  board TEXT NOT NULL DEFAULT 'unconfigured',
  linked_student_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(linked_student_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT 'General',
  due_date TEXT,
  done INTEGER NOT NULL DEFAULT 0 CHECK(done IN (0,1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS tasks_student_idx ON tasks(student_id,created_at);
CREATE TABLE IF NOT EXISTS ai_usage (
  student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day_utc TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(student_id,day_utc)
);
CREATE TABLE IF NOT EXISTS login_attempts (
  key_hash TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL DEFAULT 0,
  window_start INTEGER NOT NULL
);
