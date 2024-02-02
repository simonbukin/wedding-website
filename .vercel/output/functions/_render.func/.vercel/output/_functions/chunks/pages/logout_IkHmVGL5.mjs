/* empty css                           */
import { e as createAstro, f as createComponent } from '../astro_nttldMiC.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';
import { s as supabase } from './index_2IHP1mmH.mjs';

const $$Astro = createAstro();
const $$Logout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  if (Astro2.request.method !== "GET") {
    return;
  }
  await supabase.auth.signOut();
  return Astro2.redirect("/");
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/api/logout.astro", void 0);

const $$file = "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/api/logout.astro";
const $$url = "/api/logout";

export { $$Logout as default, $$file as file, $$url as url };
