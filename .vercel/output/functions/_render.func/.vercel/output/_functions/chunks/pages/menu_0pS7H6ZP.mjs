/* empty css                           */
import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent } from '../astro_nttldMiC.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';
import { $ as $$Layout } from './index_2IHP1mmH.mjs';

const $$Astro = createAstro();
const $$Menu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Menu;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Menu" }, { "default": ($$result2) => renderTemplate`
Menu!
` })}`;
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/menu.astro", void 0);

const $$file = "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/menu.astro";
const $$url = "/menu";

export { $$Menu as default, $$file as file, $$url as url };
