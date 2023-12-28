"use client";

import { Button } from "@/components/ui/button";
import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function UploadUserJsonPage() {
  const { signUp } = useSignUp();
  const { signOut } = useClerk();
  const [usernames, setUsernames] = useState([]);
  const [userIds, setUserIds] = useState<[string, string][]>();
  const [completed, setCompleted] = useState(0);

  const handleCreateUsers = async () => {
    const userToId = new Map<string, string>();
    if (usernames) {
      for (const username of usernames) {
        await new Promise<void>((res) => {
          setTimeout(async () => {
            await signUp
              ?.create({
                username,
                password: `${username}${"potato"}`,
              })
              .then((result) => {
                console.log(result);
                if (result && result.id) {
                  userToId.set(username, result.id as string);
                }
              })
              .catch((err) => console.error("error", err.errors[0].longMessage))
              .finally(async () => {
                await signOut();
                res();
              });
          }, 4000);
        });
      }
    }
    setUserIds(Array.from(userToId.entries()));
  };

  useEffect(() => {
    async function getUsers() {
      const res = await fetch("/api/usernames");
      const usernames = await res.json();
      setUsernames(usernames);
    }
    getUsers();
  }, []);

  return (
    <main className="grid h-screen place-content-center">
      <h1 className="text-2xl">Create new Clerk users</h1>
      <pre className="h-[200px] overflow-scroll">
        {JSON.stringify(usernames, null, 2)}
      </pre>
      <Button onClick={() => handleCreateUsers()}>Create users</Button>
      <h1>completed: {completed}</h1>
      <pre className="h-[200px] overflow-scroll">
        {JSON.stringify(userIds, null, 2)}
      </pre>
    </main>
  );
}
