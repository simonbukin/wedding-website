import {
  createPlusOne,
  searchGroupById,
  searchGroupByNumericId,
  updatePlusOne,
  updateUser,
} from "@/app/database";
import { PlusOne, User } from "@prisma/client";

export async function POST(request: Request) {
  let {
    users,
    groupId,
    plusOne,
  }: {
    users: User[];
    groupId: number;
    plusOne: PlusOne;
  } = await request.json();
  if (plusOne) {
    const group = await searchGroupByNumericId(groupId);
    if (group) {
      if (group.plusOne) {
        await updatePlusOne(group.plusOne.id, plusOne);
      } else {
        const dbPlusOne: PlusOne = await createPlusOne(
          plusOne.firstName,
          plusOne.lastName,
          groupId
        );
        await updatePlusOne(dbPlusOne.id, plusOne);
      }
    }
  }

  users.forEach(async (user: User) => {
    try {
      await updateUser(user.id, user);
    } catch (e) {
      console.error(e);
    }
  });

  return Response.json("users updated", { status: 200 });
}
