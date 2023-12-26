"use client";

import { UserButton, useUser } from "@clerk/clerk-react";
import Countdown from "./Countdown";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen w-full max-w-screen-md mx-auto">
      <nav className="pt-4 flex flex-row gap-4 items-center justify-center h-fit">
        <UserButton />
      </nav>

      <section className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold">
          Simon and Kayla are getting married!
        </h1>
        <Countdown date={new Date(2024, 8, 3)} />
      </section>

      <section className="flex flex-col items-center justify-center flex-grow">
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            isSignedIn
              ? router.push("/rsvp")
              : openSignIn({ afterSignInUrl: "/rsvp" })
          }
        >
          {isSignedIn ? "RSVP" : "Sign in to RSVP"}
        </button>
      </section>

      <footer className="pb-4 flex-shrink-0 text-slate-500">
        Made with ❤️ by{" "}
        <a
          className="text-cyan-500"
          href="https://www.simonbukin.com"
          target="_blank"
        >
          Simon Bukin
        </a>
      </footer>
    </div>
  );
}
