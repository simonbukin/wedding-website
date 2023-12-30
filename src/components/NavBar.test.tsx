import { beforeEach, describe, expect, it, vi } from "vitest";
import { NavBar } from "./NavBar";
import { cleanup, render, screen } from "@testing-library/react";

const mocks = vi.hoisted(() => {
  return {
    auth: vi.fn(),
    ClerkProvider: vi.fn(),
    useUser: vi.fn(),
    useClerk: vi.fn(),
    useRouter: vi.fn(),
  };
});

vi.mock("@clerk/nextjs", () => {
  return mocks;
});

vi.mock("next/navigation", () => {
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

  mocks.useRouter.mockImplementation(() => ({
    push: () => {},
  }));
};

describe("NavBar", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders navigation links", () => {
    setupClerkMocks(true);
    render(<NavBar />);
    expect(screen.getByText("RSVP")).toBeDefined();
    expect(screen.getByText("Travel")).toBeDefined();
    expect(screen.getByText("Registry")).toBeDefined();
    expect(screen.getByText("Our Story")).toBeDefined();
    expect(screen.getByText("Log out")).toBeDefined();
  });

  it('renders a "Log in" button when signed out', () => {
    setupClerkMocks(false);
    render(<NavBar />);
    expect(screen.getByText("Log in")).toBeDefined();
  });

  it('renders a "Log out" button when signed in', () => {
    setupClerkMocks(true);
    render(<NavBar />);
    expect(screen.getByText("Log out")).toBeDefined();
  });
});
