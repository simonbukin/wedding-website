import { updateUser } from "@/app/database";
import { User } from "@prisma/client";

export async function POST(request: Request) {
  const formData: Record<string, Partial<User>> = await request.json();
  Object.entries(formData).forEach(async ([userId, data]) => {
    try {
      await updateUser(Number.parseInt(userId), data);
    } catch (e) {
      console.error(e);
    }
  });

  return Response.json("users updated", { status: 200 });
}
