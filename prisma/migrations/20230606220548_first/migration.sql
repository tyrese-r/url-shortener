/*
  Warnings:

  - You are about to alter the column `userIdentifier` on the `Link` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "userIdentifier" SET DATA TYPE VARCHAR(255);
