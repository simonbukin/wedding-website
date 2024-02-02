// import { parse } from "csv-parse";

// export type Guest = {
//   lastName: string;
//   adultFirstNames: string[];
//   childrenFirstNames: string[];
//   adults: number;
//   children: number;
//   plusOne: boolean;
//   fullNames: string[];
//   userName: string;
// };

// function parseFirstNames(
//   firstName: string,
//   lastName: string
// ): { fullNames: string[]; adults: string[]; children: string[] } {
//   const adults: string[] = [];
//   const children: string[] = [];

//   const adultNames = firstName.split(",")[0]?.trim();
//   const childNames = firstName.split(",")[1]?.trim();

//   const fullNames: string[] = [];

//   if (adultNames) {
//     const adultList = adultNames.split("&").map((name) => name.trim());
//     for (const adult of adultList) {
//       if (adult.split(" ").length > 1) {
//         // custom last name
//         const [first, ...last] = adult.split(" ");
//         fullNames.push(`${first} ${last.join(" ")}`);
//       } else {
//         fullNames.push(`${adult} ${lastName}`);
//       }
//     }
//     adults.push(...adultList);
//   }

//   if (childNames) {
//     const childList = childNames.split("&").map((name) => name.trim());
//     for (const child of childList) {
//       fullNames.push(`${child} ${lastName}`);
//     }
//     children.push(...childList);
//   }

//   return { fullNames, adults, children };
// }

// const parseCsv = async () => {
//   const filePath = "./guests.csv";
//   const csvData = await Bun.file(filePath).text();
//   const records = parse(csvData, {
//     columns: true,
//     bom: true,
//     trim: true,
//     skipEmptyLines: true,
//   });

//   const arr = await records.toArray();

//   const guests = arr.map((guest) => {
//     const adultNumber = parseInt(guest["Adults"]);
//     const childrenNumber = parseInt(guest["Children"]);
//     const plusOne = Boolean(guest["Plus One?"] === "Y");
//     const { adults, children, fullNames } = parseFirstNames(
//       guest["First Name(s)"],
//       guest["Last Name"]
//     );
//     return {
//       lastName: guest["Last Name"],
//       adultFirstNames: adults,
//       childrenFirstNames: children,
//       adults: adultNumber ? adultNumber : 0,
//       children: childrenNumber ? childrenNumber : 0,
//       plusOne,
//       fullNames,
//       userName: guest["User Name"],
//     };
//   });

//   let oopsCount = 0;
//   for (const guest of guests) {
//     let adultMismatch = false;
//     let childrenMismatch = false;
//     if (guest.adultFirstNames.length + Number(guest.plusOne) !== guest.adults) {
//       adultMismatch = true;
//     }
//     if (guest.childrenFirstNames.length !== guest.children) {
//       childrenMismatch = true;
//     }
//     if (adultMismatch || childrenMismatch) {
//       oopsCount++;
//       console.log("_-_-_-_-");
//       if (childrenMismatch) console.log("children mismatch");
//       if (adultMismatch) console.log("adults mismatch");
//       console.log(guest);
//       console.log("_-_-_-_-");
//     }
//   }
//   return guests;
// };

// const guests = await parseCsv();
// Bun.write("guests.json", JSON.stringify(guests, null, 2));
