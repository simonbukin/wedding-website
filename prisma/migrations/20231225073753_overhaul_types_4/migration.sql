/*
  Warnings:

  - You are about to drop the column `rsvpId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `RSVP` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RSVP" DROP CONSTRAINT "RSVP_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "rsvpId";

-- DropTable
DROP TABLE "RSVP";
