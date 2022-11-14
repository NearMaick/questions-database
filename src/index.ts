import { PrismaQuestionsRepository } from "./modules/Question/repositories/implementations/PrismaQuestions.repository";
import { ListQuestionsByTypeQuestion } from "./modules/Question/useCases/ListQuestionsByTypeQuestion.useCase";
import { prismaClient } from "./shared/prisma";

const prismaQuestionsRepository = new PrismaQuestionsRepository();
const listQuestionsByTypeQuestion = new ListQuestionsByTypeQuestion(
  prismaQuestionsRepository
);

async function main() {
  const users = await listQuestionsByTypeQuestion.execute("ESSAY");
  console.log(users);
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

