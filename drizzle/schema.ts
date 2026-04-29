import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Trips table - stores trip metadata
 */
export const trips = mysqlTable("trips", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(), // URL-friendly identifier
  heroImage: varchar("heroImage", { length: 512 }).notNull(),
  accentColor: varchar("accentColor", { length: 16 }).notNull().default("#F59E0B"),
  dates: varchar("dates", { length: 64 }).notNull(),
  sortOrder: int("sortOrder").notNull().default(0),
  isPublished: int("isPublished").notNull().default(1), // 1 = published, 0 = draft
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Trip = typeof trips.$inferSelect;
export type InsertTrip = typeof trips.$inferInsert;

/**
 * Trip translations - bilingual content for trips
 */
export const tripTranslations = mysqlTable("trip_translations", {
  id: int("id").autoincrement().primaryKey(),
  tripId: int("tripId").notNull(),
  lang: varchar("lang", { length: 8 }).notNull(), // 'zh' or 'en'
  title: varchar("title", { length: 256 }).notNull(),
  subtitle: varchar("subtitle", { length: 512 }),
  location: varchar("location", { length: 128 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TripTranslation = typeof tripTranslations.$inferSelect;
export type InsertTripTranslation = typeof tripTranslations.$inferInsert;

/**
 * Days table - stores day-by-day itinerary
 */
export const days = mysqlTable("days", {
  id: int("id").autoincrement().primaryKey(),
  tripId: int("tripId").notNull(),
  dayNumber: int("dayNumber").notNull(),
  image: varchar("image", { length: 512 }),
  sortOrder: int("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Day = typeof days.$inferSelect;
export type InsertDay = typeof days.$inferInsert;

/**
 * Day translations - bilingual content for days
 */
export const dayTranslations = mysqlTable("day_translations", {
  id: int("id").autoincrement().primaryKey(),
  dayId: int("dayId").notNull(),
  lang: varchar("lang", { length: 8 }).notNull(), // 'zh' or 'en'
  title: varchar("title", { length: 256 }).notNull(),
  date: varchar("date", { length: 64 }),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DayTranslation = typeof dayTranslations.$inferSelect;
export type InsertDayTranslation = typeof dayTranslations.$inferInsert;

/**
 * Activities table - stores activities within each day
 */
export const activities = mysqlTable("activities", {
  id: int("id").autoincrement().primaryKey(),
  dayId: int("dayId").notNull(),
  time: varchar("time", { length: 64 }),
  sortOrder: int("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = typeof activities.$inferInsert;

/**
 * Activity translations - bilingual content for activities
 */
export const activityTranslations = mysqlTable("activity_translations", {
  id: int("id").autoincrement().primaryKey(),
  activityId: int("activityId").notNull(),
  lang: varchar("lang", { length: 8 }).notNull(), // 'zh' or 'en'
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ActivityTranslation = typeof activityTranslations.$inferSelect;
export type InsertActivityTranslation = typeof activityTranslations.$inferInsert;