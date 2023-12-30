import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LogInButton from "./LogInButton";
import { ClerkProvider } from "@clerk/nextjs";

const mocks = vi.hoisted(() => {
  return {
    auth: vi.fn(),
    ClerkProvider: vi.fn(),
    useUser: vi.fn(),
    useClerk: vi.fn(),
  };
});

vi.mock("@clerk/nextjs", () => {
  return mocks;
});

const CLERK_USER_FIXTURE = {
  id: "user.id.123",
  fullName: "John Doe",
};

const setupClerkMocks = (isSignedIn: boolean) => {
  mocks.auth.mockImplementation(async () => ({
    userId: isSignedIn ? CLERK_USER_FIXTURE.id : null,
  }));

  mocks.useUser.mockImplementation(() => ({
    isSignedIn,
    user: isSignedIn ? CLERK_USER_FIXTURE : null,
  }));

  mocks.ClerkProvider.mockImplementation(
    ({ children }: React.PropsWithChildren) => <>{children}</>
  );

  mocks.useClerk.mockImplementation(() => ({
    openSignIn: () => {},
    signOut: () => {},
  }));
};

describe("LogInButton", () => {
  it("renders a log out icon when signed in", () => {
    setupClerkMocks(true);
    const { getByTestId } = render(<LogInButton />);
    expect(getByTestId("sign-out-button")).toBeDefined();
  });

  it("renders a log in icon when signed out", () => {
    setupClerkMocks(false);
    const { getByTestId } = render(<LogInButton />);
    expect(getByTestId("sign-in-button")).toBeDefined();
  });
});
