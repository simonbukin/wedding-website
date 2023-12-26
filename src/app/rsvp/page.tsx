"use client";

import { useUser } from "@clerk/nextjs";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import invariant from "tiny-invariant";
import { FoodPreference } from "@prisma/client";

export default function RSVPPage() {
  const { user } = useUser();
  const { register, handleSubmit, setValue } = useForm();
  const [users, setUsers] = useState<User[]>();
  const [updated, setUpdated] = useState(false);

  const queryRSVP = useCallback(async () => {
    invariant(user, "User must be signed in to RSVP");
    const usersResponse = await fetch(`/api/${user.id}/group`);
    const usersJson = await usersResponse.json();
    setUsers(usersJson);
    usersJson.forEach((user: User) => {
      setValue(`${user.id}.going`, user.going);
      setValue(`${user.id}.foodPreference`, user.foodPreference);
      setValue(`${user.id}.dietaryRestrictions`, user.dietaryRestrictions);
    });
  }, [user, setValue]);

  useEffect(() => {
    if (user && user.id !== undefined) {
      queryRSVP();
    }
  }, [queryRSVP, user]);

  const onSubmit: SubmitHandler<Partial<User>> = async (
    data: Partial<User>
  ) => {
    console.log(data);
    const response = await fetch("/api/rsvp", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      queryRSVP();
      setUpdated(true);
    } else {
      console.error(response);
    }
  };

  const onErrors: SubmitErrorHandler<Partial<User>> = async (errors) => {
    console.log("errors! ", errors);
  };

  return (
    <section className="p-4">
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className="p-4 flex flex-col gap-4 border rounded-md border-slate-600"
      >
        <h1 className="text-2xl font-bold">Here is your party: </h1>
        {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}

        {users?.map((user) => {
          return (
            <section className="grid grid-cols-4" key={user.id}>
              <h2 className="text-xl">{`${user.firstName} ${user.lastName}`}</h2>
              <label>
                Going?
                <input type="checkbox" {...register(`${user.id}.going`)} />
              </label>

              <label>
                Entree selection:
                <select
                  className="text-slate-900"
                  {...register(`${user.id}.foodPreference`, { required: true })}
                >
                  {Object.keys(FoodPreference).map((key) => {
                    return <option key={key}>{key}</option>;
                  })}
                </select>
              </label>

              <label>
                Dietary restrictions:
                <input
                  className="text-slate-900"
                  type="text"
                  {...register(`${user.id}.dietaryRestrictions`, {
                    required: false,
                  })}
                />
              </label>
            </section>
          );
        })}
        <input
          className="border rounded-md border-slate-700 bg-slate-500"
          type="submit"
        />
      </form>
      {updated && <p className="text-teal-500, text-4xl">Updated!</p>}
    </section>
  );
}
