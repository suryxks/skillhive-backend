/*
  Warnings:

  - Added the required column `content` to the `ForrumComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `ForrumPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ForrumPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ForrumComment" ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ForrumPost" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
