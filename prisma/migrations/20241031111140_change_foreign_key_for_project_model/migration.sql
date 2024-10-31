/*
  Warnings:

  - You are about to drop the column `userClerkId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userClerkId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "userClerkId",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
