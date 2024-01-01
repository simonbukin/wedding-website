import { searchGroupById } from "@/app/database";

export async function GET(
  request: Request,
  { params }: { params: { clerkId: string } }
) {
  const { clerkId } = params;
  const group = await searchGroupById(clerkId);
  if (group) {
    const users = group.users;
    users.sort((a, b) => a.id - b.id);
    return Response.json(users, { status: 200 });
  } else {
    console.error("group not found ", clerkId);
    return Response.json("Group not found", { status: 404 });
  }
}
