"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { CornerUpRight, LogIn } from "lucide-react";

export default function LogInButton() {
  const { isSignedIn } = useUser();
  const { openSignIn, signOut } = useClerk();

  return isSignedIn ? (
    <CornerUpRight
      onClick={() => signOut()}
      className="block sm:hidden"
      data-testid="sign-out-button"
    />
  ) : (
    <LogIn
      onClick={() => openSignIn()}
      className="block sm:hidden"
      data-testid="sign-in-button"
    />
  );
}
