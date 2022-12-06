import { Request, Response } from "express";
import { IQuestionType } from "../DTOs/Question.dto";
import { PrismaQuestionsRepository } from "../repositories/implementations/PrismaQuestions.repository";
import { ListQuestionsByTypeQuestion } from "../useCases/ListQuestionsByTypeQuestion.useCase";

const prismaQuestionsRepository = new PrismaQuestionsRepository();
const listQuestionsByTypeQuestion = new ListQuestionsByTypeQuestion(
  prismaQuestionsRepository
);

export class ListQuestionsByTypeQuestionController {
  async handle(request: Request, response: Response) {
    const type = request.params.type as IQuestionType;
    const quantity = request.query.quantity as unknown as string;

    const questions = await listQuestionsByTypeQuestion.execute(type, quantity);
    return response.status(201).json(questions);
  }
}

