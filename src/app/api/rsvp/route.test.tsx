import { describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { User } from "@prisma/client";

const mocks = vi.hoisted(() => {
  return {
    updateUser: vi.fn(),
  };
});

vi.mock("@/app/database.ts", () => {
  return {
    updateUser: mocks.updateUser,
  };
});

describe("POST", () => {
  it("should call updateUser 3 times", async () => {
    const fakeFormData: Record<string, Partial<User>> = {
      "368": {
        going: true,
        foodPreference: "SHORTRIB",
        dietaryRestrictions: null,
      },
      "369": {
        going: false,
        foodPreference: "SHORTRIB",
        dietaryRestrictions: null,
      },
      "370": {
        going: false,
        foodPreference: "SHORTRIB",
        dietaryRestrictions: null,
      },
    };

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify(fakeFormData),
    });

    const result = await POST(req);

    expect(result.status).toBe(200);
    expect(mocks.updateUser).toHaveBeenCalledTimes(3);
  });
});
