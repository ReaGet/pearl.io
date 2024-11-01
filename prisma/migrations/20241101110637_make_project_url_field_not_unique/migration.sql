-- DropIndex
DROP INDEX "Project_url_key";

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);
