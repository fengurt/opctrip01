import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database module
vi.mock("./db", () => ({
  getAllTrips: vi.fn().mockResolvedValue([
    {
      id: 1,
      slug: "test-trip",
      heroImage: "/images/test.jpg",
      accentColor: "#F59E0B",
      dates: "2026.01.01 - 01.05",
      sortOrder: 1,
      isPublished: 1,
      title: "测试行程",
      subtitle: "测试副标题",
      location: "测试地点",
      description: "测试描述",
    },
  ]),
  getTripBySlug: vi.fn().mockResolvedValue({
    id: 1,
    slug: "test-trip",
    heroImage: "/images/test.jpg",
    accentColor: "#F59E0B",
    dates: "2026.01.01 - 01.05",
    sortOrder: 1,
    isPublished: 1,
    title: "测试行程",
    subtitle: "测试副标题",
    location: "测试地点",
    description: "测试描述",
  }),
  getDaysByTripId: vi.fn().mockResolvedValue([
    {
      id: 1,
      tripId: 1,
      dayNumber: 1,
      image: "/images/day1.jpg",
      sortOrder: 1,
      title: "第一天",
      date: "1月1日",
      description: "第一天描述",
    },
  ]),
  getActivitiesByDayId: vi.fn().mockResolvedValue([
    {
      id: 1,
      dayId: 1,
      time: "09:00",
      sortOrder: 1,
      title: "活动一",
      description: "活动描述",
    },
  ]),
  updateTripTranslation: vi.fn().mockResolvedValue(undefined),
  updateDayTranslation: vi.fn().mockResolvedValue(undefined),
  updateActivityTranslation: vi.fn().mockResolvedValue(undefined),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("trips.list", () => {
  it("returns trips list for public users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.trips.list({ lang: "zh" });

    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("test-trip");
    expect(result[0].title).toBe("测试行程");
  });

  it("returns trips list with English language", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.trips.list({ lang: "en" });

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("trips.getBySlug", () => {
  it("returns trip with days and activities", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.trips.getBySlug({ slug: "test-trip", lang: "zh" });

    expect(result).toBeDefined();
    expect(result?.slug).toBe("test-trip");
    expect(result?.days).toHaveLength(1);
    expect(result?.days[0].activities).toHaveLength(1);
  });

  it("returns null for non-existent trip", async () => {
    const db = await import("./db");
    vi.mocked(db.getTripBySlug).mockResolvedValueOnce(null);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.trips.getBySlug({ slug: "non-existent", lang: "zh" });

    expect(result).toBeNull();
  });
});

describe("trips.updateTranslation", () => {
  it("allows admin to update trip translation", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.trips.updateTranslation({
      tripId: 1,
      lang: "zh",
      field: "title",
      value: "新标题",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects non-admin users from updating", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.trips.updateTranslation({
        tripId: 1,
        lang: "zh",
        field: "title",
        value: "新标题",
      })
    ).rejects.toThrow();
  });

  it("rejects unauthenticated users from updating", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.trips.updateTranslation({
        tripId: 1,
        lang: "zh",
        field: "title",
        value: "新标题",
      })
    ).rejects.toThrow();
  });
});

describe("days.updateTranslation", () => {
  it("allows admin to update day translation", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.days.updateTranslation({
      dayId: 1,
      lang: "zh",
      field: "title",
      value: "新的一天",
    });

    expect(result).toEqual({ success: true });
  });
});

describe("activities.updateTranslation", () => {
  it("allows admin to update activity translation", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.activities.updateTranslation({
      activityId: 1,
      lang: "zh",
      field: "title",
      value: "新活动",
    });

    expect(result).toEqual({ success: true });
  });
});
