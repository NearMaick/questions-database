import { Request, Response } from "express";
import { PrismaQuestionsRepository } from "../repositories/implementations/PrismaQuestions.repository";
import { ListQuestionsByTypeQuestion } from "../useCases/ListQuestionsByTypeQuestion.useCase";

const prismaQuestionsRepository = new PrismaQuestionsRepository();
const listQuestionsByTypeQuestion = new ListQuestionsByTypeQuestion(
  prismaQuestionsRepository
);

export class ListQuestionsByTypeQuestionController {
  async handle(request: Request, response: Response) {
    const type = request.params.type as "ESSAY" | "MULTIPLE_CHOICE";

    const questions = await listQuestionsByTypeQuestion.execute(type);
    return response.status(201).json(questions);
  }
}

