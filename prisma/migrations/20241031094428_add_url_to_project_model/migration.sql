/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Project_name_key";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_url_key" ON "Project"("url");
