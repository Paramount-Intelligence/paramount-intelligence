-- CreateExtension (required for CaseChunk.embedding; Prisma cannot emit this reliably alone)
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateEnum
CREATE TYPE "AssetKind" AS ENUM ('ONE_PAGER', 'DEMO_VIDEO', 'FULL_NARRATIVE', 'DECK_SLIDE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EXTERNAL', 'ADMIN');

-- AlterTable (CaseStudy): ADD COLUMN only — no existing column touched
ALTER TABLE "CaseStudy" ADD COLUMN     "agentEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "clientType" TEXT,
ADD COLUMN     "contributors" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "fundContext" TEXT,
ADD COLUMN     "peBacked" BOOLEAN;

-- CreateTable
CREATE TABLE "CaseTech" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CaseTech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechAlias" (
    "alias" TEXT NOT NULL,
    "canonical" TEXT NOT NULL,

    CONSTRAINT "TechAlias_pkey" PRIMARY KEY ("alias")
);

-- CreateTable
CREATE TABLE "CaseAsset" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "kind" "AssetKind" NOT NULL,
    "uri" TEXT NOT NULL,
    "sourceDeck" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CaseAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseChunk" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "heading" TEXT,
    "content" TEXT NOT NULL,
    "embedding" vector(1536),

    CONSTRAINT "CaseChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'EXTERNAL',
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "partnerLinkId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerLink" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PartnerLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "partnerLinkId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "citedCaseIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "toolsUsed" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tokensIn" INTEGER NOT NULL DEFAULT 0,
    "tokensOut" INTEGER NOT NULL DEFAULT 0,
    "ttsChars" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "email" TEXT NOT NULL,
    "context" TEXT,
    "notifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptVersion" (
    "id" TEXT NOT NULL,
    "layer" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "isLive" BOOLEAN NOT NULL DEFAULT false,
    "evalPassed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromptVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageDay" (
    "id" TEXT NOT NULL,
    "day" DATE NOT NULL,
    "userId" TEXT,
    "llmTokens" INTEGER NOT NULL DEFAULT 0,
    "ttsChars" INTEGER NOT NULL DEFAULT 0,
    "searches" INTEGER NOT NULL DEFAULT 0,
    "docsGen" INTEGER NOT NULL DEFAULT 0,
    "usdCost" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "UsageDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CaseTech_name_idx" ON "CaseTech"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CaseTech_caseId_name_key" ON "CaseTech"("caseId", "name");

-- CreateIndex
CREATE INDEX "TechAlias_canonical_idx" ON "TechAlias"("canonical");

-- CreateIndex
CREATE INDEX "CaseAsset_caseId_kind_idx" ON "CaseAsset"("caseId", "kind");

-- CreateIndex
CREATE INDEX "CaseChunk_caseId_idx" ON "CaseChunk"("caseId");

-- CreateIndex
CREATE UNIQUE INDEX "AgentUser_email_key" ON "AgentUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerLink_slug_key" ON "PartnerLink"("slug");

-- CreateIndex
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_conversationId_key" ON "Lead"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "UsageDay_day_userId_key" ON "UsageDay"("day", "userId");

-- CreateIndex
CREATE INDEX "CaseStudy_peBacked_idx" ON "CaseStudy"("peBacked");

-- CreateIndex
CREATE INDEX "CaseStudy_agentEnabled_idx" ON "CaseStudy"("agentEnabled");

-- AddForeignKey
ALTER TABLE "CaseTech" ADD CONSTRAINT "CaseTech_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "CaseStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseAsset" ADD CONSTRAINT "CaseAsset_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "CaseStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseChunk" ADD CONSTRAINT "CaseChunk_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "CaseStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AgentUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
