import { prismaClient } from "../../../../shared/prisma";
import {
  ICreateQuestionRepositoryDTO,
  IQuestionsListDTO,
} from "../../DTOs/Question.dto";
import { IQuestionsRepository } from "../Questions.repository";

export class PrismaQuestionsRepository implements IQuestionsRepository {
  create({
    typeQuestion,
    answer,
    description,
    correct,
    subject,
    educator_id,
  }: ICreateQuestionRepositoryDTO): Promise<IQuestionsListDTO> {
    throw new Error("Method not implemented.");
  }

  listBySubject(subject: string): Promise<IQuestionsListDTO[]> {
    throw new Error("Method not implemented.");
  }

  async listByTypeQuestion(
    typeQuestion: "ESSAY" | "MULTIPLE_CHOICE"
  ): Promise<any[]> {
    return prismaClient.question.findMany({
      where: {
        type_question: typeQuestion,
      },
    });
  }

  listByEducatorId(educatorId: string): Promise<IQuestionsListDTO[]> {
    throw new Error("Method not implemented.");
  }
}

