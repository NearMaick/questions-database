import { prismaClient } from "../../../../shared/prisma";
import {
  ICreateQuestionRepositoryDTO,
  IQuestionsListDTO,
  IQuestionType,
} from "../../DTOs/Question.dto";
import { IQuestionsRepository } from "../Questions.repository";

export class PrismaQuestionsRepository implements IQuestionsRepository {
  async create({
    typeQuestion,
    answer,
    description,
    correct,
    subject,
    educator_id,
  }: ICreateQuestionRepositoryDTO): Promise<IQuestionsListDTO> {
    const question = await prismaClient.question.create({
      data: {
        typeQuestion,
        answer,
        description,
        subject,
        educator_id,
        correct,
        createdAt: new Date(),
      },
    });

    return question;
  }

  async listBySubject(subject: string): Promise<IQuestionsListDTO[]> {
    return prismaClient.question.findMany({
      where: {
        subject,
      },
    });
  }

  async listByTypeQuestion(typeQuestion: IQuestionType): Promise<any[]> {
    return prismaClient.question.findMany({
      where: {
        typeQuestion,
      },
    });
  }

  listByEducatorId(educatorId: string): Promise<IQuestionsListDTO[]> {
    throw new Error("Method not implemented.");
  }
}

