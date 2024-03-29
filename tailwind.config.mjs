/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        kaylasCoolColor: "#ABCDEF",
        simonsCoolColor: "#8458A4",
      },
    },
  },
  plugins: [],
};
