/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Group_userName_key" ON "Group"("userName");
