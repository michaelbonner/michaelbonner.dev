-- Suggestions submitted from the "Suggest a restaurant" dialog on /restaurants.
--
-- Every submission is stored, whether or not the Telegram notification goes
-- out, so a dropped notification never loses a suggestion. Only the restaurant
-- name and the note are required; the rest is whatever the visitor chose to
-- share.
CREATE TABLE IF NOT EXISTS restaurant_suggestions (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	restaurant_name TEXT NOT NULL,
	location TEXT,
	tags TEXT,
	notes TEXT NOT NULL,
	submitted_by TEXT,
	submitted_by_email TEXT,
	created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- The only read this table gets is "what came in lately", newest first.
CREATE INDEX IF NOT EXISTS restaurant_suggestions_created_at
	ON restaurant_suggestions (created_at DESC);
