// import { createClient } from "@supabase/supabase-js";
// import { getAllUserAccounts } from "./seed-supabase-auth";

// let users;

// const supabaseUrl = Bun.env.SUPABASE_URL;
// const supabaseKey = Bun.env.SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error("No SUPABASE_URL and SUPABASE_ANON_KEY found in.env file");
// } else {
//   users = await import("./users.json");
// }

// const supabase = createClient(supabaseUrl, supabaseKey);
// const authUsers = (await getAllUserAccounts()).users;
// // @ts-ignore
// const userData = users.default;

// const seedDatabase = async () => {
//   for (const user of authUsers) {
//     const [username, _] = user?.email?.split("@") || "";
//     const userDataEntry = userData.find(
//       (entry: any) => entry.userName === username
//     );

//     console.log(userDataEntry);

//     await supabase
//       .from("groups")
//       .upsert({
//         id: user.id,
//         rsvp: JSON.stringify(userDataEntry),
//       })
//       .select();
//   }
// };

// seedDatabase();
