"use client";

import { SignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  deleteAllGroups,
  deleteAllPlusOnes,
  deleteAllUsers,
  getAllGroups,
  getAllPlusOnes,
  getAllUsers,
} from "../database";
import { Group, PlusOne, User } from "@prisma/client";
import { Button } from "@/components/ui/button";

function Panel<T>({
  items,
  name,
  visualKeys,
  deleteAll,
}: {
  items: T[];
  name: string;
  visualKeys: string[];
  deleteAll: () => void;
}) {
  function makeSummary(item: T) {
    return visualKeys.map((key) => (item as any)[key]).join(" ");
  }

  return (
    <form className="flex flex-col rounded-md border border-slate-700 p-8">
      <Button
        variant={"destructive"}
        onClick={(e) => {
          e.preventDefault();
          deleteAll();
        }}
      >
        Delete All
      </Button>
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
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-4xl"> Admin </h1>
      <section className="grid grid-cols-3 grid-rows-2 gap-4">
        {allUsers && (
          <Panel<User>
            items={allUsers}
            name="User"
            visualKeys={["firstName", "lastName"]}
            deleteAll={deleteAllUsers}
          />
        )}
        {allGroups && (
          <Panel<Group>
            items={allGroups}
            name="Group"
            visualKeys={["clerkId"]}
            deleteAll={deleteAllGroups}
          />
        )}
        {allPlusOnes && (
          <Panel<PlusOne>
            items={allPlusOnes}
            name="PlusOne"
            visualKeys={["firstName", "lastName"]}
            deleteAll={deleteAllPlusOnes}
          />
        )}
        <div className="rounded-md border border-slate-700 p-8">
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
    </div>
  );
}

export default function Admin() {
  return (
    <>
      <SignedIn>
        <AdminPanel />
      </SignedIn>
      <SignedOut>
        <main className="flex h-full w-full items-center justify-center">
          <SignIn />
        </main>
      </SignedOut>
    </>
  );
}
