/* empty css                           */
import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent } from '../astro_nttldMiC.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';
import { $ as $$Layout } from './index_2IHP1mmH.mjs';

const $$Astro = createAstro();
const $$Travel = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Travel;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Travel" }, { "default": ($$result2) => renderTemplate`
Travel!
` })}`;
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/travel.astro", void 0);

const $$file = "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/travel.astro";
const $$url = "/travel";

export { $$Travel as default, $$file as file, $$url as url };
