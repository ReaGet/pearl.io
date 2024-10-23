/*
  Warnings:

  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "userId",
ADD COLUMN     "userClerkId" TEXT;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userClerkId_fkey" FOREIGN KEY ("userClerkId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
