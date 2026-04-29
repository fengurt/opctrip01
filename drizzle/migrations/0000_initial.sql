-- D1 Migration: Create initial schema for opctrip01
-- Run with: npx wrangler d1 migrations apply opctrip01 --local

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  openId TEXT NOT NULL UNIQUE,
  name TEXT,
  email TEXT,
  loginMethod TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user', 'admin')),
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  lastSignedIn INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS trips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  heroImage TEXT NOT NULL,
  accentColor TEXT NOT NULL DEFAULT '#F59E0B',
  dates TEXT NOT NULL,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  isPublished INTEGER NOT NULL DEFAULT 1,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS trip_translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tripId INTEGER NOT NULL,
  lang TEXT NOT NULL CHECK(lang IN ('zh', 'en')),
  title TEXT NOT NULL,
  subtitle TEXT,
  location TEXT NOT NULL,
  description TEXT,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  FOREIGN KEY (tripId) REFERENCES trips(id)
);

CREATE TABLE IF NOT EXISTS days (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tripId INTEGER NOT NULL,
  dayNumber INTEGER NOT NULL,
  image TEXT,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  FOREIGN KEY (tripId) REFERENCES trips(id)
);

CREATE TABLE IF NOT EXISTS day_translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dayId INTEGER NOT NULL,
  lang TEXT NOT NULL CHECK(lang IN ('zh', 'en')),
  title TEXT NOT NULL,
  date TEXT,
  description TEXT,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  FOREIGN KEY (dayId) REFERENCES days(id)
);

CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dayId INTEGER NOT NULL,
  time TEXT,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  FOREIGN KEY (dayId) REFERENCES days(id)
);

CREATE TABLE IF NOT EXISTS activity_translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  activityId INTEGER NOT NULL,
  lang TEXT NOT NULL CHECK(lang IN ('zh', 'en')),
  title TEXT NOT NULL,
  description TEXT,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  FOREIGN KEY (activityId) REFERENCES activities(id)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_trip_translations_trip_lang ON trip_translations(tripId, lang);
CREATE INDEX IF NOT EXISTS idx_day_translations_day_lang ON day_translations(dayId, lang);
CREATE INDEX IF NOT EXISTS idx_activity_translations_activity_lang ON activity_translations(activityId, lang);
CREATE INDEX IF NOT EXISTS idx_days_trip ON days(tripId);
CREATE INDEX IF NOT EXISTS idx_activities_day ON activities(dayId);
