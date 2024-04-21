// src/posthog.js
import { PostHog } from "posthog-node";

let posthogClient = null;

export default function PostHogClient() {
  if (!posthogClient) {
    posthogClient = new PostHog(
      "phc_2kjq0UQOxonEslkuHAB9pnDsWOfd4Y64oS4BOyOsXYK",
      {
        host: '"https://us.posthog.com"',
      }
    );
  }
  return posthogClient;
}
