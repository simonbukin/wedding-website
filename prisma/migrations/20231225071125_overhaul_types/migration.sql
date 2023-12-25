/*
  Warnings:

  - You are about to drop the column `plusOne` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `dietaryRestriction` on the `RSVP` table. All the data in the column will be lost.
  - You are about to drop the column `foodPreference` on the `RSVP` table. All the data in the column will be lost.
  - You are about to drop the column `going` on the `RSVP` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Group_clerkId_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "plusOne";

-- AlterTable
ALTER TABLE "RSVP" DROP COLUMN "dietaryRestriction",
DROP COLUMN "foodPreference",
DROP COLUMN "going",
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dietaryRestrictions" TEXT,
ADD COLUMN     "foodPreference" "FoodPreference",
ADD COLUMN     "going" BOOLEAN,
ADD COLUMN     "rsvpId" INTEGER;

-- CreateTable
CREATE TABLE "PlusOne" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "PlusOne_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlusOne" ADD CONSTRAINT "PlusOne_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
