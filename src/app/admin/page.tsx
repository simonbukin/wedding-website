"use client";

import { SignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getAllGroups, getAllPlusOnes, getAllUsers } from "../database";
import { Group, PlusOne, User } from "@prisma/client";

function Panel<T>({
  items,
  name,
  visualKeys,
}: {
  items: T[];
  name: string;
  visualKeys: string[];
}) {
  function makeSummary(item: T) {
    return visualKeys.map((key) => (item as any)[key]).join(" ");
  }

  return (
    <form className="flex flex-col p-8 border rounded-md border-slate-700">
      <h1 className="text-4xl">{name}</h1>
      <label>
        {name}s : <input className=" text-neutral-900" type="text" />
      </label>
      <section>
        <h1 className="text-2xl">All {name}s</h1>
        {items.map((item) => {
          return (
            <details key={(item as any).id}>
              <summary>{makeSummary(item)}</summary>
              <pre className="overflow-scroll">
                {JSON.stringify(item, null, 2)}
              </pre>
            </details>
          );
        })}
      </section>
    </form>
  );
}

function AdminPanel() {
  const { user } = useUser();
  const [allUsers, setAllUsers] = useState<User[]>();
  const [allGroups, setAllGroups] = useState<Group[]>();
  const [allPlusOnes, setAllPlusOnes] = useState<PlusOne[]>();

  useEffect(() => {
    async function loadAll() {
      const [users, groups, plusOnes] = await Promise.all([
        getAllUsers(),
        getAllGroups(),
        getAllPlusOnes(),
      ]);

      setAllUsers(users);
      setAllGroups(groups);
      setAllPlusOnes(plusOnes);
    }

    loadAll();
  });

  return (
    <>
      <h1 className="text-4xl"> this is an admin panel!!!1 </h1>
      <pre>{JSON.stringify(user?.id, null, 2)}</pre>
      <section className="grid grid-cols-3 grid-rows-2 gap-4">
        {allUsers && (
          <Panel<User>
            items={allUsers}
            name="User"
            visualKeys={["firstName", "lastName"]}
          />
        )}
        {allGroups && (
          <Panel<Group>
            items={allGroups}
            name="Group"
            visualKeys={["clerkId"]}
          />
        )}
        {allPlusOnes && (
          <Panel<PlusOne>
            items={allPlusOnes}
            name="PlusOne"
            visualKeys={["firstName", "lastName"]}
          />
        )}
        <div className="p-8 border rounded-md border-slate-700">
          <h1 className="text-4xl">RSVP Status</h1>
          <p>Total invited: {allUsers?.length}</p>
          <p>
            Total <span className="text-cyan-500">responded</span>:{" "}
            {allUsers?.reduce((a, b) => a + Number(b.going !== null), 0)}{" "}
          </p>
          <p>
            Total <span className="text-emerald-500">going</span>:{" "}
            {allUsers?.reduce((a, b) => a + Number(b.going), 0)}{" "}
          </p>
          <p>
            Total <span className="text-red-500">not going</span>:{" "}
            {allUsers?.reduce((a, b) => a + Number(b.going === false), 0)}{" "}
          </p>
        </div>
      </section>
    </>
  );
}

export default function Admin() {
  return (
    <>
      <SignedIn>
        <AdminPanel />
      </SignedIn>
      <SignedOut>
        <main className="flex w-full h-full items-center justify-center">
          <SignIn />
        </main>
      </SignedOut>
    </>
  );
}
