/*
  Warnings:

  - A unique constraint covering the columns `[ModuleNumber]` on the table `Module` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AssignmentSubmission" ALTER COLUMN "submissionTime" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ForrumComment" ALTER COLUMN "postedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ForrumPost" ALTER COLUMN "postedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LectureNotes" ALTER COLUMN "uploadedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
CREATE SEQUENCE module_modulenumber_seq;
ALTER TABLE "Module" ALTER COLUMN "ModuleNumber" SET DEFAULT nextval('module_modulenumber_seq');
ALTER SEQUENCE module_modulenumber_seq OWNED BY "Module"."ModuleNumber";

-- AlterTable
ALTER TABLE "VideoComments" ALTER COLUMN "postedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Module_ModuleNumber_key" ON "Module"("ModuleNumber");
