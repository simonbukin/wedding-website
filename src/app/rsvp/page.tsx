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
      const { firstName, lastName } = group.plusOne;
      setValue(`plusOneName`, `${firstName} ${lastName}`);
    }
    group.users.forEach((user: User) => {
      setValue(`${user.id}.going`, user.going ? "going" : "notGoing");
      setValue(
        `${user.id}.foodPreference`,
        user.foodPreference || Object.keys(FoodPreference)[0]
      );
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

    const users = Object.entries(data).map(([key, value]) => {
      if (isNumber(key)) {
        value.id = Number(key);
        return value;
      }
    });

    const allData = {
      users: users,
      groupId: group?.id,
      plusOneName: data.plusOneName,
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
            {group?.users?.map((user) => {
              return (
                <section
                  className="mb-8 flex flex-col content-center gap-4"
                  key={user.id}
                >
                  <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
                  <section className="flex w-full justify-around">
                    <label className="flex flex-col items-center justify-center gap-2 break-words text-center align-middle sm:w-1/5">
                      Toasting to the happy couple!
                      <input
                        className="h-[30px] w-[30px]"
                        type="radio"
                        value="going"
                        {...register(`${user.id}.going`, {
                          required: true,
                        })}
                      />
                    </label>
                    <label className="flex flex-col items-center justify-center gap-2 break-words text-center align-middle sm:w-1/5">
                      Regretfully sending love from afar
                      <input
                        className="h-[30px] w-[30px]"
                        type="radio"
                        value="notGoing"
                        {...register(`${user.id}.going`, {
                          required: true,
                        })}
                      />
                    </label>
                  </section>

                  <label className="flex items-center justify-between">
                    Entree selection:
                    <select
                      className="rounded-md px-4 py-2 text-slate-900 disabled:border disabled:border-slate-900/30 disabled:bg-kaylasCoolColor disabled:text-slate-900/20"
                      disabled={watch(`${user.id}.going`) === "notGoing"}
                      {...register(`${user.id}.foodPreference`, {
                        required: true,
                      })}
                    >
                      {Object.keys(FoodPreference).map((key) => {
                        return <option key={key}>{key}</option>;
                      })}
                    </select>
                  </label>

                  <label className="flex items-center justify-between">
                    Dietary restrictions:
                    <input
                      className="rounded-md p-2 text-slate-900 disabled:border disabled:border-slate-900/20 disabled:bg-kaylasCoolColor"
                      disabled={watch(`${user.id}.going`) === "notGoing"}
                      type="text"
                      {...register(`${user.id}.dietaryRestrictions`, {
                        required: false,
                      })}
                    />
                  </label>

                  {group?.canHavePlusOne && (
                    <>
                      <h2 className="text-xl font-bold">Guest Name</h2>
                      <label className="flex items-center justify-between">
                        Name:
                        <input
                          className="rounded-md p-2 text-slate-900 disabled:border disabled:border-slate-900/20 disabled:bg-kaylasCoolColor"
                          type="text"
                          {...register(`plusOneName`, {
                            required: false,
                          })}
                        />
                      </label>
                    </>
                  )}
                </section>
              );
            })}
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
