import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function NavBar() {
  const buttonCss =
    "w-full h-full sm:px-4 sm:pb-0 sm:pt-4 border border-slate-700 bg-transparent text-xl text-slate-700 hover:bg-slate-400 hover:text-slate-100 sm:rounded-none sm:border-b-2 sm:border-l-0 sm:border-r-0 sm:border-t-0 sm:border-b-transparent sm:bg-transparent sm:text-slate-800 sm:hover:border-b-2 sm:hover:border-slate-800 sm:hover:bg-transparent sm:hover:text-slate-800";

  return (
    <nav className="mx-4 w-full">
      <ul className="sm:align-center grid h-full w-full grid-cols-2 grid-rows-3 gap-4 sm:flex sm:flex-row sm:justify-center">
        <li className="col-span-2">
          <Link href="/rsvp">
            <Button className={buttonCss}>RSVP</Button>
          </Link>
        </li>
        <li>
          <Link href="/travel">
            <Button className={buttonCss}>Travel</Button>
          </Link>
        </li>
        <li>
          <Link href="/menu">
            <Button className={buttonCss}>Menu</Button>
          </Link>
        </li>
        <li>
          <Button className={buttonCss}>
            <a
              target="_blank"
              href="https://www.amazon.com/wedding/share/simonandkayla"
            >
              Registry
            </a>
          </Button>
        </li>
        <li>
          <Link href="/our-story">
            <Button className={buttonCss}>Our Story</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
