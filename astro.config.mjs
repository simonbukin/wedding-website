import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import htmx from "astro-htmx";
// https://astro.build/config
export default defineConfig({
  integrations: [htmx(), tailwind()],
  output: "server",
});
