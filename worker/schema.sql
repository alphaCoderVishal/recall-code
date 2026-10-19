CREATE TABLE IF NOT EXISTS reminders (
 id TEXT PRIMARY KEY,
 endpoint_hash TEXT UNIQUE NOT NULL,
 subscription TEXT NOT NULL,
 time TEXT NOT NULL,
 zone TEXT NOT NULL,
 next_at INTEGER NOT NULL,
 updated_at INTEGER NOT NULL,
 test_at INTEGER NOT NULL DEFAULT 0,
 failures INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS reminders_due ON reminders(next_at);
