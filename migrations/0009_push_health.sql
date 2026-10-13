-- Operational evidence of autonomous scheduled dispatch, no learner data.
CREATE TABLE IF NOT EXISTS push_dispatch_health (
 singleton INTEGER PRIMARY KEY CHECK(singleton=1),
 last_run_at TEXT,
 source_rows INTEGER NOT NULL DEFAULT 0,
 attempted INTEGER NOT NULL DEFAULT 0,
 accepted INTEGER NOT NULL DEFAULT 0,
 failed INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO push_dispatch_health(singleton) VALUES(1);
