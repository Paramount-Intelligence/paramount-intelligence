/*
  Warnings:

  - You are about to drop the column `challengeBusiness` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `challengeTechnology` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `clientOverview` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `lessonsLearned` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `ourApproach` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `outcomeQualitative` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `outcomeQuantitative` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `processSteps` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `techBackend` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `techCoordination` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `techEvaluation` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `techInfrastructure` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `techModels` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `techMonitoring` on the `CaseStudy` table. All the data in the column will be lost.
  - Added the required column `benefits` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `challenges` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solution` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CaseStudy" DROP COLUMN "challengeBusiness",
DROP COLUMN "challengeTechnology",
DROP COLUMN "clientOverview",
DROP COLUMN "lessonsLearned",
DROP COLUMN "ourApproach",
DROP COLUMN "outcomeQualitative",
DROP COLUMN "outcomeQuantitative",
DROP COLUMN "processSteps",
DROP COLUMN "techBackend",
DROP COLUMN "techCoordination",
DROP COLUMN "techEvaluation",
DROP COLUMN "techInfrastructure",
DROP COLUMN "techModels",
DROP COLUMN "techMonitoring",
ADD COLUMN     "benefits" TEXT NOT NULL,
ADD COLUMN     "challenge" TEXT,
ADD COLUMN     "challenges" TEXT NOT NULL,
ADD COLUMN     "keyConstraints" TEXT,
ADD COLUMN     "results" TEXT,
ADD COLUMN     "solution" TEXT NOT NULL,
ADD COLUMN     "tech" JSONB,
ADD COLUMN     "uniqueSolution" TEXT;
