/*
  Warnings:

  - You are about to drop the column `name` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `attending` on the `RSVP` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `RSVP` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RSVP` table. All the data in the column will be lost.
  - You are about to drop the column `canHavePlusOne` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `clerkId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PlusOne` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `RSVP` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plusOne` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dietaryRestriction` to the `RSVP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodPreference` to the `RSVP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `going` to the `RSVP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `groupId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "FoodPreference" AS ENUM ('SHORTRIB', 'CHICKEN', 'VEGETARIAN');

-- DropForeignKey
ALTER TABLE "PlusOne" DROP CONSTRAINT "PlusOne_rsvpId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_groupId_fkey";

-- DropIndex
DROP INDEX "User_clerkId_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "name",
ADD COLUMN     "clerkId" INTEGER NOT NULL,
ADD COLUMN     "plusOne" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "RSVP" DROP COLUMN "attending",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "dietaryRestriction" TEXT NOT NULL,
ADD COLUMN     "foodPreference" "FoodPreference" NOT NULL,
ADD COLUMN     "going" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "canHavePlusOne",
DROP COLUMN "clerkId",
DROP COLUMN "username",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ALTER COLUMN "groupId" SET NOT NULL;

-- DropTable
DROP TABLE "PlusOne";

-- CreateIndex
CREATE UNIQUE INDEX "Group_clerkId_key" ON "Group"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "RSVP_userId_key" ON "RSVP"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_groupId_key" ON "User"("groupId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
