/*
  Warnings:

  - Added the required column `content` to the `VideoComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `VideoNotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `VideoNotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ForrumPost" ADD COLUMN     "attachment" TEXT;

-- AlterTable
ALTER TABLE "VideoComments" ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VideoNotes" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
