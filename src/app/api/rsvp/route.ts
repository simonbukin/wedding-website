import { searchUserById, updateUser } from "@/app/database";
import { User } from "@prisma/client";
import invariant from "tiny-invariant";

export async function POST(request: Request) {
  const formData: Record<string, Partial<User>> = await request.json();
  console.log(formData);

  Object.entries(formData).forEach(async ([userId, data]) => {
    await updateUser(Number.parseInt(userId), data);
  });

  return new Response(JSON.stringify("users updated"), {
    headers: { "Content-Type": "application/json" },
  });
}
