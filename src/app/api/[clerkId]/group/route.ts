import { searchGroupById } from "@/app/database";
import invariant from "tiny-invariant";

export async function GET(
  request: Request,
  { params }: { params: { clerkId: string } }
) {
  const { clerkId } = params;
  invariant(clerkId !== undefined, "clerkId is required");
  const group = await searchGroupById(clerkId);
  if (group) {
    const users = group.users;
    users.sort((a, b) => a.id - b.id);
    return Response.json(users, { status: 200 });
  } else {
    return Response.json({ message: "Group not found" }, { status: 404 });
  }
}
