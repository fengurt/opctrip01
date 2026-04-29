import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ==================== TRIPS ====================
  trips: router({
    // Public: Get all trips
    list: publicProcedure
      .input(z.object({ lang: z.enum(['zh', 'en']).default('zh') }))
      .query(async ({ input }) => {
        return db.getAllTrips(input.lang);
      }),

    // Public: Get single trip by slug
    getBySlug: publicProcedure
      .input(z.object({ 
        slug: z.string(), 
        lang: z.enum(['zh', 'en']).default('zh') 
      }))
      .query(async ({ input }) => {
        const trip = await db.getTripBySlug(input.slug, input.lang);
        if (!trip) {
          return null;
        }
        // Get days for this trip
        const tripDays = await db.getDaysByTripId(trip.id, input.lang);
        // Get activities for each day
        const daysWithActivities = await Promise.all(
          tripDays.map(async (day) => {
            const dayActivities = await db.getActivitiesByDayId(day.id, input.lang);
            return { ...day, activities: dayActivities };
          })
        );
        return { ...trip, days: daysWithActivities };
      }),

    // Admin: Create new trip
    create: adminProcedure
      .input(z.object({
        slug: z.string(),
        heroImage: z.string(),
        accentColor: z.string().default('#F59E0B'),
        dates: z.string(),
        sortOrder: z.number().default(0),
        translations: z.object({
          zh: z.object({
            title: z.string(),
            subtitle: z.string().optional(),
            location: z.string(),
            description: z.string().optional(),
          }),
          en: z.object({
            title: z.string(),
            subtitle: z.string().optional(),
            location: z.string(),
            description: z.string().optional(),
          }),
        }),
      }))
      .mutation(async ({ input }) => {
        const { translations, ...tripData } = input;
        const tripId = await db.createTrip(tripData, {
          zh: { ...translations.zh, lang: 'zh' },
          en: { ...translations.en, lang: 'en' },
        });
        return { tripId };
      }),

    // Admin: Update trip translation (inline edit)
    updateTranslation: adminProcedure
      .input(z.object({
        tripId: z.number(),
        lang: z.enum(['zh', 'en']),
        field: z.enum(['title', 'subtitle', 'location', 'description']),
        value: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.updateTripTranslation(input.tripId, input.lang, {
          [input.field]: input.value,
        });
        return { success: true };
      }),

    // Admin: Update trip metadata
    update: adminProcedure
      .input(z.object({
        tripId: z.number(),
        data: z.object({
          heroImage: z.string().optional(),
          accentColor: z.string().optional(),
          dates: z.string().optional(),
          sortOrder: z.number().optional(),
          isPublished: z.number().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        await db.updateTrip(input.tripId, input.data);
        return { success: true };
      }),
  }),

  // ==================== DAYS ====================
  days: router({
    // Public: Get days by trip ID
    listByTrip: publicProcedure
      .input(z.object({ 
        tripId: z.number(), 
        lang: z.enum(['zh', 'en']).default('zh') 
      }))
      .query(async ({ input }) => {
        return db.getDaysByTripId(input.tripId, input.lang);
      }),

    // Admin: Create new day
    create: adminProcedure
      .input(z.object({
        tripId: z.number(),
        dayNumber: z.number(),
        image: z.string().optional(),
        sortOrder: z.number().default(0),
        translations: z.object({
          zh: z.object({
            title: z.string(),
            date: z.string().optional(),
            description: z.string().optional(),
          }),
          en: z.object({
            title: z.string(),
            date: z.string().optional(),
            description: z.string().optional(),
          }),
        }),
      }))
      .mutation(async ({ input }) => {
        const { translations, ...dayData } = input;
        const dayId = await db.createDay(dayData, {
          zh: { ...translations.zh, lang: 'zh' },
          en: { ...translations.en, lang: 'en' },
        });
        return { dayId };
      }),

    // Admin: Update day translation (inline edit)
    updateTranslation: adminProcedure
      .input(z.object({
        dayId: z.number(),
        lang: z.enum(['zh', 'en']),
        field: z.enum(['title', 'date', 'description']),
        value: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.updateDayTranslation(input.dayId, input.lang, {
          [input.field]: input.value,
        });
        return { success: true };
      }),
  }),

  // ==================== ACTIVITIES ====================
  activities: router({
    // Public: Get activities by day ID
    listByDay: publicProcedure
      .input(z.object({ 
        dayId: z.number(), 
        lang: z.enum(['zh', 'en']).default('zh') 
      }))
      .query(async ({ input }) => {
        return db.getActivitiesByDayId(input.dayId, input.lang);
      }),

    // Admin: Create new activity
    create: adminProcedure
      .input(z.object({
        dayId: z.number(),
        time: z.string().optional(),
        sortOrder: z.number().default(0),
        translations: z.object({
          zh: z.object({
            title: z.string(),
            description: z.string().optional(),
          }),
          en: z.object({
            title: z.string(),
            description: z.string().optional(),
          }),
        }),
      }))
      .mutation(async ({ input }) => {
        const { translations, ...activityData } = input;
        const activityId = await db.createActivity(activityData, {
          zh: { ...translations.zh, lang: 'zh' },
          en: { ...translations.en, lang: 'en' },
        });
        return { activityId };
      }),

    // Admin: Update activity translation (inline edit)
    updateTranslation: adminProcedure
      .input(z.object({
        activityId: z.number(),
        lang: z.enum(['zh', 'en']),
        field: z.enum(['title', 'description']),
        value: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.updateActivityTranslation(input.activityId, input.lang, {
          [input.field]: input.value,
        });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
