import { describe, expect, it, vi } from "vitest";
import { GET } from "./route";
import { FoodPreference, User } from "@prisma/client";

const mocks = vi.hoisted(() => {
  return {
    searchGroupById: vi.fn(),
  };
});

vi.mock("@/app/database.ts", () => {
  return {
    searchGroupById: mocks.searchGroupById,
  };
});

describe("GET", () => {
  it("should return a 404 'Group not found' when no clerkId is provided", async () => {
    const req = new Request("http://localhost");
    const options = {
      params: {
        clerkId: "testuser",
      },
    };
    const result = await GET(req, options);
    expect(result.status).toBe(404);
  });

  it('should return a 200 "Group found" when a clerkId is provided', async () => {
    const users: User[] = [
      {
        id: 1,
        groupId: 1,
        firstName: "test",
        lastName: "user",
        dietaryRestrictions: null,
        foodPreference: FoodPreference.SHORTRIB,
        going: false,
      },
    ];
    mocks.searchGroupById.mockResolvedValue({ users });
    const req = new Request("http://localhost");
    const options = {
      params: {
        clerkId: "testuser",
      },
    };
    const result = await GET(req, options);
    expect(result.status).toBe(200);
    expect(await result.json()).toStrictEqual(users);
  });
});
