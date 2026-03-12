/*
  Warnings:

  - A unique constraint covering the columns `[solutionApproachId]` on the table `CaseStudy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[librarianContentExtractionAgentId]` on the table `CaseStudy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[architectStructureDesignAgentId]` on the table `CaseStudy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[writerNarrativeGenerationAgentId]` on the table `CaseStudy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reviewerQualityValidationAgentId]` on the table `CaseStudy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[conductorId]` on the table `CaseStudy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[observatoryId]` on the table `CaseStudy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `backend` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `challengeBusiness` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `challengeTechnology` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordination` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluation` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `infrastructure` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessonsLearned` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `models` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monitoring` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processDesignAndPlanning` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processDevelopment` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processKnowledgeTransfer` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processMLOpsAndIntegration` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processRequirementsGathering` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualitativeResults` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantitativeResults` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `CaseStudy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CaseStudy" ADD COLUMN     "architectStructureDesignAgentId" TEXT,
ADD COLUMN     "backend" TEXT NOT NULL,
ADD COLUMN     "challengeBusiness" TEXT NOT NULL,
ADD COLUMN     "challengeTechnology" TEXT NOT NULL,
ADD COLUMN     "client" TEXT NOT NULL,
ADD COLUMN     "conductorId" TEXT,
ADD COLUMN     "coordination" TEXT NOT NULL,
ADD COLUMN     "evaluation" TEXT NOT NULL,
ADD COLUMN     "infrastructure" TEXT NOT NULL,
ADD COLUMN     "lessonsLearned" TEXT NOT NULL,
ADD COLUMN     "librarianContentExtractionAgentId" TEXT,
ADD COLUMN     "models" TEXT NOT NULL,
ADD COLUMN     "monitoring" TEXT NOT NULL,
ADD COLUMN     "observatoryId" TEXT,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "processDesignAndPlanning" TEXT NOT NULL,
ADD COLUMN     "processDevelopment" TEXT NOT NULL,
ADD COLUMN     "processKnowledgeTransfer" TEXT NOT NULL,
ADD COLUMN     "processMLOpsAndIntegration" TEXT NOT NULL,
ADD COLUMN     "processRequirementsGathering" TEXT NOT NULL,
ADD COLUMN     "qualitativeResults" TEXT NOT NULL,
ADD COLUMN     "quantitativeResults" TEXT NOT NULL,
ADD COLUMN     "reviewerQualityValidationAgentId" TEXT,
ADD COLUMN     "solutionApproachId" TEXT,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "writerNarrativeGenerationAgentId" TEXT;

-- CreateTable
CREATE TABLE "SolutionField" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SolutionField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_solutionApproachId_key" ON "CaseStudy"("solutionApproachId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_librarianContentExtractionAgentId_key" ON "CaseStudy"("librarianContentExtractionAgentId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_architectStructureDesignAgentId_key" ON "CaseStudy"("architectStructureDesignAgentId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_writerNarrativeGenerationAgentId_key" ON "CaseStudy"("writerNarrativeGenerationAgentId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_reviewerQualityValidationAgentId_key" ON "CaseStudy"("reviewerQualityValidationAgentId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_conductorId_key" ON "CaseStudy"("conductorId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_observatoryId_key" ON "CaseStudy"("observatoryId");

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_solutionApproachId_fkey" FOREIGN KEY ("solutionApproachId") REFERENCES "SolutionField"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_librarianContentExtractionAgentId_fkey" FOREIGN KEY ("librarianContentExtractionAgentId") REFERENCES "SolutionField"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_architectStructureDesignAgentId_fkey" FOREIGN KEY ("architectStructureDesignAgentId") REFERENCES "SolutionField"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_writerNarrativeGenerationAgentId_fkey" FOREIGN KEY ("writerNarrativeGenerationAgentId") REFERENCES "SolutionField"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_reviewerQualityValidationAgentId_fkey" FOREIGN KEY ("reviewerQualityValidationAgentId") REFERENCES "SolutionField"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_conductorId_fkey" FOREIGN KEY ("conductorId") REFERENCES "SolutionField"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_observatoryId_fkey" FOREIGN KEY ("observatoryId") REFERENCES "SolutionField"("id") ON DELETE SET NULL ON UPDATE CASCADE;
