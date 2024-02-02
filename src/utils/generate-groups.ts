// import * as guests from "./guests.json";
// import { FoodChoice, type Group, type Person } from "../lib/types";
// import type { Guest } from "./parse-csv";

// // @ts-ignore
// const typedGuests = guests.default as Guest[];

// const generateGroups = async () => {
//   const groups: Group[] = [];

//   for (const guest of typedGuests) {
//     const userName = guest.userName;

//     const people = guest.fullNames.map((fullName) => {
//       const [firstName, lastName] = fullName.split(" ");
//       return {
//         going: true,
//         firstName,
//         lastName,
//         foodChoice: FoodChoice.CHICKEN,
//       } as Person;
//     });

//     const group = {
//       userName,
//       people: people,
//       canHavePlusOne: guest.plusOne,
//     } as Group;

//     groups.push(group);
//   }
//   await Bun.write("users.json", JSON.stringify(groups));
// };

// await generateGroups();
