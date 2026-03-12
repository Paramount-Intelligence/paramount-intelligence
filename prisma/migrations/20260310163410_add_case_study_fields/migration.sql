/*
  Warnings:

  - You are about to drop the column `architectStructureDesignAgentId` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `backend` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `benefits` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `challenge` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `client` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `conductorId` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `coordination` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `evaluation` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `infrastructure` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `librarianContentExtractionAgentId` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `models` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `monitoring` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `observatoryId` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `processDesignAndPlanning` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `processDevelopment` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `processKnowledgeTransfer` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `processMLOpsAndIntegration` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `processRequirementsGathering` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `qualitativeResults` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `quantitativeResults` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `reviewerQualityValidationAgentId` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `solution` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `solutionApproachId` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the column `writerNarrativeGenerationAgentId` on the `CaseStudy` table. All the data in the column will be lost.
  - You are about to drop the `SolutionField` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CaseStudy" DROP CONSTRAINT "CaseStudy_architectStructureDesignAgentId_fkey";

-- DropForeignKey
ALTER TABLE "CaseStudy" DROP CONSTRAINT "CaseStudy_conductorId_fkey";

-- DropForeignKey
ALTER TABLE "CaseStudy" DROP CONSTRAINT "CaseStudy_librarianContentExtractionAgentId_fkey";

-- DropForeignKey
ALTER TABLE "CaseStudy" DROP CONSTRAINT "CaseStudy_observatoryId_fkey";

-- DropForeignKey
ALTER TABLE "CaseStudy" DROP CONSTRAINT "CaseStudy_reviewerQualityValidationAgentId_fkey";

-- DropForeignKey
ALTER TABLE "CaseStudy" DROP CONSTRAINT "CaseStudy_solutionApproachId_fkey";

-- DropForeignKey
ALTER TABLE "CaseStudy" DROP CONSTRAINT "CaseStudy_writerNarrativeGenerationAgentId_fkey";

-- DropIndex
DROP INDEX "CaseStudy_architectStructureDesignAgentId_key";

-- DropIndex
DROP INDEX "CaseStudy_conductorId_key";

-- DropIndex
DROP INDEX "CaseStudy_librarianContentExtractionAgentId_key";

-- DropIndex
DROP INDEX "CaseStudy_observatoryId_key";

-- DropIndex
DROP INDEX "CaseStudy_reviewerQualityValidationAgentId_key";

-- DropIndex
DROP INDEX "CaseStudy_solutionApproachId_key";

-- DropIndex
DROP INDEX "CaseStudy_writerNarrativeGenerationAgentId_key";

-- AlterTable
ALTER TABLE "CaseStudy" DROP COLUMN "architectStructureDesignAgentId",
DROP COLUMN "backend",
DROP COLUMN "benefits",
DROP COLUMN "challenge",
DROP COLUMN "client",
DROP COLUMN "conductorId",
DROP COLUMN "coordination",
DROP COLUMN "evaluation",
DROP COLUMN "infrastructure",
DROP COLUMN "librarianContentExtractionAgentId",
DROP COLUMN "models",
DROP COLUMN "monitoring",
DROP COLUMN "observatoryId",
DROP COLUMN "overview",
DROP COLUMN "processDesignAndPlanning",
DROP COLUMN "processDevelopment",
DROP COLUMN "processKnowledgeTransfer",
DROP COLUMN "processMLOpsAndIntegration",
DROP COLUMN "processRequirementsGathering",
DROP COLUMN "qualitativeResults",
DROP COLUMN "quantitativeResults",
DROP COLUMN "reviewerQualityValidationAgentId",
DROP COLUMN "solution",
DROP COLUMN "solutionApproachId",
DROP COLUMN "writerNarrativeGenerationAgentId",
ADD COLUMN     "clientOverview" TEXT,
ADD COLUMN     "ourApproach" TEXT,
ADD COLUMN     "outcomeQualitative" TEXT,
ADD COLUMN     "outcomeQuantitative" TEXT,
ADD COLUMN     "processSteps" JSONB,
ADD COLUMN     "solutionAgents" JSONB,
ADD COLUMN     "techBackend" TEXT,
ADD COLUMN     "techCoordination" TEXT,
ADD COLUMN     "techEvaluation" TEXT,
ADD COLUMN     "techInfrastructure" TEXT,
ADD COLUMN     "techModels" TEXT,
ADD COLUMN     "techMonitoring" TEXT,
ALTER COLUMN "clientName" DROP NOT NULL,
ALTER COLUMN "clientIndustry" DROP NOT NULL,
ALTER COLUMN "clientMarket" DROP NOT NULL,
ALTER COLUMN "clientTechnology" DROP NOT NULL,
ALTER COLUMN "challengeBusiness" DROP NOT NULL,
ALTER COLUMN "challengeTechnology" DROP NOT NULL,
ALTER COLUMN "lessonsLearned" DROP NOT NULL,
ALTER COLUMN "summary" DROP NOT NULL;

-- DropTable
DROP TABLE "SolutionField";
