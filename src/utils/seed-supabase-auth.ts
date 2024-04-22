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
  const accountDetails = [];
  for (const userName of userNames) {
    const password = generatePassword();
    console.log(`Creating account for ${userName} with password: ${password}`);
    try {
      await createAccount(userName + "@rsvp.ing", password);
      accountDetails.push({ email: userName + "@rsvp.ing", password });
    } catch (error) {
      console.error("Error creating account:", error);
    }
  }
  await Bun.write("accountDetails.json", JSON.stringify(accountDetails));
}

const loveWords = [
  "forever",
  "unity",
  "bliss",
  "eternal",
  "devotion",
  "passion",
  "romance",
  "cherish",
  "adore",
  "heart",
  "soul",
  "vows",
  "kiss",
  "embrace",
  "promise",
  "dream",
  "together",
  "joy",
  "happiness",
  "love",
  "bond",
  "affection",
  "spark",
  "dove",
  "harmony",
  "loyalty",
  "trust",
  "family",
  "companion",
  "delight",
  "grace",
  "laughter",
];

function generatePassword() {
  let password = "";
  while (password.length < 2 || password.length > 17) {
    const randomWords = new Set();
    while (randomWords.size < 3) {
      const randomIndex = Math.floor(Math.random() * loveWords.length);
      randomWords.add(loveWords[randomIndex]);
      const tempPassword = Array.from(randomWords).join("-");
      if (tempPassword.length <= 17) {
        password = tempPassword;
      } else {
        randomWords.clear();
      }
    }
  }
  return password;
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
