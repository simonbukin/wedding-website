import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import HomePage from "./HomePage";

export default async function Home() {
  return (
    <>
      <SignedIn>
        <HomePage />
      </SignedIn>
      <SignedOut>
        <main className="flex w-full h-full items-center justify-center">
          <SignIn />
        </main>
      </SignedOut>
    </>
  );
}
