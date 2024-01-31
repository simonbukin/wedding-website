import { createClient } from "@supabase/supabase-js";
import users from "./users.json";

const supabaseUrl = Bun.env.SUPABASE_URL;
const supabaseKey = Bun.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("No SUPABASE_URL and SUPABASE_ANON_KEY found in.env file");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const seedDatabase = async () => {
  console.log(users);
  for (const user of users.slice(0, 5)) {
    await supabase
      .from("groups")
      .upsert({
        id: user.id,
        rsvp: JSON.stringify(user),
      })
      .select();
  }
};

seedDatabase();
