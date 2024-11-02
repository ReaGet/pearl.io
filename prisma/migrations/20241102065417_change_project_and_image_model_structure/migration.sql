/*
  Warnings:

  - You are about to drop the column `name` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `favicon` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[host]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `src` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `host` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "name",
ADD COLUMN     "src" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "favicon",
DROP COLUMN "name",
ADD COLUMN     "faviconUrl" TEXT,
ADD COLUMN     "host" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_host_key" ON "Project"("host");
