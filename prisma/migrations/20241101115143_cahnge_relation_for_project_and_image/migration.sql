/*
  Warnings:

  - You are about to drop the column `linkId` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_linkId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_projectId_fkey";

-- DropIndex
DROP INDEX "Image_linkId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "linkId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_projectId_key" ON "Image"("projectId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
