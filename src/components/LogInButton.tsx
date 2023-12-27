"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { CornerUpRight, LogIn } from "lucide-react";

export default function LogInButton() {
  const { isSignedIn } = useUser();
  const { openSignIn, signOut } = useClerk();

  return isSignedIn ? (
    <CornerUpRight onClick={() => signOut()} className="visible sm:hidden" />
  ) : (
    <LogIn onClick={() => openSignIn()} className="visible sm:hidden" />
  );
}
