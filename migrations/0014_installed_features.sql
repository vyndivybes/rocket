-- Installing a learner-written mini app enables a bounded sandboxed extension
-- in that learner's Saathi UI. Generated source is never executed in the app origin.
CREATE TABLE IF NOT EXISTS learner_installed_features(
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 build_id TEXT NOT NULL REFERENCES learner_builds(id) ON DELETE CASCADE,
 installed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(student_id,build_id)
);
CREATE INDEX IF NOT EXISTS learner_installed_features_recent ON learner_installed_features(student_id,installed_at);
