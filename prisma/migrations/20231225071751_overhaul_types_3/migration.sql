/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `PlusOne` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Group_clerkId_key" ON "Group"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "PlusOne_groupId_key" ON "PlusOne"("groupId");
