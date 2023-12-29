"use server";

import { PrismaClient, Group, User } from "@prisma/client";

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
    include: { users: true, plusOnes: true },
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

export async function getAllUsers(): Promise<User[]> {
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

export async function deleteAll() {
  // console.log(await getAllPlusOnes());
  await prisma.plusOne.deleteMany();
  // console.log(await getAllPlusOnes());
  // console.log(await getAllUsers());
  await prisma.user.deleteMany();
  // console.log(await getAllUsers());
  // console.log(await getAllGroups());
  await prisma.group.deleteMany();
  // console.log(await getAllGroups());
}
