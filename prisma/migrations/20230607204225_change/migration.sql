/*
  Warnings:

  - You are about to drop the column `title` on the `Link` table. All the data in the column will be lost.
  - Added the required column `pageTitle` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "title",
ADD COLUMN     "pageTitle" TEXT NOT NULL;
