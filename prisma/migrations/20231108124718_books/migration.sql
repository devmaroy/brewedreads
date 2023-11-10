/*
  Warnings:

  - You are about to drop the column `publishedData` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "publishedData",
ADD COLUMN     "publishedDate" TIMESTAMP(3);
