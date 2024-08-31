/*
  Warnings:

  - You are about to drop the column `isShared` on the `Restaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "isShared";

-- CreateTable
CREATE TABLE "_EditorRestaurants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EditorRestaurants_AB_unique" ON "_EditorRestaurants"("A", "B");

-- CreateIndex
CREATE INDEX "_EditorRestaurants_B_index" ON "_EditorRestaurants"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_name_key" ON "Restaurant"("name");

-- AddForeignKey
ALTER TABLE "_EditorRestaurants" ADD CONSTRAINT "_EditorRestaurants_A_fkey" FOREIGN KEY ("A") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditorRestaurants" ADD CONSTRAINT "_EditorRestaurants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
