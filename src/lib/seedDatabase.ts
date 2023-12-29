import { PrismaClient } from "@prisma/client";
import {
  createGroup,
  createUser,
  deleteAll,
  getAllGroups,
  getAllPlusOnes,
  getAllUsers,
  searchGroupById,
} from "../app/database.ts";
import { Guest } from "./parseCsv.ts";
import invariant from "tiny-invariant";

// let prisma = new PrismaClient();

// async function main() {
//   await deleteAll();

//   type Id = { id: string };
//   type GuestAndId = Guest & Id;
//   let guestsJson;
//   try {
//     guestsJson = await import("../app/guests.json", {
//       assert: { type: "json" },
//     });
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }

//   const json = guestsJson.slice(0, 5) as GuestAndId[];

//   for (const guest of json) {
//     let group: number;
//     try {
//       console.log(`creating new group: ${guest.id}`);
//       const newGroup = await createGroup(guest.id, guest.plusOne);
//       group = newGroup.id;
//       console.log(`created new group: ${group}`);
//     } catch (e) {
//       console.error(e);
//       const foundGroup = await searchGroupById(guest.id);
//       invariant(foundGroup, "group not found");
//       group = foundGroup.id;
//     }
//     for (const user of guest.fullNames) {
//       const [firstName, lastName] = user.split(" ");
//       console.log(`creating new user: ${firstName} ${lastName}`);
//       const { id: newUser } = await createUser(firstName, lastName, group);
//       console.log(`created new user: ${newUser}`);
//     }
//   }
//   console.log("GROUPS");
//   console.log(await getAllGroups());
//   console.log("USERS");
//   console.log(await getAllUsers());
//   console.log("PLUS ONES");
//   console.log(await getAllPlusOnes());
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
