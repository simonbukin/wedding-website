import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";
import PostHogClient from "../../posthog";

const phClient = PostHogClient();

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return redirect("/login?error=Email and password are required");
  }

  const emailWithRsvping = email + "@rsvp.ing";

  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailWithRsvping,
    password,
  });

  if (error) {
    return redirect("/login?error=Invalid login credentials");
  }

  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });
  phClient.identify(emailWithRsvping);
  return redirect("/rsvp");
};
