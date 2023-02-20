/*
  Warnings:

  - The values [PENDING] on the enum `AssignmentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssignmentStatus_new" AS ENUM ('SUBMITTED', 'EVALUATED');
ALTER TABLE "AssignmentSubmission" ALTER COLUMN "staus" DROP DEFAULT;
ALTER TABLE "AssignmentSubmission" ALTER COLUMN "staus" TYPE "AssignmentStatus_new" USING ("staus"::text::"AssignmentStatus_new");
ALTER TYPE "AssignmentStatus" RENAME TO "AssignmentStatus_old";
ALTER TYPE "AssignmentStatus_new" RENAME TO "AssignmentStatus";
DROP TYPE "AssignmentStatus_old";
ALTER TABLE "AssignmentSubmission" ALTER COLUMN "staus" SET DEFAULT 'SUBMITTED';
COMMIT;

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_moduleId_fkey";

-- AlterTable
ALTER TABLE "AssignmentSubmission" ALTER COLUMN "staus" SET DEFAULT 'SUBMITTED';

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
