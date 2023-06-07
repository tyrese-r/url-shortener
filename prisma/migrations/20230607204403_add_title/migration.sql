/*
  Warnings:

  - You are about to alter the column `pageTitle` on the `Link` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "pageTitle" SET DATA TYPE VARCHAR(255);
