import { NextResponse } from "next/server";
import fs from "fs";
import { Guest } from "@/lib/parseCsv";
import { clerkClient } from "@clerk/nextjs";
import {
  createGroup,
  createUser,
  deleteAll,
  getGroupByUserName,
} from "@/app/database";
import { User } from "@clerk/nextjs/server";
import invariant from "tiny-invariant";

export const dynamic = "force-dynamic";

export async function GET() {
  await deleteAll();
  (await clerkClient.users.getUserList()).forEach(async (user) => {
    if (user.firstName === "Simon" && user.lastName === "Bukin") return;
    await clerkClient.users.deleteUser(user.id);
    console.log(`deleted user ${user.id}, ${user.firstName} ${user.lastName}`);
  });
  const file = fs.readFileSync(process.cwd() + "/src/app/guests.json", "utf8");
  let guests: Guest[] = JSON.parse(file.toString());
  guests = guests.slice(0, 5);
  const usernames = guests.map((guest) => guest.userName);
  for (const guest of guests) {
    const existingGroup = await getGroupByUserName(guest.userName);
    let newGroup = existingGroup;
    if (!existingGroup) {
      const newClerkUser: User = await signUpUser(
        clerkClient,
        guest.userName,
        501
      );
      newGroup = await createGroup(
        newClerkUser.id,
        guest.plusOne,
        guest.userName
      );
    }
    for (const guestName of guest.fullNames) {
      const [firstName, lastName] = guestName.split(" ");
      invariant(newGroup, "newGroup should exist");
      await createUser(firstName, lastName, newGroup.id);
    }
  }
  return NextResponse.json(usernames);
}

const signUpUser = async (
  clerkClient: any, // untyped in clerk SDK 🤷‍♂️
  username: string,
  delay: number
) => {
  return await new Promise<User>((res, rej) => {
    setTimeout(async () => {
      await clerkClient.users
        .createUser({
          username,
          password: `${username}${"potato"}`,
        })
        .then((result: any) => {
          console.log(result);
          if (result && result.id) {
            res(result);
          }
        })
        .catch((err: any) => rej(err.errors[0].longMessage));
    }, delay);
  });
};
