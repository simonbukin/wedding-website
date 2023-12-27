"use client";

import { useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Image from "next/image";
import { Menu } from "lucide-react";

export default function Homepage() {
  const { openSignIn, signOut } = useClerk();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const daysUntilWedding = differenceInCalendarDays(
    new Date(2024, 8, 3),
    new Date()
  );

  return (
    <div className="text-slate-700 flex flex-col relative min-h-screen w-full max-w-screen-md mx-auto">
      <section className="my-6 flex flex-col items-center justify-center flex-grow">
        <h1 className="text-6xl mb-4 font-bold">
          SIMON <span className="text-7xl relative bottom-1">+</span> KAYLA
        </h1>
        <h2 className="text-2xl flex flex-row gap-4">
          August 3rd, 2024 • Camarillo, CA
        </h2>
        <h2 className="text-2xl">
          {daysUntilWedding} day{daysUntilWedding === 1 ? "" : "s"} to go!
        </h2>
      </section>

      <nav className="flex flex-row justify-center mt-6 mb-3">
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuLink>
              <button
                onClick={() =>
                  isSignedIn
                    ? router.push("/rsvp")
                    : openSignIn({ afterSignInUrl: "/rsvp" })
                }
              >
                RSVP
              </button>
            </NavigationMenuLink>
            <NavigationMenuLink>Travel</NavigationMenuLink>
            <NavigationMenuLink>Registry</NavigationMenuLink>
            <NavigationMenuLink>Our Story</NavigationMenuLink>
            <NavigationMenuLink>
              <button
                onClick={() => {
                  if (isSignedIn) {
                    signOut();
                  } else {
                    openSignIn();
                  }
                }}
              >
                {isSignedIn ? "Log out" : "Log in"}
              </button>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <Carousel
        opts={{
          loop: true,
          duration: 40,
          speed: 40,
          align: "center",
          containScroll: false,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <Image
              src="/1.jpg"
              alt="Simon proposing to Kayla"
              width={5472}
              height={3648}
              className="rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/2.jpg"
              alt="Simon and Kayla laughing and holding hands"
              width={5472}
              height={3648}
              className="rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/3.jpg"
              alt="Simon and Kayla laughing"
              width={5472}
              height={3648}
              className="rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/4.jpg"
              alt="Simon and Kayla hugging next to a tree"
              width={5472}
              height={3648}
              className="rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <footer className="my-4 flex flex-row justify-center flex-shrink-0 text-slate-500">
        <p>
          Made with 💜 by{" "}
          <a
            className="text-purple-700"
            href="https://www.simonbukin.com"
            target="_blank"
          >
            Simon Bukin
          </a>
        </p>
      </footer>
    </div>
  );
}
