/*
  Warnings:

  - You are about to drop the column `type_question` on the `Question` table. All the data in the column will be lost.
  - Added the required column `typeQuestion` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "type_question",
ADD COLUMN     "typeQuestion" "TypeQuestion" NOT NULL;
