/*
  Warnings:

  - You are about to drop the column `host` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[origin]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `origin` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_host_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "host",
ADD COLUMN     "origin" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_origin_key" ON "Project"("origin");
