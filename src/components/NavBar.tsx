"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NavBar() {
  const { openSignIn, signOut } = useClerk();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const buttonCss =
    "h-[70px] w-[200px] border border-slate-700 bg-transparent text-xl text-slate-700 hover:bg-slate-100 sm:h-auto sm:w-auto sm:border-none";

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col gap-4  sm:flex-row sm:gap-4">
        <NavigationMenuItem>
          <Button
            className={buttonCss}
            onClick={() =>
              isSignedIn
                ? router.push("/rsvp")
                : openSignIn({ afterSignInUrl: "/rsvp" })
            }
          >
            RSVP
          </Button>
        </NavigationMenuItem>
        <Link href="/travel">
          <NavigationMenuItem>
            <Button className={buttonCss}>Travel</Button>
          </NavigationMenuItem>
        </Link>

        <NavigationMenuItem>
          <Button className={buttonCss}>
            <a
              target="_blank"
              href="https://www.amazon.com/wedding/share/simonandkayla"
            >
              Registry
            </a>
          </Button>
        </NavigationMenuItem>

        <Link href="/our-story">
          <NavigationMenuItem>
            <Button className={buttonCss}>Our Story</Button>
          </NavigationMenuItem>
        </Link>
        <NavigationMenuItem className="invisible sm:visible">
          <Button
            className={buttonCss}
            onClick={() => {
              if (isSignedIn) {
                signOut();
              } else {
                openSignIn();
              }
            }}
          >
            {isSignedIn ? "Log out" : "Log in"}
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
