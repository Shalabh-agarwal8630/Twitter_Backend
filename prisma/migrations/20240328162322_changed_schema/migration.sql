/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "imageURL",
ADD COLUMN     "imageUrl" TEXT;
