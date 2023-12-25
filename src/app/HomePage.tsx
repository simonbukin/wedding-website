"use client";

import { UserButton, useUser } from "@clerk/clerk-react";
import Countdown from "./Countdown";
import Link from "next/link";

export default function Homepage() {
  return (
    <main className="flex flex-col">
      <nav className="flex flex-row gap-4 items-center justify-center h-fit">
        <UserButton />
      </nav>

      <section className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">
          Simon and Kayla are getting married!
        </h1>
        <Countdown date={new Date(2024, 8, 3)} />
      </section>
    </main>
  );
}
