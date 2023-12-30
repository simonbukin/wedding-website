"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ResetUsersPage() {
  const [usernames, setUsernames] = useState([]);

  async function getUsers() {
    const res = await fetch("/api/usernames");
    const usernames = await res.json();
    setUsernames(usernames);
  }

  return (
    <main className="grid h-screen place-content-center">
      <h1 className="text-2xl">Create new Clerk users</h1>
      <pre className="h-[200px] overflow-scroll">
        {JSON.stringify(usernames, null, 2)}
      </pre>
      <Button onClick={() => getUsers()}>Create users</Button>
    </main>
  );
}
