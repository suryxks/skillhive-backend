/*
  Warnings:

  - Added the required column `submissionUrl` to the `AssignmentSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notesUrl` to the `LectureNotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssignmentSubmission" ADD COLUMN     "submissionUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LectureNotes" ADD COLUMN     "notesUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "videoUrl" TEXT NOT NULL;
