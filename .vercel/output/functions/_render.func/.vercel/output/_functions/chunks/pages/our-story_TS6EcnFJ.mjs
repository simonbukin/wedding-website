/* empty css                           */
import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent } from '../astro_nttldMiC.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';
import { $ as $$Layout } from './index_2IHP1mmH.mjs';

const $$Astro = createAstro();
const $$OurStory = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OurStory;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Our Story" }, { "default": ($$result2) => renderTemplate`
Our Story!
` })}`;
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/our-story.astro", void 0);

const $$file = "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/our-story.astro";
const $$url = "/our-story";

export { $$OurStory as default, $$file as file, $$url as url };
