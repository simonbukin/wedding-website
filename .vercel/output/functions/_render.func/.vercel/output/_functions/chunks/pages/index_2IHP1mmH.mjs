/* empty css                           */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderHead, h as addAttribute, j as renderSlot, m as maybeRenderHead, k as renderComponent, l as renderTransition } from '../astro_nttldMiC.mjs';
import 'kleur/colors';
import 'html-escaper';
import { differenceInCalendarDays } from 'date-fns';
import 'clsx';
import 'cssesc';
/* empty css                          */
import { createClient } from '@supabase/supabase-js';
/* empty css                          */

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width">${renderHead()}</head><a rel="icon" type="image/svg+xml" href="/favicon.ico"></a> <meta name="generator"${addAttribute(Astro2.generator, "content")}> <title>${title}</title> <div class="background"></div> ${renderSlot($$result, $$slots["default"])}  </html>`;
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$NavBar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NavBar;
  const { data, error } = await supabase.auth.getSession();
  const loggedIn = data.session;
  if (error) {
    console.error(error);
  }
  const anchorCss = `cursor-pointer
                   pb-1
                   block 
                   rounded-md
                   p-2 
                   border
                   border-slate-700
                   bg-transparent
                   text-xl
                   text-slate-700
                   text-center
                   hover:bg-slate-400
                   hover:text-slate-100
                   sm:px-4
                   sm:pt-4
                   sm:rounded-none
                   sm:border-b-2
                   sm:border-l-0 
                   sm:border-r-0
                   sm:border-t-0
                   sm:border-b-transparent
                   sm:bg-transparent
                   sm:text-slate-800
                   sm:hover:border-b-2
                   sm:hover:border-slate-800
                   sm:hover:bg-transparent
                   sm:hover:text-slate-800`;
  return renderTemplate`${maybeRenderHead()}<nav class="mx-4 w-full mt-4"> <ul hx-boost="true" class="sm:align-center grid h-full w-full grid-cols-2 grid-rows-3 gap-4 sm:flex sm:flex-row sm:justify-center"> <li class="col-span-2"> <a${addAttribute(anchorCss, "class")} href="/rsvp">RSVP</a> </li> <li> <a${addAttribute(anchorCss, "class")} href="/travel">Travel</a> </li> <li> <a${addAttribute(anchorCss, "class")} href="/menu">Menu</a> </li> <li> <a target="_blank"${addAttribute(anchorCss, "class")} href="https://www.amazon.com/wedding/share/simonandkayla">
Registry
</a> </li> <li> <a${addAttribute(anchorCss, "class")} href="/our-story">Our Story</a> </li> ${loggedIn && renderTemplate`<li> <a${addAttribute(anchorCss, "class")} href="/api/logout">Log out</a> </li>`} </ul> </nav>`;
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/components/NavBar.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const daysUntilWedding = differenceInCalendarDays(
    new Date(2024, 8, 3),
    /* @__PURE__ */ new Date()
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Simon & Kayla" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-auto flex min-h-screen w-full flex-col text-slate-700 sm:max-w-screen-sm md:max-w-screen-md"> <section class="flex flex-col items-center justify-center sm:my-6 sm:flex-grow"> <div class="mb-4 flex w-full flex-row items-center justify-around"> <h1 class="relative top-1 my-2 text-center text-4xl font-bold sm:mb-4 sm:text-6xl"${addAttribute(renderTransition($$result2, "7udw5tqk", "slide", ""), "data-astro-transition-scope")}>
SIMON${" "} <span class="relative bottom-1 sm:bottom-1 sm:text-7xl">+</span>${" "}
KAYLA
</h1> </div> <h2 class="flex flex-row gap-4 text-2xl sm:text-2xl">
August 3rd, 2024 • Camarillo, CA
</h2> <h2 class="mb-4 text-2xl sm:text-2xl"> ${daysUntilWedding} day${daysUntilWedding === 1 ? "" : "s"} to go!
</h2> </section> <section class="flex flex-col items-center justify-center"> <nav class="order-last flex h-full w-full flex-row justify-center sm:order-first sm:mb-2 sm:mt-6"> ${renderComponent($$result2, "NavBar", $$NavBar, {})} </nav> <div class="h-[283px] sm:h-[513px] w-full"> ${renderComponent($$result2, "Carousel", null, { "client:only": "solidjs", "client:component-hydration": "only", "client:component-path": "/Users/simonbukin/Projects/programming/wedding-website-astro/src/components/Carousel", "client:component-export": "default" })} </div> </section> <footer class="mb-4 mt-8 flex flex-col items-center justify-around text-slate-500 sm:my-8 sm:flex-row"> <section class="flex flex-row"> <p>Made with 💜
<a class="text-purple-700" href="https://www.simonbukin.com" target="_blank">
Simon Bukin
</a> </p> </section> <section class="mt-2 sm:m-0"> <p>
Photos by${" "} <a class="text-purple-700" href="https://www.instagram.com/3256austin/" target="_blank">
Austin Fisher
</a> </p> </section> </footer> </main> ` })}`;
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/index.astro", "self");

const $$file = "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, index as i, supabase as s };
