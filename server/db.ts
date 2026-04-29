import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  trips, tripTranslations, InsertTrip, InsertTripTranslation,
  days, dayTranslations, InsertDay, InsertDayTranslation,
  activities, activityTranslations, InsertActivity, InsertActivityTranslation
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== TRIPS ====================

export async function getAllTrips(lang: string = 'zh') {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select({
      id: trips.id,
      slug: trips.slug,
      heroImage: trips.heroImage,
      accentColor: trips.accentColor,
      dates: trips.dates,
      sortOrder: trips.sortOrder,
      isPublished: trips.isPublished,
      title: tripTranslations.title,
      subtitle: tripTranslations.subtitle,
      location: tripTranslations.location,
      description: tripTranslations.description,
    })
    .from(trips)
    .leftJoin(tripTranslations, eq(trips.id, tripTranslations.tripId))
    .where(eq(tripTranslations.lang, lang))
    .orderBy(trips.sortOrder);
  
  return result;
}

export async function getTripBySlug(slug: string, lang: string = 'zh') {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select({
      id: trips.id,
      slug: trips.slug,
      heroImage: trips.heroImage,
      accentColor: trips.accentColor,
      dates: trips.dates,
      sortOrder: trips.sortOrder,
      isPublished: trips.isPublished,
      title: tripTranslations.title,
      subtitle: tripTranslations.subtitle,
      location: tripTranslations.location,
      description: tripTranslations.description,
    })
    .from(trips)
    .leftJoin(tripTranslations, eq(trips.id, tripTranslations.tripId))
    .where(and(eq(trips.slug, slug), eq(tripTranslations.lang, lang)))
    .limit(1);
  
  return result[0] || null;
}

export async function createTrip(trip: InsertTrip, translations: { zh: Omit<InsertTripTranslation, 'tripId'>; en: Omit<InsertTripTranslation, 'tripId'> }) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const [inserted] = await db.insert(trips).values(trip).$returningId();
  const tripId = inserted.id;
  
  await db.insert(tripTranslations).values([
    { ...translations.zh, tripId, lang: 'zh' },
    { ...translations.en, tripId, lang: 'en' },
  ]);
  
  return tripId;
}

export async function updateTripTranslation(tripId: number, lang: string, data: Partial<InsertTripTranslation>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  await db
    .update(tripTranslations)
    .set(data)
    .where(and(eq(tripTranslations.tripId, tripId), eq(tripTranslations.lang, lang)));
}

export async function updateTrip(tripId: number, data: Partial<InsertTrip>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  await db.update(trips).set(data).where(eq(trips.id, tripId));
}

// ==================== DAYS ====================

export async function getDaysByTripId(tripId: number, lang: string = 'zh') {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select({
      id: days.id,
      tripId: days.tripId,
      dayNumber: days.dayNumber,
      image: days.image,
      sortOrder: days.sortOrder,
      title: dayTranslations.title,
      date: dayTranslations.date,
      description: dayTranslations.description,
    })
    .from(days)
    .leftJoin(dayTranslations, eq(days.id, dayTranslations.dayId))
    .where(and(eq(days.tripId, tripId), eq(dayTranslations.lang, lang)))
    .orderBy(days.sortOrder);
  
  return result;
}

export async function createDay(day: InsertDay, translations: { zh: Omit<InsertDayTranslation, 'dayId'>; en: Omit<InsertDayTranslation, 'dayId'> }) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const [inserted] = await db.insert(days).values(day).$returningId();
  const dayId = inserted.id;
  
  await db.insert(dayTranslations).values([
    { ...translations.zh, dayId, lang: 'zh' },
    { ...translations.en, dayId, lang: 'en' },
  ]);
  
  return dayId;
}

export async function updateDayTranslation(dayId: number, lang: string, data: Partial<InsertDayTranslation>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  await db
    .update(dayTranslations)
    .set(data)
    .where(and(eq(dayTranslations.dayId, dayId), eq(dayTranslations.lang, lang)));
}

// ==================== ACTIVITIES ====================

export async function getActivitiesByDayId(dayId: number, lang: string = 'zh') {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select({
      id: activities.id,
      dayId: activities.dayId,
      time: activities.time,
      sortOrder: activities.sortOrder,
      title: activityTranslations.title,
      description: activityTranslations.description,
    })
    .from(activities)
    .leftJoin(activityTranslations, eq(activities.id, activityTranslations.activityId))
    .where(and(eq(activities.dayId, dayId), eq(activityTranslations.lang, lang)))
    .orderBy(activities.sortOrder);
  
  return result;
}

export async function createActivity(activity: InsertActivity, translations: { zh: Omit<InsertActivityTranslation, 'activityId'>; en: Omit<InsertActivityTranslation, 'activityId'> }) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const [inserted] = await db.insert(activities).values(activity).$returningId();
  const activityId = inserted.id;
  
  await db.insert(activityTranslations).values([
    { ...translations.zh, activityId, lang: 'zh' },
    { ...translations.en, activityId, lang: 'en' },
  ]);
  
  return activityId;
}

export async function updateActivityTranslation(activityId: number, lang: string, data: Partial<InsertActivityTranslation>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  await db
    .update(activityTranslations)
    .set(data)
    .where(and(eq(activityTranslations.activityId, activityId), eq(activityTranslations.lang, lang)));
}
