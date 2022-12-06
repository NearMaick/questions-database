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
    return prismaClient.$queryRaw`SELECT "public"."Question"."id", "public"."Question"."educator_id", "public"."Question"."typeQuestion", "public"."Question"."subject", "public"."Question"."description", "public"."Question"."answer", "public"."Question"."correct", "public"."Question"."createdAt", "public"."Question"."updatedAt" FROM "public"."Question" WHERE "public"."Question"."subject" = ${subject} ORDER BY random() LIMIT 1`;
  }

  async listByTypeQuestion(typeQuestion: IQuestionType): Promise<any[]> {
    return prismaClient.$queryRaw`SELECT "public"."Question"."id", "public"."Question"."educator_id", "public"."Question"."typeQuestion", "public"."Question"."subject", "public"."Question"."description", "public"."Question"."answer", "public"."Question"."correct", "public"."Question"."createdAt", "public"."Question"."updatedAt" FROM "public"."Question" WHERE "public"."Question"."typeQuestion"::text = ${typeQuestion} ORDER BY random()`;
  }

  listByEducatorId(educatorId: string): Promise<IQuestionsListDTO[]> {
    throw new Error("Method not implemented.");
  }
}

