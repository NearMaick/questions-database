import { Request, Response } from "express";
import { PrismaQuestionsRepository } from "../repositories/implementations/PrismaQuestions.repository";
import { FindQuestionById } from "../useCases/FindQuestionById.useCase";

const prismaQuestionsRepository = new PrismaQuestionsRepository();
const findQuestionById = new FindQuestionById(prismaQuestionsRepository);

export class FindQuestionsByIdController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;

    const questions = await findQuestionById.execute(id);
    return response.status(201).json(questions);
  }
}

