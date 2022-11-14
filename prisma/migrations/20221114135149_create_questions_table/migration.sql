-- CreateEnum
CREATE TYPE "TypeQuestion" AS ENUM ('ESSAY', 'MULTIPLE_CHOICE');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "type_question" "TypeQuestion" NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "answer" TEXT[],
    "correct" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_subject_key" ON "Question"("subject");
