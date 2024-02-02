import { createClient, type User } from "@supabase/supabase-js";

let guests;
const supabaseUrl = Bun.env.SUPABASE_URL;
const supabaseKey = Bun.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("No SUPABASE_URL and SUPABASE_ANON_KEY found in.env file");
} else {
  guests = await import("./guests.json");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAccount(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating account:", error);
    return null;
  }
}

async function makeGuestAccounts(userNames: string[]) {
  for (const userName of userNames) {
    console.log("Creating user:", userName);
    await createAccount(userName + "@rsvp.ing", "password123");
  }
}

async function clearAllAccounts() {
  const userAccounts = await getAllUserAccounts();
  for (const user of userAccounts.users) {
    console.log("Deleting user:", user.email);
    await supabase.auth.admin.deleteUser(user.id);
  }
}

export async function getAllUserAccounts() {
  let nextPage = 1;
  const userAccounts: { users: User[] } = { users: [] };
  while (nextPage) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page: nextPage,
    });
    if (error) {
      console.error("Error getting all users:", error);
    }
    userAccounts.users.push(...data.users);
    // @ts-ignore
    if (data.nextPage) {
      // @ts-ignore
      nextPage = data.nextPage;
    } else {
      break;
    }
  }
  console.log(userAccounts.users.length);
  return userAccounts;
}

await clearAllAccounts();
// @ts-ignore
await makeGuestAccounts(guests.default.map((guest) => guest.userName));
await getAllUserAccounts();
