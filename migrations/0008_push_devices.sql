-- Opt-in device push subscriptions; no conversation text, no remote address or school details.
CREATE TABLE IF NOT EXISTS push_devices (
 id TEXT PRIMARY KEY,
 student_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 endpoint TEXT NOT NULL,
 p256dh TEXT NOT NULL,
 auth TEXT NOT NULL,
 timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
 quiet_from INTEGER NOT NULL DEFAULT 22,
 quiet_to INTEGER NOT NULL DEFAULT 7,
 enabled INTEGER NOT NULL DEFAULT 1 CHECK(enabled IN (0,1)),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(student_id,endpoint)
);
CREATE INDEX IF NOT EXISTS push_devices_owner ON push_devices(student_id);
CREATE TABLE IF NOT EXISTS push_deliveries (
 id TEXT PRIMARY KEY,
 device_id TEXT NOT NULL REFERENCES push_devices(id) ON DELETE CASCADE,
 schedule_id TEXT NOT NULL REFERENCES schedule_items(id) ON DELETE CASCADE,
 local_date TEXT NOT NULL,
 reserved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 state TEXT NOT NULL DEFAULT 'RESERVED',
 UNIQUE(device_id,schedule_id,local_date)
);
