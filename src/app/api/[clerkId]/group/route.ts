import { searchGroupById } from "@/app/database";

export async function GET(
  request: Request,
  { params }: { params: { clerkId: string } }
) {
  const { clerkId } = params;
  const group = await searchGroupById(clerkId);
  if (group) {
    console.log("group found ", group);
    group.users.sort((a, b) => a.id - b.id);
    return Response.json({ group }, { status: 200 });
  } else {
    console.error("group not found ", clerkId);
    return Response.json("Group not found", { status: 404 });
  }
}
