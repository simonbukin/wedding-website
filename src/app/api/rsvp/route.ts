import { createPlusOne, updateUser } from "@/app/database";
import { User } from "@prisma/client";

export async function POST(request: Request) {
  let {
    users,
    groupId,
    plusOneName,
  }: {
    users: User[];
    groupId: number;
    plusOneName?: string;
  } = await request.json();
  if (plusOneName) {
    const [firstName, lastName] = plusOneName.split(" ");
    await createPlusOne(firstName, lastName, groupId);
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
