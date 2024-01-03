"use server";

import { PrismaClient, Group, User, PlusOne } from "@prisma/client";

let prisma = new PrismaClient();

export async function createGroup(
  clerkId: string,
  canHavePlusOne: boolean,
  userName?: string
): Promise<Group> {
  return prisma.group.create({
    data: {
      clerkId,
      canHavePlusOne,
      userName,
    },
  });
}

export async function getGroupByClerkId(
  clerkId: string
): Promise<Group | null> {
  return prisma.group.findUnique({
    where: {
      clerkId,
    },
  });
}

export async function getGroupByUserName(
  userName: string
): Promise<Group | null> {
  return prisma.group.findUnique({
    where: {
      userName,
    },
  });
}

export async function getAllGroups(): Promise<Group[]> {
  return await prisma.group.findMany({
    include: { users: true, plusOne: true },
  });
}

export async function createUser(
  firstName: string,
  lastName: string,
  groupId: number
): Promise<User> {
  return prisma.user.create({
    data: {
      firstName,
      lastName,
      groupId,
    },
  });
}

export async function updateUser(
  userId: number,
  properties: Partial<User>
): Promise<User | null> {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: properties,
  });
}

export async function getAllUsers() {
  return await prisma.user.findMany({ include: { group: true } });
}

export async function createPlusOne(
  firstName: string,
  lastName: string,
  groupId: number
) {
  return prisma.plusOne.create({
    data: {
      firstName,
      lastName,
      groupId,
    },
  });
}

export async function updatePlusOne(
  plusOneId: number,
  properties: Partial<PlusOne>
) {
  return prisma.plusOne.update({
    where: {
      id: plusOneId,
    },
    data: properties,
  });
}

export async function searchPlusOneByNames(
  firstName: string,
  lastName: string
) {
  return await prisma.plusOne.findFirst({
    where: {
      firstName: firstName,
      lastName: lastName,
    },
  });
}

export async function getAllPlusOnes() {
  return await prisma.plusOne.findMany();
}

export async function searchGroupById(clerkId: string) {
  return await prisma.group.findFirst({
    where: {
      clerkId: clerkId,
    },
    include: {
      users: true,
      plusOne: true,
    },
  });
}

export async function searchGroupByNumericId(id: number) {
  return await prisma.group.findFirst({
    where: {
      id: id,
    },
    include: {
      users: true,
      plusOne: true,
    },
  });
}

export async function searchUserById(id: number) {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
}

export async function deleteAllUsers() {
  console.log("delete all users");
  await prisma.user.deleteMany();
}

export async function deleteAllPlusOnes() {
  await prisma.plusOne.deleteMany();
}

export async function deleteAllGroups() {
  await prisma.group.deleteMany();
}

export async function deleteAll() {
  await deleteAllUsers();
  await deleteAllPlusOnes();
  await deleteAllGroups();
}
