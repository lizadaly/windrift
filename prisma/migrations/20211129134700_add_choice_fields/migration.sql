/*
  Warnings:

  - Added the required column `chapterName` to the `choices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `next` to the `choices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "choices" ADD COLUMN     "chapterName" VARCHAR(2000) NOT NULL,
ADD COLUMN     "next" VARCHAR(2000) NOT NULL;
