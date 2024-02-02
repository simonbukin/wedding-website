/* empty css                           */
import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent, m as maybeRenderHead } from '../astro_nttldMiC.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';
import { s as supabase, $ as $$Layout } from './index_2IHP1mmH.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const errors = { message: "" };
  const { data, error } = await supabase.auth.getSession();
  const session = data.session;
  if (error) {
    console.error(error);
  }
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString().trim();
    if (!email || !password) {
      errors.message = "invalid email or password";
    } else {
      const { error: error2 } = await supabase.auth.signInWithPassword({ email, password });
      if (error2) {
        errors.message = error2.message;
      } else {
        return Astro2.redirect("/rsvp");
      }
    }
  }
  if (Astro2.request.method === "GET" && session) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="text-xl min-h-screen grid place-content-center"> <form class="flex flex-col gap-2 *:px-3 *:py-2" method="POST"> <input type="text" name="email" placeholder="Email"> <input type="password" name="password" placeholder="Password"> ${errors.message && renderTemplate`<p>${errors.message}</p>`} <input type="submit" value="Login"> </form> </div> ` })}`;
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/login.astro", void 0);

const $$file = "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/login.astro";
const $$url = "/login";

export { $$Login as default, $$file as file, $$url as url };
