"use client";

import { useUser } from "@clerk/nextjs";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Group, PlusOne, User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import invariant from "tiny-invariant";
import { FoodPreference } from "@prisma/client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import Confetti from "./Confetti";
import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";

type GroupWithUsersAndPlusOnes = Group & { users: User[]; plusOne?: PlusOne };

const isNumber = (str: string) => {
  return !isNaN(parseFloat(str));
};

export default function RSVPPage() {
  const { user } = useUser();
  const { register, handleSubmit, setValue, watch } = useForm();
  const router = useRouter();
  const [group, setGroup] = useState<GroupWithUsersAndPlusOnes>();
  const [loading, setLoading] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const queryRSVP = useCallback(async () => {
    setLoading(true);
    invariant(user, "User must be signed in to RSVP");
    const groupResponse = await fetch(`/api/${user.id}/group`);
    const { group }: { group: GroupWithUsersAndPlusOnes } =
      await groupResponse.json();
    setGroup(group);
    if (group.plusOne) {
      const {
        firstName,
        lastName,
        going,
        foodPreference,
        dietaryRestrictions,
      } = group.plusOne;
      setValue(`plusOne.firstName`, firstName);
      setValue(`plusOne.lastName`, lastName);
      setValue(`plusOne.going`, going ? "going" : "notGoing");
      if (foodPreference) {
        setValue(`plusOne.foodPreference`, foodPreference);
      } else {
        setValue(`plusOne.foodPreference`, "");
      }
      setValue(`plusOne.dietaryRestrictions`, dietaryRestrictions);
    }
    group.users.forEach((user: User) => {
      setValue(`${user.id}.going`, user.going ? "going" : "notGoing");
      if (user.foodPreference) {
        setValue(`${user.id}.foodPreference`, user.foodPreference);
      } else {
        setValue(`${user.id}.foodPreference`, "");
      }
      setValue(`${user.id}.dietaryRestrictions`, user.dietaryRestrictions);
    });
    setLoading(false);
  }, [user, setValue]);

  useEffect(() => {
    if (user && user.id !== undefined) {
      queryRSVP();
    }
  }, [queryRSVP, user]);

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setLoading(true);

    for (const [key, value] of Object.entries(data)) {
      if (isNumber(key)) {
        // @ts-ignore
        value["going"] = value["going"] === "going" ? true : false;
      }
    }

    if (data.plusOne) {
      data.plusOne.going = data.plusOne.going === "going" ? true : false;
    }

    const users = Object.entries(data).map(([key, value]) => {
      if (isNumber(key)) {
        value.id = Number(key);
        return value;
      }
    });

    const filteredUsers = users.filter((user) => user);

    const allData = {
      users: filteredUsers,
      groupId: group?.id,
      plusOne: data.plusOne,
    };

    const response = await fetch("/api/rsvp", {
      method: "POST",
      body: JSON.stringify(allData),
    });
    if (response.status === 200) {
      setAlertOpen(true);
    } else {
      console.error(response);
    }
    setLoading(false);
  };

  const onErrors: SubmitErrorHandler<Partial<User>> = async (errors) => {
    console.log("errors! ", errors);
  };

  const generateFormPerPerson = (person: User | PlusOne) => {
    return (
      <section className="mb-8 flex flex-col gap-4" key={person.id}>
        <h2 className="text-xl font-bold">{`${person.firstName} ${person.lastName}`}</h2>
        <section className="grid grid-cols-2 grid-rows-2 gap-4">
          <label className="flex items-center justify-start gap-4">
            <input
              className="h-[30px] w-[30px] flex-shrink-0 accent-violet-800"
              type="radio"
              value="going"
              {...register(`${person.id}.going`, {
                required: true,
              })}
            />
            Joyfully accept!
          </label>

          <select
            className="rounded-md px-4 py-2 text-slate-900 disabled:border disabled:border-slate-900/30 disabled:bg-kaylasCoolColor disabled:text-slate-900/20"
            disabled={watch(`${person.id}.going`) === "notGoing"}
            {...register(`${person.id}.foodPreference`, {
              required: true,
            })}
          >
            <option value="" disabled>
              Select your entree
            </option>
            {Object.keys(FoodPreference).map((key) => {
              return <option key={key}>{key}</option>;
            })}
          </select>

          <label className="flex items-center justify-start gap-4">
            <input
              className="h-[30px] w-[30px] flex-shrink-0 accent-violet-800"
              type="radio"
              value="notGoing"
              {...register(`${person.id}.going`, {
                required: true,
              })}
            />
            Regretfully decline...
          </label>

          <input
            className="rounded-md p-2 text-slate-900 disabled:border disabled:border-slate-900/20 disabled:bg-kaylasCoolColor"
            disabled={watch(`${person.id}.going`) === "notGoing"}
            placeholder="Dietary restrictions"
            type="text"
            {...register(`${person.id}.dietaryRestrictions`, {
              required: false,
            })}
          />
        </section>
      </section>
    );
  };

  return (
    <section className="flex min-h-screen w-full flex-col p-4 text-slate-700 sm:mx-auto sm:max-w-screen-sm md:max-w-screen-md">
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className="flex flex-col gap-4 rounded-md border border-slate-600 p-4"
      >
        <h1 className="text-2xl font-bold">Your Party</h1>
        {loading && <Loader text={"Loading..."} />}
        {!loading && (
          <section>
            {group?.users?.map((user) => generateFormPerPerson(user))}
            {group?.canHavePlusOne && (
              <>
                <h2 className="mb-4 text-xl font-bold">Guest Name</h2>
                <section className="grid grid-cols-2 grid-rows-2 gap-4">
                  <input
                    className="rounded-md p-2 text-slate-900 disabled:border disabled:border-slate-900/20 disabled:bg-kaylasCoolColor"
                    type="text"
                    placeholder="Plus one first name"
                    {...register(`plusOne.firstName`, {
                      required: false,
                    })}
                  />

                  <select
                    className="rounded-md px-4 py-2 text-slate-900 disabled:border disabled:border-slate-900/30 disabled:bg-kaylasCoolColor disabled:text-slate-900/20"
                    disabled={
                      watch("plusOne.firstName") === "" ||
                      watch("plusOne.lastName") === ""
                    }
                    {...register(`plusOne.foodPreference`, {
                      required: true,
                    })}
                  >
                    <option value="" disabled>
                      Select your entree
                    </option>
                    {Object.keys(FoodPreference).map((key) => {
                      return <option key={key}>{key}</option>;
                    })}
                  </select>

                  <input
                    className="rounded-md p-2 text-slate-900 disabled:border disabled:border-slate-900/20 disabled:bg-kaylasCoolColor"
                    type="text"
                    placeholder="Plus one last name"
                    {...register(`plusOne.lastName`, {
                      required: false,
                    })}
                  />

                  <input
                    className="rounded-md p-2 text-slate-900 disabled:border disabled:border-slate-900/20 disabled:bg-kaylasCoolColor"
                    disabled={
                      watch("plusOne.firstName") === "" ||
                      watch("plusOne.lastName") === ""
                    }
                    placeholder="Dietary restrictions"
                    type="text"
                    {...register(`plusOne.dietaryRestrictions`, {
                      required: false,
                    })}
                  />
                </section>
              </>
            )}
          </section>
        )}
        <Button
          className="rounded-md border border-slate-700 bg-blue-300 py-4 text-xl font-bold text-slate-900 hover:bg-blue-500"
          type="submit"
        >
          Submit my RSVP!
        </Button>
      </form>

      {alertOpen && (
        <div className="z-[51]">
          <Confetti />
        </div>
      )}
      <AlertDialog open={alertOpen}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Your RSVP has been submitted!</AlertDialogTitle>
              <AlertDialogDescription>
                You can change your RSVP at any time by coming back to this
                page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => router.push("/")}>
                Back to home
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </section>
  );
}
