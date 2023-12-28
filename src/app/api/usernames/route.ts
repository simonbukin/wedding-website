import { NextResponse } from "next/server";
import fs from "fs";
import { Guest } from "@/lib/parseCsv";

export async function GET() {
  console.log("GETTING USERNAMES");
  const file = fs.readFileSync(process.cwd() + "/src/app/guests.json", "utf8");
  let guests: Guest[] = JSON.parse(file.toString());
  guests = guests.slice(0, 5);
  const usernames = guests.map((guest) => guest.userName);
  return NextResponse.json(usernames);
}
