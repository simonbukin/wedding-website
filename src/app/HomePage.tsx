import { differenceInCalendarDays } from "date-fns";
import { LogIn } from "lucide-react";
import { ToolTipWithMobileHover } from "@/components/ToolTipWithMobileHover";
import { EngagementCarousel } from "@/components/EngagementCarousel";
import { NavBar } from "@/components/NavBar";
import LogInButton from "@/components/LogInButton";

export default function Homepage() {
  const daysUntilWedding = differenceInCalendarDays(
    new Date(2024, 8, 3),
    new Date()
  );

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col text-slate-700 sm:max-w-screen-sm md:max-w-screen-md">
      <section className="flex flex-col items-center justify-center sm:my-6 sm:flex-grow">
        <div className="mb-4 flex w-full flex-row items-center justify-around">
          <h1 className="relative top-1 my-2 text-4xl font-bold sm:mb-4 sm:text-6xl">
            SIMON{" "}
            <span className="relative bottom-1 sm:bottom-1 sm:text-7xl">+</span>{" "}
            KAYLA
          </h1>
          <LogInButton />
        </div>
        <h2 className="flex flex-row gap-4 text-2xl sm:text-2xl">
          August 3rd, 2024 • Camarillo, CA
        </h2>
        <h2 className="mb-4 text-2xl sm:text-2xl">
          {daysUntilWedding} day{daysUntilWedding === 1 ? "" : "s"} to go!
        </h2>
      </section>

      <section className="flex flex-col items-center justify-center">
        <nav className="order-3 flex flex-row justify-center sm:order-1 sm:mb-2 sm:mt-6">
          <NavBar />
        </nav>
        <EngagementCarousel />
      </section>

      <footer className="mb-4 flex flex-shrink-0 flex-row justify-center text-slate-500 sm:my-8">
        <p>Made with</p>
        <ToolTipWithMobileHover />
        <p>
          by{" "}
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
