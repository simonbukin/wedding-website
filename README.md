# Wedding Website

We're getting married! This is the website for my wedding. It supports RSVPing!

## Stack

- Astro
- Supabase
- Alpine
- HTMX

### Generating Groups

- pwd: /src/utils
  bun run parse-csv.ts
  bun run generate-groups.ts
- pwd: /
  bun run seed-database.ts

