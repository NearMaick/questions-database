import {
  ICreateQuestionRepositoryDTO,
  IQuestionsListDTO,
  IQuestionType,
} from "../DTOs/Question.dto";

export interface IQuestionsRepository {
  create({
    typeQuestion,
    answer,
    description,
    correct,
    subject,
    educator_id,
  }: ICreateQuestionRepositoryDTO): Promise<IQuestionsListDTO>;
  listBySubject(subject: string): Promise<IQuestionsListDTO[]>;
  listByTypeQuestion(
    typeQuestion: IQuestionType,
    quantity: string
  ): Promise<IQuestionsListDTO[]>;
  listByEducatorId(educatorId: string): Promise<IQuestionsListDTO[]>;
  findById(id: string): Promise<IQuestionsListDTO | undefined | null>;
}

