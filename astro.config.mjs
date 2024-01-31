import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import htmx from "astro-htmx";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [htmx(), tailwind(), solidJs()],
  output: "server"
});