CREATE TABLE IF NOT EXISTS one_time_reminders(id TEXT PRIMARY KEY,student_id TEXT NOT NULL,title TEXT NOT NULL,date_local TEXT NOT NULL,time_local TEXT NOT NULL,done INTEGER NOT NULL DEFAULT 0);
CREATE INDEX IF NOT EXISTS idx_one_time_reminders_owner ON one_time_reminders(student_id,date_local,time_local);
