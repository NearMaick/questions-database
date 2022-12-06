import { Request, Response } from "express";
import { PrismaQuestionsRepository } from "../repositories/implementations/PrismaQuestions.repository";
import { ListQuestionsBySubject } from "../useCases/ListQuestionsBySubject.useCase";

const prismaQuestionsRepository = new PrismaQuestionsRepository();
const listQuestionsBySubject = new ListQuestionsBySubject(
  prismaQuestionsRepository
);

export class ListQuestionsBySubjectController {
  async handle(request: Request, response: Response) {
    const subject = request.params.subject;

    const questions = await listQuestionsBySubject.execute(subject);
    return response.status(201).json(questions);
  }
}

