-- Environment binding fail-closed protection: seed exactly one environment on each database.
CREATE TABLE IF NOT EXISTS environment_guard (environment TEXT PRIMARY KEY CHECK (environment IN ('preview','production')));

-- Apply the following one-time data statement to the designated D1, NOT as a shared migration:
-- staging DB: INSERT OR IGNORE INTO environment_guard(environment) VALUES('preview');
-- production DB: INSERT OR IGNORE INTO environment_guard(environment) VALUES('production');
