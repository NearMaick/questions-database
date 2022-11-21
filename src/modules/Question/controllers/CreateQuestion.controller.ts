import { Request, Response } from "express";
import { PrismaEducatorRepository } from "../../Educator/repositories/implementations/PrismaEducators.repository";
import { PrismaQuestionsRepository } from "../repositories/implementations/PrismaQuestions.repository";
import { CreateQuestionUseCase } from "../useCases/CreateQuestion.useCase";

const prismaQuestionsRepository = new PrismaQuestionsRepository();
const prismaEducatorRepository = new PrismaEducatorRepository();
const createQuestion = new CreateQuestionUseCase(
  prismaQuestionsRepository,
  prismaEducatorRepository
);

export class CreateQuestionController {
  async handle(request: Request, response: Response) {
    const educator_id = "710df79f-87cc-4ec1-8af5-f69f7402f33a";
    const {
      type_question,
      subject,
      description,
      essay_answer,
      choice_01,
      choice_02,
      choice_03,
      choice_04,
      choice_05,
      correct,
    } = request.body;

    let educator;

    if (essay_answer === undefined) {
      educator = await createQuestion.execute({
        answer: [choice_01, choice_02, choice_03, choice_04, choice_05],
        correct,
        description,
        educator_id,
        subject,
        typeQuestion: type_question,
      });
    } else {
      educator = await createQuestion.execute({
        answer: essay_answer,
        correct: essay_answer,
        description,
        educator_id,
        subject,
        typeQuestion: type_question,
      });
    }

    response.status(200).json(educator);
  }
}

