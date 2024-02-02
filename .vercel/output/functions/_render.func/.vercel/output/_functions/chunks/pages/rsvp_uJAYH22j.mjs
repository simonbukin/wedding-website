/* empty css                           */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, k as renderComponent, F as Fragment } from '../astro_nttldMiC.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'cssesc';
import 'clsx';
import { s as supabase, $ as $$Layout } from './index_2IHP1mmH.mjs';

var FoodChoice = /* @__PURE__ */ ((FoodChoice2) => {
  FoodChoice2["CHICKEN"] = "Chicken";
  FoodChoice2["SHORTRIB"] = "Shortrib";
  FoodChoice2["VEGETARIAN"] = "Vegetarian";
  FoodChoice2["KIDS_MEAL"] = "Kids Meal";
  return FoodChoice2;
})(FoodChoice || {});

const $$Astro$2 = createAstro();
const $$PersonForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PersonForm;
  const { person, index } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="mb-8 flex flex-col gap-4"${addAttribute(`{ going: "${person.going ? "going" : "notGoing"}" }`, "x-data")}> <h2 class="text-xl font-bold">${`${person.firstName} ${person.lastName}`}</h2> <section class="grid grid-cols-2 grid-rows-2 gap-4"> <label class="flex items-center justify-start gap-4"> <input class="h-[30px] w-[30px] flex-shrink-0 accent-violet-800" type="radio" value="going"${addAttribute(`${index}.going`, "name")}${addAttribute(person.going, "checked")} x-model="going">
Joyfully accept!
</label> <select class="rounded-md px-4 py-2 text-slate-900 border border-transparent disabled:border-slate-900/30 disabled:bg-kaylasCoolColor disabled:text-slate-900/20"${addAttribute(`${index}.foodChoice`, "name")} x-bind:disabled="going !== 'going'"> <option value="" disabled>
Select your entree
</option> ${Object.keys(FoodChoice).map((key) => {
    return renderTemplate`<option${addAttribute(person.foodChoice === key, "selected")}>${key}</option>`;
  })} </select> <label class="flex items-center justify-start gap-4"> <input class="h-[30px] w-[30px] flex-shrink-0 accent-violet-800" type="radio" value="notGoing"${addAttribute(`${index}.going`, "name")}${addAttribute(!person.going, "checked")} x-model="going">
Regretfully decline...
</label> <input class="rounded-md p-2 text-slate-900 border border-transparent disabled:border-slate-900/20 disabled:bg-kaylasCoolColor" placeholder="Dietary restrictions" type="text"${addAttribute(person.dietaryPreference, "value")}${addAttribute(`${index}.dietaryPreference`, "name")} x-bind:disabled="going !== 'going'"> </section> </section>`;
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/components/PersonForm.astro", void 0);

const $$Astro$1 = createAstro();
const $$RSVPForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RSVPForm;
  const { group } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<form method="post" hx-post="/rsvp" hx-target="body" class="flex flex-col bg-kaylasCoolColor/80 gap-4 rounded-md border border-slate-600 p-4"${addAttribute(`{
                  plusOneFirstName: "${group?.plusOne?.firstName}",
                  plusOneLastName: "${group?.plusOne?.lastName}",
                  submitted: false
                }`, "x-data")}> ${group?.people.map((person, index) => {
    return renderTemplate`${renderComponent($$result, "PersonForm", $$PersonForm, { "person": person, "index": index })}`;
  })} ${group?.canHavePlusOne && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <h2 class="mb-4 text-xl font-bold" x-text="\`\${plusOneFirstName} \${plusOneLastName}\`">Guest Name</h2> <section class="grid grid-cols-2 grid-rows-2 gap-4"> <input class="rounded-md p-2 text-slate-900 disabled:border disabled:border-slate-900/20 disabled:bg-kaylasCoolColor" type="text"${addAttribute(group?.plusOne?.firstName, "value")} placeholder="Plus one first name" name="plusOneFirstName" x-model="plusOneFirstName"> <select name="plusOneFoodChoice" class="rounded-md px-4 py-2 text-slate-900 disabled:border disabled:border-slate-900/30 disabled:bg-kaylasCoolColor disabled:text-slate-900/20"> <option value="" disabled>
Select your entree
</option> ${Object.keys(FoodChoice).map((key) => {
    return renderTemplate`<option${addAttribute(group?.plusOne?.foodChoice === key, "selected")}>${key}</option>`;
  })} </select> <input class="rounded-md p-2 text-slate-900 disabled:border disabled:border-slate-900/20 disabled:bg-kaylasCoolColor" type="text"${addAttribute(group?.plusOne?.lastName, "value")} placeholder="Plus one last name" name="plusOneLastName" x-model="plusOneLastName"> <input class="rounded-md p-2 text-slate-900 disabled:border disabled:border-slate-900/20 disabled:bg-kaylasCoolColor" placeholder="Dietary " type="text"${addAttribute(group?.plusOne?.dietaryPreference, "value")} name="plusOneDietaryPreference"> </section> ` })}`} <button type="submit" class="rounded-md border border-slate-700 bg-blue-300 py-4 text-xl font-bold text-slate-900 hover:bg-blue-500">RSVP</button> </form>`;
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/components/RSVPForm.astro", void 0);

const $$Astro = createAstro();
const $$Rsvp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Rsvp;
  const { data, error } = await supabase.auth.getSession();
  const session = data.session;
  if (error) {
    console.error(error);
  }
  if (!session) {
    return Astro2.redirect("/login");
  }
  let group;
  let submitted = false;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    group = await getGroupFromDb(session.user?.id);
    if (group) {
      const firstName = formData.get("plusOneFirstName")?.toString();
      const lastName = formData.get("plusOneLastName")?.toString();
      const foodChoice = formData.get("plusOneFoodChoice")?.toString();
      const dietaryPreference = formData.get("plusOneDietaryPreference")?.toString();
      if (firstName && lastName && foodChoice && dietaryPreference) {
        group.plusOne = {
          going: true,
          firstName,
          lastName,
          foodChoice,
          dietaryPreference
        };
      }
      const isFirstCharacterANumber = (str) => {
        if (str.length === 0)
          return false;
        return !isNaN(Number.parseInt(str[0]));
      };
      const numericKeys = Array.from(formData.keys()).filter((key) => isFirstCharacterANumber(key));
      for (const key of numericKeys) {
        let [index, property] = key.split(".");
        let numericIndex = Number.parseInt(index || "");
        const person = group.people[numericIndex];
        if (property && person) {
          if (property === "going") {
            person["going"] = formData.get(key)?.toString() === "going";
          } else {
            person[property] = formData.get(key)?.toString();
          }
        }
      }
      const { error: error2 } = await supabase.from("groups").upsert({
        id: session.user?.id,
        rsvp: JSON.stringify(group)
      }).select();
      if (error2) {
        console.error(error2);
      } else {
        submitted = true;
      }
    }
  }
  if (Astro2.request.method === "GET") {
    group = await getGroupFromDb(session.user?.id);
  }
  async function getGroupFromDb(id) {
    const { data: data2, error: error2 } = await supabase.from("groups").select().eq("id", id);
    if (!error2) {
      return JSON.parse(data2[0].rsvp);
    } else {
      console.error(error2);
      return void 0;
    }
  }
  if (!group) {
    return Astro2.redirect("/login");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "RSVP" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section${addAttribute(`{ submitted: ${submitted}}`, "x-data")} class="flex min-h-screen w-full flex-col p-4 text-slate-700 sm:mx-auto sm:max-w-screen-sm md:max-w-screen-md"> <h1 class="text-4xl text-bold my-2">RSVP</h1> <div x-show="submitted" class="fixed flex top-0 left-0 w-full h-full bg-black/50 justify-center items-center z-10"> <div class="bg-white p-8 rounded-md shadow-lg text-center flex flex-col"> <h2 class="text-left text-2xl font-bold mb-4">Thank you for RSVPing!</h2> <p class="text-gray-600 mb-6">You can change your RSVP anytime up until we say you can't</p> <a href="/" class="self-end w-1/3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded">Back home</a> </div> </div> ${renderComponent($$result2, "RSVPForm", $$RSVPForm, { "group": group })} </section> ` })}`;
}, "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/rsvp.astro", void 0);

const $$file = "/Users/simonbukin/Projects/programming/wedding-website-astro/src/pages/rsvp.astro";
const $$url = "/rsvp";

export { $$Rsvp as default, $$file as file, $$url as url };
